Ext.define('RM.model.BankAccount', {
    extend: 'Ext.data.Model',    	
    config: {
		idProperty: 'BankAccountID',
        fields: ['BankAccountID', 'Description']
    }
});