Ext.define('RM.view.Contacts', {
   extend: 'Ext.Panel',
	xtype: 'contacts',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging', 'RM.component.SecureButton'],
    config: {
		
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
						xtype: 'component',
						html: 'Contacts',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
                        xtype: 'securebutton',
                        permissionFor: { name:'Contacts', action:'AddEdit' },
						text: 'ADD',
						itemId: 'add',                        
						ui: 'rm_topbarbuttonright'
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top',
                sortfields: [
					{text: 'All',  value: 'CustomerSuppliers'},
					{text: 'Customers', value: 'Customers'},
					{text: 'Suppliers',  value: 'Suppliers'}
				]
			},{
				xtype: 'list',
				store: 'Contacts',
                grouped: true,
                loadingText: null,
                itemTpl: '<div class="rm-nextgrayarrow rm-orgnametext rm-mr5">{Description} </div>',                
				
				plugins: [
					{
                        xclass: 'RM.component.RMPullRefresh',                        
                    },
					{
						type: 'listpaging',
						autoPaging: true,
                        noMoreRecordsText: ''
					}
				]
				
			}
        ] 
    }
});