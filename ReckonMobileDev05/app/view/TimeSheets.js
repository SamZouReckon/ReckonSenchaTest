Ext.define('RM.view.TimeSheets', {
	extend: 'Ext.Panel',
	xtype: 'timesheets',
	requires: ['RM.component.RMList', 'RM.component.RMCalendar'],
	config: {
		
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{
						xtype: 'component',
						html: 'Timesheets',
						cls: 'rm-topbartitle'
					},{
						xtype: 'spacer'

					},{
						text: 'Add',
						itemId: 'add',                        
						ui: 'rm_topbarbuttonright'
					}
				]
			}, {
			    xtype: 'tabpanel',                
			    cls: 'rm-tabbar',
			    tabBar: {                    
			        defaults: {
			            flex: 1
			        },                    
			        layout: { pack: 'center' }
			    },
			    items: [{
			        title: 'List',
			        xtype: 'panel',			        
                    layout: 'vbox',
			        items: [
			            {
			                xtype: 'sortsearchbar',
			                docked: 'top',
			                sortfields: [                                
                                { text: 'Customer', value: 'CustomerName' },
                                { text: 'Project', value: 'ProjectName' },
                                { text: 'Date', value: 'Date' }                                               	            
			                ]
			            }, {
			                xtype: 'rmlist',
			                store: 'TimeEntries',
                            flex: 1,
                            grouped: true,
                            loadingText: null,
			                emptyText: 'No timesheets found.',
			                itemTpl: new Ext.XTemplate(                                
                                    '<tpl>',                                                                       
                                        '<div class = "rm-colorgrey">',
                                        '{[this.formatDate(values.Date)]}',
                                        '<span class = "rm-colorlightgrey rm-ml5">({[RM.AppMgr.minsToTime(values.Duration)]})</span>',
                                        '</div>',
                                        '<div class = "rm-fontsize70">',
                                        '{[this.showStatus(values.StatusCode)]}',
                                        '</div>',
                                    '</tpl>',                                
                                    {                                    
                                        formatDate: function(val) {
                                            return Ext.Date.format(val, 'j M Y');
                                        },
                                        showStatus: function (val) {
                                            return RM.TimeSheetsMgr.getTimeSheetStatusText(val);
                                        }
                                    }
                                )
			                }
			        ]
			    }, {
			        title: 'Calendar',
			        xtype: 'rmcalendar',
                    store: 'TimeEntriesCalendar'
			    }]
			}
		]
	}   
});