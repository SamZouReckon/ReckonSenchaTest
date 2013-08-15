/**
* The picker with hours and minutes slots
*/
Ext.define('RM.component.DurationPicker', {
    extend:'Ext.picker.Picker',
    xtype:'durationpicker',

	
    config:{
        /**
         * @cfg {Number} increment The number of minutes between each minute value in the list.
         * Defaults to: 5
         */
        increment:5,


        /**
         * @cfg {Number} start value of hours
         */
        minHours:0,


        /**
         * @cfg {Number} end value of hours.
         */
        maxHours:23,


        /**
         * @cfg {String} title to show above hour slot
         * Note: for titles to show set the {useTitle} config to true.
         */
        hoursTitle:'Hours',


        /**
         * @cfg {String} title to show above hour slot
         * Note: for this to show set the {useTitle} config to true.
         */
        minutesTitle:'Minutes',


        /**
         * @cfg {boolean} show/hide title headers.
         * Note: defaults to false (framework default 'Ext.picker.Picker')
         */


        slots: []
    },


    /**
     *
     * @param value
     * @param animated
     */
    setValue:function (value, animated) {  
	
		var hoursVal=0;
		var minutesVal=0;		
		hoursVal = parseInt(value/60);
		minutesVal = parseInt(value%60);
		
		value = {
			hours:hoursVal,
			minutes:minutesVal
		};
        
        this.callParent([value, animated]);
    },


    /**
     * @override
     * @returns {Date} A date object containing the selected hours and minutes. Year, month, day default to the current date..
     */
    getValue:function () {
        var value = this.callParent(arguments);            
		var duration = value.hours*60 + value.minutes;
		return duration;
    },


    applySlots:function (slots) {
        var me = this,
            hours = me.createHoursSlot(),
            minutes = me.createMinutesSlot();


        return [hours, minutes];
    },


    createHoursSlot:function () {
        var me = this,
            initialConfig = me.getInitialConfig(),
            title = initialConfig.hoursTitle ,
            minHours = initialConfig.minHours,
            maxHours = initialConfig.maxHours,
            hours = [],
            slot;


        for (var i = minHours; i <= maxHours; i++) {
            //var text = (i < 10) ? ('0' + i) : i; //Add leading zero
            hours.push({text:i, value:i});
        }


        slot = {
            name:'hours',
            align:'center',
            title:title,
            data:hours,
            flex:1
        };


        return slot;
    },


    createMinutesSlot:function () {
        var me = this,
            initialConfig = me.getInitialConfig(),
            title = initialConfig.minutesTitle ,
            increment = initialConfig.increment,
            minutes = [],
            slot;


        for (var j = 0; j < 60; j += increment) {
            //var text;
            //text = (j < 10) ? ('0' + j) : j; //Add leading zero
            minutes.push({text:j, value:j});
        }


        slot = {
            name:'minutes',
            align:'center',
            title:title,
            data:minutes,
            flex:1
        };
        return slot;
    }
});
