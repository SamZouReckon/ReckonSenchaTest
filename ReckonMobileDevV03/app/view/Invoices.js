Ext.define('RM.view.Invoices', {
	extend: 'RM.component.SecurePanel',
	xtype: 'invoices',
    requires: ['RM.component.SortSearchBar', 'RM.component.SecureButton'],
    config: {
		permissionFor: 'Invoices',
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
						xtype: 'component',
						html: 'Invoices',
                        cls: 'rm-topbartitle',
					},{
						xtype: 'spacer'					
					},{
						text: 'ADD',
						itemId: 'add',
                        xtype: 'securebutton',
                        permissionFor: 'Invoices',
						ui: 'rm_topbarbuttonright'
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top',
				sortfields: [
					{text: 'Customer',  value: 'customer'},
					{text: 'Amount', value: 'amount'},
					{text: 'Due date',  value: 'duedate'}
				]
                
			}
        ] 
    }
});