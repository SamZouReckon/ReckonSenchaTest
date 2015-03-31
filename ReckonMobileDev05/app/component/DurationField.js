Ext.define('RM.component.DurationField', {
    extend: 'RM.component.ExtTextField',
    xtype: 'durationfield',
    requires: 'RM.component.DurationPicker',

    initialize: function () {        
        this.callParent(arguments);
        this.duration = 0;        
        this.on('tap', function (field) {
            this.showPicker();            
        }, this);
    },

    constructor: function (config) {        
        config.clearIcon = false; 			
        config.readOnly = true;
        this.callParent(arguments);
    },

    showPicker: function () {
        durationPicker = Ext.create("RM.component.DurationPicker", {
            hidden: true,
            zIndex: 9999,

            //Get config values if present else asign default
            useTitles: this.config.useTitles || true,
            increment: this.config.increment || 1,
            minHours: this.config.minHours || 0,
            maxHours: this.config.maxHours || 1000,
            hoursTitle: this.config.hoursTitle || 'Hours',
            minutesTitle: this.config.minutesTitle || 'Minutes',

            listeners: {
                change: function (picker, values) {
                    this.setValue(picker.getValue());  //uncomment once value from server comes in minutes (picker's getValue function returns minute value)                    
                },
                show: function(picker){
                    RM.ViewMgr.regBackHandler(picker.hide, picker);
                },
                hide: function(){
                    RM.ViewMgr.deRegBackHandler();    
                },
                scope: this
            }
        });
        durationPicker.show();
        durationPicker.setValue(this.getValue());
    },

    setValue: function (duration) { 
        duration ? this.showValidation(true) : this.showValidation(false);        
        this.duration = duration;        
        valueInField =  RM.AppMgr.minsToTime(duration);        	
        this.callParent([valueInField]);              
    },

    getValue: function () {        
        return this.duration;   
    }

});
