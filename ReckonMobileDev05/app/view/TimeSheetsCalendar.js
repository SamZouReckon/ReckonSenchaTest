Ext.define('RM.view.TimeSheetsCalendar', {
	extend: 'Ext.Panel',	
	xtype: 'timesheetscalendar',
	requires: ['RM.component.touchcalendar.TouchCalendarView', 'RM.component.touchcalendar.TouchCalendarSimpleEvents'],
	
	initialize: function(){
		var dtNow = new Date();
		var calView = Ext.create('RM.component.touchcalendar.TouchCalendarView', {
			itemId: 'calview',
			mode: 'month',
			weekStart: 1,
			value: dtNow,
			eventStore: Ext.getStore('TimeEntriesCalendar'),
			plugins: [Ext.create('RM.component.touchcalendar.TouchCalendarSimpleEvents', { startEventField: 'Start', endEventField: 'End' })],
			listeners: {
				painted: function(cal){
					//console.log('TouchCalendarView painted');
					var minMaxDate = calView.getPeriodMinMaxDate();
					calView.fireEvent('periodchange', calView, minMaxDate.min.get('date'), minMaxDate.max.get('date'));
					//calView.fireEvent('periodchange', cal, Ext.Date.getFirstDateOfMonth(dtNow), Ext.Date.getLastDateOfMonth(dtNow));
					//calView.fireEvent('periodchange', cal, new Date(2013, 1, 1), new Date(2013, 1, 27));
				}
			
			}
		})
		
		this.add(calView);
		
		this.callParent();
	}
});