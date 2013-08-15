xt.define('RM.view.Projects1', {
   extend: 'Ext.Panel',
	xtype: 'projects1',
    config: {
		
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
                        xtype: 'segmentedbutton',
						itemId: 'statusfilter',
                        allowDepress: true,
						allowMultiple: true,
                        items: [{
                                text: 'Filter1',
								itemId: 'filter1'
                            },{
								text: 'Filter2',
								itemId: 'filter2'
							}
                        ]
                    },{
						xtype:'textfield',
						itemId: 'searchfilter',
                        width: 100
                    },{
                        xtype: 'datepickerfield',
                        itemId: 'datefilter',
                        width: 150,
                        value: new Date(),
                        dateFormat: 'd/m/Y'
                    },{
                        xtype: 'segmentedbutton',
						itemId: 'sortorder',
                        allowDepress: true,
						allowMultiple: true,
                        items: [{
                                text: 'Sort Name',
								itemId: 'Name'
                            },{
								text: 'Sort Customer',
								itemId: 'CustomerName'
							}
                        ]
                    },{
						iconCls: 'refresh',
						itemId: 'refresh',
						iconMask: true,
						ui: 'plain'
                    }
                ]
            },{
				xtype: 'list',
				store: 'Projects',
                itemTpl: '<div>{Name} - {CustomerName}</div>',
				
				plugins: [{
						xclass: 'Ext.plugin.ListPaging'
					}
				]
			},{
				xtype: 'toolbar',
				
				docked: 'bottom',
				items: [{
			            text: 'Get By Id',
			            itemId: 'getbyid'
			        },{
					    text: 'Create',
                        itemId: 'create'
					},{
						text: 'Update',
						itemId: 'update'
			        },{
			            text: 'Delete',
			            itemId: 'delete'
			        }
				]
			}
        ] 
    }
});