Ext.define('RM.controller.CustomDiscountC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.CustomDiscount'],
    config: {
        refs: {
            customDiscount: 'customdiscount',
            percentDiscount: 'customdiscount #percentDiscount',
            absoluteDiscount: 'customdiscount #absoluteDiscount'
        },
        control: {
            'customdiscount': {
                show: 'onShow'
            },
            'customdiscount exttextfield': {
                tap: 'onFieldTap',
                blur: 'onFieldBlur'
            },
            'customdiscount dataentrykeypad': {
                keytap: 'onCalcKeyTap'
            },
            'customdiscount #back': {
                tap: 'back'
            },
            'customdiscount #save': {
                tap: 'save'
            }
        }

    },

    showView: function (discVal, cb, cbs) {
        this.discVal = discVal;
        this.selectCb = cb;
        this.selectCbs = cbs;
        
        var view = this.getCustomDiscount();
        if (!view)
            view = { xtype: 'customdiscount' };
        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {
        var disc = this.discVal, percDisc = this.getPercentDiscount();
        this.currentField = percDisc;
        this.clearFields();
        
        if (disc != 0) {
            var absDiscount = this.getAbsoluteDiscount();
            if (disc.indexOf('%') > -1) {
                percDisc.setValue(disc.replace('%', ''));
                absDiscount.setValue(null);
            }
            else {
                percDisc.setValue(null);
                absDiscount.setValue(parseFloat(disc.replace('$', '')).toFixed(2));
                this.currentField = absDiscount;
            }
        }
    },

    onFieldTap: function (tf) {        
        this.currentField = tf;
        this.clearFields();        
    },
    
    onFieldBlur: function(tf){ 
        var task = Ext.create('Ext.util.DelayedTask', function() {
             tf.setPlaceHolder('enter');
        });
        
        task.delay(500);       
    },
    
    clearFields: function(){
        this.getPercentDiscount().setValue('');
        this.getAbsoluteDiscount().setValue('');
    },

    onCalcKeyTap: function (key) {
        
        var valStr = this.currentField.getValue();
        if (key == 'back') {
            if (valStr.length > 0) {
                valStr = valStr.slice(0, -1)
            }
        }        
        else if ((key != '.' && (valStr.length < valStr.indexOf('.') + (this.currentField.getItemId() == 'percentDiscount' ? 5 : 3 ) )) || valStr.indexOf('.') < 0) {
            if(valStr == '0' && key != '.') valStr = '';
            valStr += key;
        }
        this.currentField.setValue(valStr);

    },
    
     validateForm: function(){  
         var isValid = true;         
         var val1 = this.getPercentDiscount().getValue();
         var val2 = this.getAbsoluteDiscount().getValue();         
         if(val1 == '' && val2 == ''){
             isValid = false;
         }         
         if(!isValid){            
            RM.AppMgr.showErrorMsgBox('Please enter percent or absolute discount value');
         }
         
         return isValid;
     },

    save: function () {         
        if(this.validateForm()){             
            var disc = this.getPercentDiscount().getValue();            
            if (disc) {
                disc = disc + '%';            
            }
            else {
                disc = '$' + Ext.Number.toFixed(parseFloat(this.getAbsoluteDiscount().getValue()), 2);
            }
            this.selectCb.call(this.selectCbs, disc);
            RM.ViewMgr.back();
        }        
    },

    back: function () {
        RM.ViewMgr.back();
    }

});