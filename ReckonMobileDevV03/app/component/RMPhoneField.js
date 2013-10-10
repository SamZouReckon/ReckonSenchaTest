Ext.define('RM.component.RMPhoneField', {
    extend: 'RM.component.ExtTextField',
    xtype: 'rmphonefield',
    requires: ['RM.component.DataEntryKeypad'],
    
    constructor: function(config){          
        this.isInitializing = true;
        this.readOnlyField = config.readOnly || false; 
        config.readOnly = true;
        this.callParent(arguments);        
    },
    
    initialize: function () {        
        this.callParent(arguments);      
        this.on('tap', this.onFieldFocus, this);
        //this.on('blur', this.onFieldBlur, this);
        this.setReadOnly(true);
        this.isInitializing = false;
    },

    onFieldFocus: function(field, e) {
        console.log(this.getId() + ' onFieldFocus');
        if(this.fieldMaskEl) this.clearCursorBlinkTimer();
        if(this.readOnlyField) return;        
        this.fieldMaskEl = e.target.nextElementSibling;
        this.showCursor();        
        //this.addCls('rm-field-warning');
        
        this.owningPanel = field.up('panel');  

        this.revertBackVal = this.getValue();
        this.owningPanel.scrollShowField(field, e.target.id, 'phone', this);

    },
    
    onFieldLostFocus: function(){
        console.log(this.getId() + ' onFieldLostFocus');
        this.clearCursorBlinkTimer();
        //this.removeCls('rm-field-warning');
        
        this.fireValueChangeEvent(this.getValue());
    },
    
    onKeyTap: function (key) {  
        if(key === 'bar' || key === 'blankbtn') return;
        if(key === 'done'){            
            //this.removeKeypad();
            return;
        }
        if(key === 'cancel'){
            this.setValue(this.revertBackVal);
            //this.removeKeypad();            
            return;
        }
        var val = this.getValue();
        var valStr = val.toString();
        var valStrLen = valStr.length;  
        //var pointIndex = valStr.indexOf('.');        
               
        if (key === 'backspace') {
            if (valStrLen > 0) {
                valStr = valStr.slice(0, -1);
                this.setValue(valStr);                
            }            
        } 
        else{
            this.setValue(valStr + key); 
        }
               
    },   
    
    applyValue: function(newVal,oldVal){        
        var valStr = newVal ? newVal.toString() : '';  
        if (!oldVal && oldVal !== '') {            
            this.valBeforeChange = valStr;        //store original value of the field for valueChange Event           
        }            
        return valStr;
    },    
    
    showCursor: function(fieldMask) {        
        var me = this;         
        me.cursorBlinkTimer = window.setInterval(
            function() {                     
                if (me.myCursorOff) {
                    me.fieldMaskEl.style.cssText = 'display: none !important;' 
                }
                else { 
                    me.fieldMaskEl.style.cssText = '' 
                }
                me.myCursorOff = !me.myCursorOff 
            }
            , 500);            
    },
    
    //clear cursor blink timer
    clearCursorBlinkTimer: function(){
        console.log(this.getId() +' clearCursorBlinkTimer');
        if(this.cursorBlinkTimer){
            window.clearTimeout(this.cursorBlinkTimer)
        }
        this.fieldMaskEl.style.cssText = 'display: none !important;'
    },
    
    setReadOnly: function(value){        
        this.callParent([true]); 
        if(this.isInitializing) return;
        this.readOnlyField = value;
    },
    
    getReadOnly: function(){
        return this.readOnlyField;
    },
    
    //check for value change and fire valueChange Event
    fireValueChangeEvent: function(val){        
        var newVal = parseFloat(val) || '';
        var oldVal = parseFloat(this.valBeforeChange) || '';        
        if(newVal != oldVal)
        this.fireEvent('valueChange', newVal, oldVal);
    }
    
});