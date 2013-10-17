Ext.define('RM.view.Customers', {
   extend: 'Ext.Panel',
	xtype: 'customers',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
    config: {
		
		layout: 'vbox',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
						ui: 'rm_topbarbuttonleft',
						icon: 'resources/images/icons/rm-back.svg',	
                        iconCls: 'rm-backbtniconcls',
                        width: '2.6em',
						itemId: 'back'				
					},{
						xtype: 'component',
						html: 'Customers',
						cls: 'rm-topbartitle'
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top'                
			},{
                xtype: 'button',
                text: 'Add a new customer',
                itemId: 'createCustomer',
                cls: 'rm-createitembtn'
            },{
				xtype: 'list',
				store: 'Contacts',
                loadingText: null,
                itemTpl: '<div>{Description} </div>',                
                flex: 1,
				
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