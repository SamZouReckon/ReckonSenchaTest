Ext.define('RM.controller.TimeSheetsCalendarC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            timeSheetsCalendar: 'timesheetscalendar'
        },
        control: {
            'timesheetscalendar #back': {
                tap: 'back'
            },
            'timesheetscalendar #calview': {
                periodchange: 'onPeriodChange',
                selectionchange: 'onSelectionChange'
            }
        }
    },

    onPeriodChange: function (cal, minDate, maxDate) {
        var store = Ext.getStore('TimeEntriesCalendar');
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('TimeEntriesCalendar'));
        store.clearFilter();
        store.filter('minDate', minDate);
        store.filter('maxDate', maxDate);
        store.load({
            callback: function (records, operation, success) {
                cal.refresh();
                var date = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 15);
                //this.getTimeSheetsCalendar().fireEvent('monthselect', new Date(date.getFullYear(), date.getMonth(), 1));
                this.getTimeSheetsCalendar().fireEvent('monthselect', new Date(date.getFullYear(), date.getMonth(), new Date(date.getFullYear(), date.getMonth(), 0).getDate()));
            },
            scope: this
        });

    },

    onSelectionChange: function (cal, newDate, prevVal) {
        this.getTimeSheetsCalendar().fireEvent('dateselect', newDate);
    },

    showView: function () {

        var view = this.getTimeSheetsCalendar();
        if (!view)
            view = { xtype: 'timesheetscalendar' };
        RM.ViewMgr.showPanel(view);
    },

    back: function () {
        RM.ViewMgr.back();
    }

});