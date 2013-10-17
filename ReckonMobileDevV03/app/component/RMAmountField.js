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

        this.displayEl = this.inputEl.insertHtml('afterEnd', '<div class="x-input-el x-form-field" style="position:absolute; top:0; background:white;"></div>', true);
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
        value = this.callParent(arguments);
        return RM.util.MathHelpers.roundToEven(value, this.getDecimalPlaces());        
    },
        
    onInputBlur: function(){
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
            this.getComponent().setValue(RM.util.MathHelpers.roundToEven(val, this.getDecimalPlaces()));
            this.showDisplayValue();             
        }
    },
    
    showDisplayValue: function(){
        var val = this.getValue();
        if(val){
            var displayVal;
            if(this.getCurrencyMode()) {
                displayVal = RM.AppMgr.formatCurrency(val, this.getDecimalPlaces());
            }
            else {
                displayVal = RM.AppMgr.numberWithCommas(val, this.getDecimalPlaces());
            }            
            displayVal = this.handleTrailingZeros(displayVal);                
            this.displayEl.setHtml(displayVal);            
        }            
        this.displayEl.show();            
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