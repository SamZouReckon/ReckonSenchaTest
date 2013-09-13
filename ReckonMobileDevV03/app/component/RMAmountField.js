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
        var scroller = this.owningPanel.getScrollable().getScroller();
        window.setTimeout(function() {                                            
            scroller.scrollTo(0, field.element.dom.offsetTop, true);                                            
        }, 200); 
        this.keypadOnTop = true; 
        
        //get root container
        this.rootContainer = this.getRootContainer(this.owningPanel);
        
        //set tap Listener on root container
        this.rootContainer.element.on({
            tap: this.handleTapInEntireScreen,
            scope: this
        });
    },
    
    removeKeypad: function(field) {          
        if (this.keypadOnTop) {            
            this.owningPanel.remove(this.keypad);          
            this.keypadOnTop = false;
        }
    },
    
    onKeyTap: function (key) {        
        var val = this.getValue();
        var valStr = this.config.prefix + val.toString();
        var valStrLen = valStr.length;  
        
        if (key === 'back') {
            if (valStrLen > 0) {
                valStr = valStr.slice(0, -1);
                this.setValue(valStr);                
            }
            return;
        }  
        if(val === null || val === undefined ) {            
            return;
        }
        if(this.config.decimalPlaces && valStr.indexOf('.') != -1){
            if(key === '.') return;
            if( valStrLen-1 < ( valStr.indexOf('.') + this.config.decimalPlaces ) ){
                this.setValue(valStr + key);
            }
        }
        else{
            this.setValue(valStr + key);
        } 
    },   
    
    //Overridden getValue to remove prefix
    getValue: function(){
        var val = this.callParent();
        var valStr = val.toString();        
        if(this.config.prefix && valStr.indexOf(this.config.prefix) != -1){
            valStr = valStr.slice(this.config.prefix.length);            
        }        
        return valStr;
    },
    
    handleTapInEntireScreen: function(e){        
        if(this.fieldUniqueId !== e.target.id){           
            this.removeKeypad();
        }        
    },    
    
    getRootContainer: function(owningPanel){
        while(owningPanel.getParent()){  
            owningPanel = owningPanel.getParent();
        }
        return owningPanel;
    }
});