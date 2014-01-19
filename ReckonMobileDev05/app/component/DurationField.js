Ext.define('RM.component.DurationField', {
    extend: "Ext.field.Text",
    xtype: 'durationfield',
    requires: 'RM.component.DurationPicker',

    constructor: function (config) {
        that = this,
		this.duration = 0;
        config.clearIcon = false; 			//set false to hide clear icon, its not required for this control

        this.picker = Ext.create("RM.component.DurationPicker", {
            hidden: true,
            zIndex: 9999,

            //Get config values if present else asign default
            useTitles: config.useTitles || true,
            increment: config.increment || 1,
            minHours: config.minHours || 0,
            maxHours: config.maxHours || 1000,
            hoursTitle: config.hoursTitle || 'Hours',
            minutesTitle: config.minutesTitle || 'Minutes',

            listeners: {
                change: function (picker, values) {
                    that.setValue(picker.getValue());  //uncomment once value from server comes in minutes (picker's getValue function returns minute value)                    
                },
                show: function(picker){
                    RM.ViewMgr.regBackHandler(picker.hide, picker);
                },
                hide: function(){
                    RM.ViewMgr.deRegBackHandler();    
                }                
            }
        });

        Ext.Viewport.add(this.picker);

        this.on("focus", function (field, e) {           
            that.picker.show();
            that.picker.setValue(that.getValue());
            field.blur();
        });

        this.callParent(arguments);
    },

    setValue: function (duration) { 
        duration ? this.showValidation(true) : this.showValidation(false);        
        this.duration = duration;        
        valueInField =  RM.AppMgr.minsToTime(duration);        	
        this.callParent([valueInField]);              
    },

    getValue: function () {        
        return this.duration;   
    },
    
    /*
    reset: function(){
        this.callParent(arguments);
        this.setLabelCls('');
    },*/
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }   

});
