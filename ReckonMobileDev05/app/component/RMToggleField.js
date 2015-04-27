Ext.define('RM.component.RMToggleField', {
    extend: 'Ext.field.Text',
    xtype: 'rmtogglefield',
    
    constructor: function (config) {        
        config.clearIcon = false;                //Raj: Not required for this control
        config.readOnly = true;                  //Raj: To stop popping up of keypad when field is tapped                
        this.callParent(arguments);
        
        // this has to be set after the callParent is issued because the overriding setReadOnly method will
        // be called as a result, forcing the value to be the same as config.readOnly.
        this.privateReadOnly = false;
    },
    
    initialize: function () {        
        var me = this;        
        this.callParent();
        this.setValue(this.config.toggleState);
        this.element.on('tap', function () {
            if(!this.getDisabled())
            me.toggleState();
        }, this);
        this.on('disabledchange', function (field, value) {
            value ? field.addCls(['rm-flatfield-disabled', 'rm-input-el-padding-right-25']) : field.removeCls(['rm-flatfield-disabled']);
        }, this);
    },    
    
    toggleState: function () {    
        if (this.privateReadOnly) { return; }
        this.val = !this.val;        
        this.setFieldState();        
    },
    
    getValue: function () {
        return this.val;
    },

    setValue: function (boolVal) {
        this.val = boolVal;
        this.setFieldState();
    },
    
    reset: function(){
        this.callParent(arguments);        
        this.setValue(this.config.toggleState);
    },
    
    setFieldState: function() {
        if(this.val){
            this.updateValue(this.config.onText);
            this.setCls('rm-togglefield-on rm-flatfield');
        }else{
            this.updateValue(this.config.offText);
            this.setCls('rm-togglefield-off rm-flatfield');
        }
    },
    
    setReadOnly: function(value) {
        this.privateReadOnly = value;
        this.callParent(arguments);
    }
    
});