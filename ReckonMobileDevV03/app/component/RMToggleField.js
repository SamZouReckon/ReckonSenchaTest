Ext.define('RM.component.RMToggleField', {
    extend: 'Ext.field.Text',
    xtype: 'rmtogglefield',
    
    constructor: function (config) {        
        config.clearIcon = false;                //Raj: Not required for this control
        config.readOnly = true;                  //Raj: To stop popping up of keypad when field is tapped
        //this.initConfig(config);
        this.callParent(arguments);
    },
    
    initialize: function () {        
        var me = this;        
        this.callParent();
        this.setValue(this.config.toggleState);
        this.element.on('tap', function () {me.toggleState();}, this);
    },    
    
    toggleState: function () {        
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
    }    
    
});