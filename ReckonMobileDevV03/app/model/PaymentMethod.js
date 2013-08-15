Ext.define('RM.model.PaymentMethod', {
    extend: 'Ext.data.Model',    	
    config: {
		idProperty: 'PaymentMethodID',
        fields: ['PaymentMethodID', 'Description']
    }
});