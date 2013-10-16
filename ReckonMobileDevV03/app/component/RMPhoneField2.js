Ext.define('RM.component.RMPhoneField2', {
    extend: 'Ext.field.Text',
    xtype: 'rmphonefield2',
    
    config : {
        clearIcon: false,
        component: {type: 'number'},
        ui: 'number',        
        listeners: {blur: 'onFieldBlur'},
        cls: 'rm-flatfield'
    },       
    
    initialize: function () {        
        this.callParent(arguments);
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }
        
    },
    
    getValue: function() {
        this.showValidation(true);
        return this.callParent(arguments);  
    },
    
    setValue: function(){        
        var ret = this.callParent(arguments);
        return ret;
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


    },
    
    //Override method in Ext.field.Text
    onChange: function(me, value, startValue) {
        //if(value != this.editVal){
           me.fireEvent('change', this, value, startValue);
        //}            
    },        
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }
    
});    