Ext.define('RM.component.RMAmountField', {
    extend: 'RM.component.ExtTextField',
    xtype: 'rmamountfield',
    requires: ['RM.component.DataEntryKeypad'],
    
    initialize: function () {
        this.callParent(arguments);      
        this.on('focus', this.onFieldFocus, this);        
    },

    onFieldFocus: function(field, e) {
        this.fieldUniqueId = e.target.id;
        
        if (this.keypadOnTop)
            return;
        //get field's owner panel
        this.owningPanel = field.up('panel');         
        
        var keypad = {
            xtype:'dataentrykeypad',            
            maskPin: true,
            docked: 'bottom',
            listeners: {
                keytap: this.onKeyTap,
                scope: this
            }
        };
        
        this.keypad = this.owningPanel.add(keypad);
        this.clearScrollTimer();
        var scroller = this.owningPanel.getScrollable().getScroller();        
        this.scrollTimer = window.setTimeout(function() {                                            
            scroller.scrollTo(0, field.element.dom.offsetTop, true);                                            
        }, 200); 
        this.keypadOnTop = true; 
        this.simulateCursor(field);
        //get root container
        this.rootContainer = this.getRootContainer(this.owningPanel);
        
        //set tap Listener on root container
        this.rootContainer.element.on({
            tap: this.handleTapInEntireScreen,
            scope: this
        });
    },
    
    removeKeypad: function() { 
        var val = this.getValue();
        if (this.config.decimalPlaces && val != '')
            this.setValue(this.getPrefix() + Ext.Number.toFixed(parseFloat(val), this.config.decimalPlaces));        
        if(this.cursorTimer){
             window.clearInterval(this.cursorTimer);
             this.setPlaceHolder(this.config.placeHolder);
        }
        if (this.keypadOnTop) {            
            this.owningPanel.remove(this.keypad);          
            this.keypadOnTop = false;
        }
        this.clearScrollTimer();
        var scroller = this.owningPanel.getScrollable().getScroller();        
        this.scrollTimer = window.setTimeout(function() {                                            
            scroller.scrollTo(0, 0, true);                                            
        }, 200); 
    },
    
    onKeyTap: function (key) {        
        var val = this.getValue();
        var valStr = this.getPrefix() + val.toString();
        var valStrLen = valStr.length;  
        var pointIndex = valStr.indexOf('.');
               
        if (key === 'back') {
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
    
    applyValue: function(newVal,oldVal){    
        //console.log(oldVal);
        var valStr = newVal.toString();  
               
        if(valStr.indexOf(this.config.prefix) == -1 && valStr !== '')
            valStr = this.config.prefix + valStr;
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
    
    simulateCursor: function(tf){        
         if(this.config.cursorSimulate){
            this.cursorTimer = window.setInterval(
                function(){ 
                    if(this.myCursorOff){
                        tf.setPlaceHolder('|'); 
                    }
                    else{ 
                        tf.setPlaceHolder(''); 
                    }
                    this.myCursorOff = !this.myCursorOff 
                }
            ,500);            
        }
    },
    
    clearScrollTimer: function(){
        if(this.scrollTimer){
            window.clearTimeout(this.scrollTimer)
        }        
    }
});