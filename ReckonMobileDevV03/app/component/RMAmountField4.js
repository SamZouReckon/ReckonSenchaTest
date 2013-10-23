//This is a quick attempt to try making the field's input element the display field and add a new input field for the number input
Ext.define('RM.component.RMAmountField4', {
    extend: 'Ext.field.Text',
    xtype: 'rmamountfield4',
    
    config : {
        clearIcon: false,
        listeners: {/*blur: 'onFieldBlur',*/ focus: 'onDisplayFieldFocus'/*, keyup: 'onKeyup'*/},
        cls: 'rm-flatfield',
        ui: 'number', 
        prefix: '',
        trailingZerosUpTo: 2,
        placeHolder: ''
    },       
    
    initialize: function () {        
        this.callParent(arguments);   
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        

        this.displayEl = this.element.down('input');
        //this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field"></div>', true);        

        //create a shadow text input that can display whatever format we need and also works with previous / next on virtual keypad
        this.inputEl = this.displayEl.insertHtml('beforeBegin', '<input class="x-input-el x-form-field x-input-number" type="number" placeholder="' + this.getPlaceHolder() + '"></input>', true);        
        //this.displayEl.on('focus', this.showInputFld, this); //seems to be some runaway condition with this when tap
        //this.displayEl.on('tap', this.showInputFld, this);
        this.inputEl.on('blur', this.onInputFieldBlur, this);
        
        //this.showDisplayValue();        
    },
    
    getValue: function() {
        this.showValidation(true);
        return this.callParent(arguments);  
    },
    
    setValue: function(val){
        console.log('setValue ' + val);
        this.myVal = val;
        /*var ret = this.callParent(arguments);
        this.showDisplayValue();
        return ret;*/
        this.showDisplayValue();
    },
    
    onDisplayFieldFocus: function(){
        
        console.log('onFieldFocus');    
        this.showInputFld();
        
    },    
    
    onInputFieldBlur: function(){
        
        console.log('onFieldBlur');
        this.showDisplayValue();
        
        return;
        
        
        var val = this.getValue();

        if(val == ''){ //it is impossible to know if user entered empty string or an input with invalid nr chars in - they both return ''
            this.element.down('input').dom.value = '';
            this.setValue(this.editVal);                                
        }
        this.showDisplayValue();
        
        /*if(Ext.isEmpty(val, true)){
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
        }*/
    },
    
    showDisplayValue: function(){
        console.log('showDisplayValue ' + this.myVal);
        this.inputEl.hide();
        
        if(this.myVal){
            this.displayEl.dom.value = this.getPrefix() + RM.AppMgr.numberWithCommas(this.myVal,2)    
        }
        
        this.displayEl.show();
        return;
        
        
        var val = this.inputEl.dom.value;
        if(val){
            var displayVal = '$' + val;  //this.getPrefix() + RM.AppMgr.numberWithCommas(val,2);
            //TODO: do any other formatting of display value required here        
        
            //this.displayEl.setHtml(displayVal);
            this.displayEl.dom.value = displayVal;
        }            
        this.displayEl.show();
            
    },
    
    showInputFld: function(){
       console.log('showInputFld');
        
       if(!this.getReadOnly()){
           this.displayEl.hide();
           this.inputEl.dom.value = this.myVal;
           this.inputEl.show();
           this.editVal = this.myVal; //this.getValue();
           this.inputEl.dom.focus();
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