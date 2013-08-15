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
            increment: config.increment || 5,
            minHours: config.minHours || 0,
            maxHours: config.maxHours || 1000,
            hoursTitle: config.hoursTitle || 'Hours',
            minutesTitle: config.minutesTitle || 'Minutes',

            listeners: {
                change: function (picker, values) {
                    that.setValue(picker.getValue());  //uncomment once value from server comes in minutes (picker's getValue function returns minute value)
                    //that.setValue(picker.getValue() / 60);    //remove this line once value from server comes in minutes
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
            that.picker.setValue(that.getValue());  //uncomment once value from server comes in minutes (picker's getValue function returns minute value)
            //that.picker.setValue(that.getValue() * 60); //remove this line once value from server comes in minutes
            that.picker.show();
            field.blur();
        });

        this.callParent(arguments);
    },

    setValue: function (duration) {
        //code when duration coming in minutes from server
        //alert(duration);
        this.duration = duration;
        //var valueInField = RM.AppMgr.hoursToTime(this.duration / 60);
        //code when duration is in hours 
        //this.duration = duration * 60;
        //var valueInField = RM.AppMgr.hoursToTime(duration);
        valueInField =  RM.AppMgr.minsToTime(duration);
        //console.log('valueInField '+valueInField);		
        this.updateValue(valueInField);
              
    },

    getValue: function () {
        //console.log('getValue '+this.duration);
        return this.duration; //uncomment once value from server comes in minutes
        //return this.duration / 60; //remove this line once value from server comes in minutes
    },
    
    reset: function(){
        this.callParent(arguments);
        this.setLabelCls('');
    },
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    }   

});