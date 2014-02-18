Ext.define('RM.store.Transactions', {
    extend: 'RM.store.RmBaseStore',
    config: {
        model: 'RM.model.Transaction',
		groupField: 'DueDate'
    }
});