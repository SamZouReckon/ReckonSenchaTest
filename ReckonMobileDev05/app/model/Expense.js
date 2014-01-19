Ext.define('RM.model.Expense', {
    extend: 'Ext.data.Model',    	
    config: {
		idProperty: 'ExpenseId',
        fields: ['ExpenseId', 'PeriodName', 'ProjectName', {name:'PeriodAmount', type:'float'}, {name:'Date', type:'date', dateFormat: 'c'}, 'ItemId', 'ItemName', {name:'Amount', type:'float'}, 'CustomerId', 'CustomerName', 'SupplierId', 'SupplierName', 'Notes', {name:'Billable', type:'bool'}, {name:'HasReceiptPhoto', type:'bool'}, 'StatusCode']
    }
});		
