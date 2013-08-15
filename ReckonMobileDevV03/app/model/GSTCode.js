Ext.define('RM.model.GSTCode', {
	extend: 'Ext.data.Model',
	config: {
	    idProperty: 'GSTCodeID',
	    fields: ['GSTCodeID', 'GSTCode', 'ShortDescription', { name: 'Rate', type: 'float'}]
	}	
});