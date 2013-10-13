Ext.define('RM.component.RMPhoneField3', {
    //extend: 'Ext.field.Text', //See note below re component: {type: 'tel'}
    extend: 'Ext.field.Text',
    xtype: 'rmphonefield3',
    
    config : {
        clearIcon: false,
        listeners: {blur: 'onBlur'/*, keyup: 'onKeyup'*/},
        //component: {type: 'tel'}, //The issue with making this a tel phone field now is that iOS will allow u to call but Reckon One has area code in separate fields - look at combining in later version
        component: {type: 'number'},        
        ui: 'number',        
        cls: 'rm-flatfield',
        placeHolder: ''
    },       
    
    initialize: function () {        
        this.callParent(arguments);   
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        
        
        this.inputEl = this.element.down('input');
        this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field"></div>', true);

        //create a shadow text input that can display whatever format we need and also works with previous / next on virtual keypad
        //this.displayEl = this.inputEl.insertHtml('afterEnd', '<input class="x-input-el x-form-field" type="text" placeholder="' + this.getPlaceHolder() + '"></input>', true);        
        //this.displayEl.on('focus', this.showInputFld, this); //seems to be some runaway condition with this when tap
        this.displayEl.on('tap', this.showInputFld, this);
        
        this.showDisplayValue();        
    },
    
    getValue: function() {
        this.showValidation(true);
        
        var val = this.callParent();    

        return val;
    },
    
    setValue: function(){        
        var ret = this.callParent(arguments);
        this.showDisplayValue();
        return ret;
    },    
    
    showDisplayValue: function(){
        
        this.inputEl.hide(); 
        var displayVal =  this.getValue();
        //TODO: do any other formatting of display value required here        
        
        this.displayEl.setHtml(displayVal);
        this.displayEl.show();
            
    },
    
    showInputFld: function(){
       
       if(!this.getReadOnly()){
           this.displayEl.hide();
           this.inputEl.show();
           this.editVal = this.getValue();
           this.focus();
        }           
    },
    
    isValidPhoneNr: function(val){
        var value = parseFloat(val, 10); //TODO: change this to only accept numbers without dec pt
        return (isNaN(value)) ? false : true;
    },
    
    onBlur: function(){
        var val = this.getValue();
        if(this.isValidPhoneNr(val)){
            this.showDisplayValue();
        }
        else{             
            RM.AppMgr.showErrorMsgBox('Invalid phone number', 
                function(){
                    this.setValue('');
                    this.showDisplayValue();
                }, 
                this
            );            
        }
    },  
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }
    
});