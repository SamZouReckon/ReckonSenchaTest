Ext.define('RM.component.RMAmountField', {
    extend: 'Ext.field.Number',
    xtype: 'rmamountfield',
    mixins: { visibleOnFocus: 'RM.component.VisibleOnFocus' },
    
    config : {
        clearIcon: false,
        listeners: {blur: 'showDisplayValue', focus: 'showInputFld'},
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
        this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field rm-field-input-formatted"></div>', true);        
        this.displayEl.on('tap', this.focus, this);
        
        this.mixins.visibleOnFocus.constructor.call(this);
        
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
        if(Ext.isNumeric(value)) {
            value =  RM.util.MathHelpers.roundToEven(value, this.getDecimalPlaces());        
        }
        return value;
    },
        
    showDisplayValue: function(){        
        // Display if we have a valid number to show
        if(this.displayVal){                   
            this.displayEl.show(); 
        } 
        // otherwise leave the input control visible and clear the display value
        else {
            this.displayEl.hide(); 
        }                   
    },
    
    showInputFld: function(){
       if(!this.getReadOnly()){
           this.displayEl.hide();           
        }           
    },
    
    //Override method in Ext.field.Text
    onChange: function(me, value, startValue) {
        // We are potentially modifying the new value again in here, set a flag to prevent firing the change event twice
        if(!me.inChangeEvent) {
            me.inChangeEvent = true;
            var val;
            if(!Ext.isNumeric(value)) { 
                val = null; 
            }
            else {
                // Use apply value to do limits checks and rounding
                val = this.applyValue(parseFloat(value));
            }
        
            this.updateValue(val); 
            this.setDisplayValue(val);
            
            if(String(val) != String(startValue)) {
                this.fireEvent('change', this, val, startValue);
                //To maintain compatibility with previous RMAmountField for now - InvoiceLineItem listens for this
                this.fireEvent('valueChange', val, startValue);          
            }
            me.inChangeEvent = false;
        }             
    },  
    
    setDisplayValue: function(value) {
        // Display if we have a valid number to show
        if(Ext.isNumeric(value)){
            if(this.getCurrencyMode()) {
                this.displayVal = RM.AppMgr.formatCurrency(value, this.getDecimalPlaces());
            }
            else {
                this.displayVal = RM.AppMgr.numberWithCommas(value, this.getDecimalPlaces());
            }            
            this.displayVal = this.handleTrailingZeros(this.displayVal);                
            this.displayEl.setHtml(this.displayVal);                        
        } 
        // otherwise leave the input control visible and clear the display value
        else {
            this.displayVal = null;
            this.displayEl.setHtml('');
        }    
        this.showDisplayValue();
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