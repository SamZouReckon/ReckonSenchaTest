Ext.define('RM.component.RMAmountField', {
    extend: 'RM.component.ExtTextField',
    xtype: 'rmamountfield',
    requires: ['RM.component.DataEntryKeypad'],
    
    constructor: function(config){          
        this.isInitializing = true;
        this.readOnlyField = config.readOnly || false;     
        config.trailingZerosUpTo = config.trailingZerosUpTo == 0 || config.trailingZerosUpTo ? config.trailingZerosUpTo : 2;
        this.callParent(arguments);        
    },
    
    initialize: function () {        
        this.callParent(arguments);      
        this.on('focus', this.onFieldFocus, this);         
        this.setReadOnly(true);
        this.isInitializing = false;
    },

    onFieldFocus: function(field, e) {    
        if (this.keypadOnTop)
            return;
        if(this.readOnlyField) return;        
        this.fieldMaskEl = e.target.nextElementSibling;
        this.showCursor();        
        this.fieldUniqueId = e.target.id;       
        
        //get field's owner panel
        this.owningPanel = field.up('panel');         
        
        var keypad = {
            xtype:'dataentrykeypad',        
            docked: 'bottom',
            keypadType: 'amount',
            listeners: {
                keytap: this.onKeyTap,
                scope: this
            }
        };
        
        this.keypad = this.owningPanel.add(keypad);
        this.revertBackVal = this.getValue();
        this.clearScrollTimer();
        var scroller = this.owningPanel.getScrollable().getScroller();        
        this.scrollTimer = window.setTimeout(function() {             
            scroller.scrollTo(0, field.element.dom.offsetTop, true);                                            
        }, 600); 
        this.keypadOnTop = true; 
        RM.ViewMgr.regBackHandler(this.removeKeypad, this);
        
        //get root container
        this.rootContainer = this.getRootContainer(this.owningPanel);
        
        //set tap Listener on root container
        this.rootContainer.element.on({
            tap: this.handleTapInEntireScreen,
            scope: this
        });
    },
    
    removeKeypad: function() { 
        
        if (this.keypadOnTop) {   
            var val = this.getValue();
            
            if (val == '.')
                val = '0.0';
        
            if (this.config.decimalPlaces && val != '')
                //this.setValue(this.getPrefix() + Ext.Number.toFixed(parseFloat(val), this.config.decimalPlaces));   
                this.setValue(this.getPrefix() + this.formatVal(val));
           
            this.owningPanel.remove(this.keypad);          
            this.keypadOnTop = false;
            RM.ViewMgr.deRegBackHandler();
            this.clearCursorBlinkTimer();
            this.clearScrollTimer();            
            var scroller = this.owningPanel.getScrollable().getScroller();        
            this.scrollTimer = window.setTimeout(function() {                                            
                 scroller.scrollTo(0, 0, true);                                            
            }, 300); 
            this.fireValueChangeEvent(val);           
        }        
    },
    
    onKeyTap: function (key) {  
        if(key === 'bar') return;
        if(key === 'done'){            
            this.removeKeypad();
            return;
        }
        if(key === 'cancel'){
            this.setValue(this.revertBackVal);
            this.removeKeypad();            
            return;
        }
        var val = this.getValue();
        var valStr = this.getPrefix() + val.toString();
        var valStrLen = valStr.length;  
        var pointIndex = valStr.indexOf('.');        
               
        if (key === 'backspace') {
            if (valStrLen > 0) {
                valStr = valStr.slice(0, -1);
                this.setValue(valStr);                
            }            
        } 
        else {
            if (this.config.decimalPlaces) {
                if ((key != '.' && valStrLen - 1 < pointIndex + this.config.decimalPlaces) || pointIndex < 0) {
                    if (valStr == this.getPrefix() + '0' && key != '.')
                        valStr = this.getPrefix();                
                    this.setValue(valStr + key);
                }
            }
            else {                
                if (pointIndex != -1 && key == '.')
                    return;
                if (valStr == this.getPrefix() + '0')
                    valStr = this.getPrefix(); 
                this.setValue(valStr + key);
            } 
        }
    },   
    
    //Overridden getValue to remove prefix
    getValue: function() {
        var val = this.callParent();
        var valStr = val.toString();        
        if (this.config.prefix && valStr.indexOf(this.config.prefix) != -1) {
            valStr = valStr.slice(this.getPrefix().length);            
        }        
        return valStr;
    },    
    
    //To format value when loading the form
    applyValue: function(newVal,oldVal){         
        var valStr = newVal ? newVal.toString() : '';  
        if (!oldVal && oldVal !== '') {
            this.valBeforeChange = valStr;        //store original value of the field for valueChange Event
            if (this.config.decimalPlaces && valStr !== '')            
                //valStr = Ext.Number.toFixed(parseFloat(valStr), this.config.decimalPlaces);
                valStr = this.formatVal(valStr);
        }
        if (valStr.indexOf(this.getPrefix()) == -1 && valStr !== '') {
            valStr = this.getPrefix() + this.formatVal(valStr);       
        }
        return valStr;
    },     
    
    handleTapInEntireScreen: function(e) {        
        if (this.fieldUniqueId !== e.target.id) {           
            this.removeKeypad();
        }        
    },    
    
    getRootContainer: function(owningPanel) {
        while (owningPanel.getParent()) {  
            owningPanel = owningPanel.getParent();
        }
        return owningPanel;
    },
    
    getPrefix: function() {
        return (this.config.prefix ? this.config.prefix : '');
    },    
    
    showCursor: function() {        
        var me = this;         
        this.cursorBlinkTimer = window.setInterval(
            function() {                     
                if (this.myCursorOff) {
                    me.fieldMaskEl.style.cssText = 'display: none !important;' 
                }
                else { 
                    me.fieldMaskEl.style.cssText = '' 
                }
                this.myCursorOff = !this.myCursorOff 
            }
            , 500);            
    },
    
    //clear scroll timer used for form scrolling
    clearScrollTimer: function(){
        if(this.scrollTimer){
            window.clearTimeout(this.scrollTimer)
        }        
    },
    
    //clear cursor blink timer
    clearCursorBlinkTimer: function(){
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
    },
    
    formatVal: function(val){          
        var formattedValStr = parseFloat(val).toString();
        var pointPosition = formattedValStr.indexOf('.');
        if (pointPosition !== -1) {
            var digitsAfterPoint = formattedValStr.length - pointPosition - 1;
            var diff = this.config.trailingZerosUpTo - digitsAfterPoint;
            if (diff > 0) {
                for (i = 0; i < diff; i++) {
                    formattedValStr = formattedValStr + '0';
                }
            }
        }
        else if(this.config.trailingZerosUpTo > 0) {
            formattedValStr = formattedValStr + '.';
            for (i = 0; i < this.config.trailingZerosUpTo; i++) {
                formattedValStr = formattedValStr + '0';
            }
        }        
        return formattedValStr;
    }   
    
});