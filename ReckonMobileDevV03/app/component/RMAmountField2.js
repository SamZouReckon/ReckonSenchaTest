Ext.define('RM.component.RMAmountField2', {
    extend: 'Ext.field.Text',
    xtype: 'rmamountfield2',
    
    config : {
        clearIcon: false,
        component: {type: 'number'},
        ui: 'number',        
        listeners: {focus: 'onFieldFocus', blur: 'onFieldBlur'},
        cls: 'rm-flatfield',
        prefix: '',
        decimalPlaces: 2,
        trailingZerosUpTo: 2
    },       
    
    initialize: function () {        
        this.callParent(arguments);
        this.editing = false;
        this.oldValue = null;
        
        var prefix = this.getPrefix();
        var label =  prefix ? (this.getLabel() +  '&nbsp;&nbsp;' + prefix) : this.getLabel();
        
        if(this.config.rmmandatory){
            label = label + ' <span style="color: #F00">*</span>';    
        }
        
        this.setLabel(label);
        
    },
    
    getValue: function() {
        this.showValidation(true);
        return this.callParent(arguments);  
    },
    
    setValue: function(val){
        var val = parseFloat(val).toFixed(this.getDecimalPlaces());
        var ret = this.callParent([val]);
        
        if(this.editing && this.oldValue != val){
            this.fireEvent('change', this, val, this.oldValue);
            //To maintain compatibility with previous RMAmountField for now - InvoiceLineItem listens for this
            this.fireEvent('valueChange', val, this.oldValue);            
        }
        this.oldValue = this.getValue();
        return ret;
    },
    
    onFieldFocus: function(){        
        //prevent input change firing change event as we only want one fired which will occur with toFixed below
        this.editing = true;
    },    
    
    onFieldBlur: function(){
        var val = this.getValue();
        
        if(val == ''){ //it is impossible to know if user entered empty string or an input with invalid nr chars in - they both return ''
            this.element.down('input').dom.value = '';
            //could show a warning but then next on keypad won't work good
            /*
            RM.AppMgr.showErrorMsgBox('Empty or invalid number input', 
                function(){
                    this.inputEl.dom.value = '';
                }, 
                this
            );*/            
        }
        else{
            this.setValue(val);
        }
        this.editing = false;

    },
    
    //Override method in Ext.field.Text
    onChange: function(me, value, startValue) {
        //fire the change event ourselves in setValue
        return;
    },        
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }
  
    
});