Ext.define('RM.component.RMAmountField', {
    extend: 'Ext.field.Number',
    xtype: 'rmamountfield',
    
    config : {
        clearIcon: false,
        listeners: {blur: 'onInputBlur'/*, keyup: 'onKeyup'*/},
        cls: 'rm-flatfield',
        currencyMode: true,
        decimalPlaces: 2,
        trailingZerosUpTo: 2,
        placeHolder: ''
    },       
    
    initialize: function () {        
        this.callParent(arguments);   
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        

        this.inputEl = this.element.down('input');
        // Add a focus handler to support device 'tabbing' focus from prev/next keypad buttons
        this.inputEl.on('focus', this.showInputFld, this);

        this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field rm-field-input-formatted"></div>', true);
        //this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field" ></div>', true);
        this.displayEl.on('tap', this.focus, this);
        
        this.initComplete = true;
        this.showDisplayValue();        
    },
    
    getValue: function() {
        this.showValidation(true);
        return this.callParent(arguments);  
    },
    
    setValue: function(){        
        var ret = this.callParent(arguments);
        if(this.initComplete) this.showDisplayValue();
        return ret;
    },
    
    applyValue: function(value) {
        // This is to handle when the value is set through code or config, ie not by user interaction
        value = this.callParent(arguments);
        return RM.util.MathHelpers.roundToEven(value, this.getDecimalPlaces());        
    },
        
    onInputBlur: function(){
        var val = this.getValue();

        if(!Ext.isNumeric(val)) val = null;    
    
        // User interaction has changed value. Update the actual underlying input control value, making sure to respect the max decimal places
        if(val) {
            this.getComponent().setValue(RM.util.MathHelpers.roundToEven(val, this.getDecimalPlaces()));            
        }
        else {
            // This is to allow setting a blank value in the input, if that's not a valid case then manage that with validation
            this.getComponent().setValue(val);
        }        
        console.log(this.getValue());
        this.showDisplayValue();             
        
    },
    
    showDisplayValue: function(){
        var val = this.getValue();
        
        // Display if we have a valid number to show
        if(Ext.isNumeric(val)){
            var displayVal;
            if(this.getCurrencyMode()) {
                displayVal = RM.AppMgr.formatCurrency(val, this.getDecimalPlaces());
            }
            else {
                displayVal = RM.AppMgr.numberWithCommas(val, this.getDecimalPlaces());
            }            
            displayVal = this.handleTrailingZeros(displayVal);                
            this.displayEl.setHtml(displayVal);                        
            this.displayEl.show(); 
        } 
        // otherwise leave the input control visible and clear the display value
        else {
            this.displayEl.hide(); 
            this.displayEl.setHtml(val);
        }                   
    },
    
    showInputFld: function(){
       if(!this.getReadOnly()){
           this.displayEl.hide();
           this.inputEl.show();
           this.editVal = this.getValue();
        }           
    },
    
    //Override method in Ext.field.Text
    onChange: function(me, value, startValue) {
        if(value != this.editVal){
            me.fireEvent('change', this, value, this.editVal);
            //To maintain compatibility with previous RMAmountField for now - InvoiceLineItem listens for this
            me.fireEvent('valueChange', value, this.editVal);    
        }            
    },  
    
    onClearIconTap: function() {
        this.callParent(arguments);
        this.showDisplayValue();
    },
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    },
    
    handleTrailingZeros: function(val) {
        // Make sure only the necessary number of trailing zeros is displayed
        var decimalIndex = val.indexOf('.');
        if( decimalIndex !== -1 && this.getTrailingZerosUpTo() > 0) {
            var goodFromHere = false;
            var minIndexFromEnd = this.getDecimalPlaces() - this.getTrailingZerosUpTo();
            
            // reverse val and take out any element from the end until either we've reached 
            // the trailingZerosUpTo point or a non-zero number is found, then reverse back
            val = val.split('').
            reverse().
            filter(function(item, index) {
                if(index >= minIndexFromEnd || item !== '0') { 
                    goodFromHere = true;
                    return true;
                }
                return goodFromHere;                
            }).
            reverse().
            join('');
        }
        else {
            val = val.replace(/([0-9]+)\.0+$/,'$1')
        }
        
        return val;
    }
    
});