Ext.define('RM.model.TaxStatus', {
	extend: 'Ext.data.Model',
	config: {
	    idProperty: 'TaxStatusID',
	    fields: [{ name: 'TaxStatusID', type: 'int'}, 'Name']
	}	
});