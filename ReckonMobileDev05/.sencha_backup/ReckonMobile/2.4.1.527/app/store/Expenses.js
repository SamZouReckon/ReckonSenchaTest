Ext.define('RM.store.Expenses', {
    extend: 'RM.store.RmBaseStore',	
    config: {
        model: 'RM.model.Expense',
        grouper: {
            groupFn: function(rec) {
                var groupHeader = '<div style="display: inline-block;">' + rec.get('PeriodName') + '</div>';
                if (rec.get('ExpenseId') != '00000000-0000-0000-0000-000000000000') {
                    groupHeader += '<div style="display: inline-block;float:right;">Total: ' + RM.AppMgr.formatCurrency(rec.get('PeriodAmount')) + '</div>'
                }
                return groupHeader;
            }
        }
    }
});