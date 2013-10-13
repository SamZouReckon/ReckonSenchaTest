Ext.define('RM.component.RMAmountField3', {
    extend: 'Ext.field.Number',
    xtype: 'rmamountfield3',
    
    config : {
        clearIcon: false,
        listeners: {blur: 'onBlur'/*, keyup: 'onKeyup'*/},
        cls: 'rm-flatfield',
        prefix: '',
        trailingZerosUpTo: 2
    },       
    
    initialize: function () {        
        this.callParent(arguments);   
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        
        
        this.inputEl = this.element.down('input');
        this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field"></div>', true);
        this.displayEl.on('tap', this.showInputFld, this);

        //create a shadow text input that can display whatever format we need and also works with previous / next on virtual keypad - seems to be some runaway condition with this when tap
        //this.displayEl = this.inputEl.insertHtml('afterEnd', '<input class="x-input-el x-form-field" type="text"></input>', true);        
        //this.displayEl.on('focus', this.showInputFld, this);
        
        this.showDisplayValue();        
    },
    
    getValue: function() {
        this.showValidation(true);
        return this.callParent(arguments);  
    },
    
    setValue: function(){        
        var ret = this.callParent(arguments);
        this.showDisplayValue();
        return ret;
    },
    
    onBlur: function(){
        var val = this.getValue();

        if(Ext.isEmpty(val, true)){
            RM.AppMgr.showErrorMsgBox('Invalid number', 
                function(){
                    this.setValue(this.editVal);
                    this.showDisplayValue();
                }, 
                this
            );
        }
        else{
            this.showDisplayValue(); 
        }
    },
    
    showDisplayValue: function(){
        
        this.inputEl.hide();
        var val = this.getValue();
        if(val){
            var displayVal = this.getPrefix() + RM.AppMgr.numberWithCommas(val.toFixed(2));
            //TODO: do any other formatting of display value required here        
        
            this.displayEl.setHtml(displayVal);
            //this.displayEl.dom.value = displayVal;
        }            
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
    
    //Override method in Ext.field.Text
    onChange: function(me, value, startValue) {
        if(value != this.editVal){
            me.fireEvent('change', this, value, startValue);
        }            
    },        
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }
    
    
    /*onKeyUp: function(fld, e){
         //tried returning false if e.event.keyCode is not a number but it doesn't stop the value from still going in the field in iOS
         var val = this.getValue();
         if(val != null){
            this.editVal = this.getValue();            
         }
         else{
             //reset to value before if an invalid character is entered
             //TODO: limit to decimal places, trailingZeros, etc. Also stop the change event firing when this occurs.
             this.setValue(this.editVal);
             return false; 
         }    
    },*/    
    
});