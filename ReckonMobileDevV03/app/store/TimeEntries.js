Ext.define('RM.store.TimeEntries', {
    extend: 'RM.store.RmBaseStore',
    config: {
        model: 'RM.model.TimeEntry',
        grouper: {
            groupFn: function(rec) {
                var groupHeader = '<div style="display: inline-block;">' + rec.get('PeriodName') + '</div>';
                if (rec.get('TimeEntryId') != '00000000-0000-0000-0000-000000000000') {
                    groupHeader += '<div style="display: inline-block;float:right;">Total: ' + RM.AppMgr.minsToTime(rec.get('PeriodMins')) + '</div>'
                }
                return groupHeader;
            }
        }
    }
});