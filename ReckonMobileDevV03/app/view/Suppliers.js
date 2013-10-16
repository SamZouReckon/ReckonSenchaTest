Ext.define('RM.view.Suppliers', {
   extend: 'Ext.Panel',
	xtype: 'suppliers',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
    config: {
		
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{						
						ui: 'rm_topbarbuttonleft',
						icon: 'resources/images/icons/rm-back.svg',
                        width: '2.6em',						
						itemId: 'back'				
					},{
						xtype: 'component',
						html: 'Suppliers',
						cls: 'rm-topbartitle'
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top',
				sortfields: [{text:'Name', value:'name'}]
			},{
				xtype: 'list',
				store: 'Suppliers',
                itemTpl: '<div>{Name}</div>',
				
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