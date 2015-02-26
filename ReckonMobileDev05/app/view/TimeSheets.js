Ext.define('RM.view.TimeSheets', {
	extend: 'Ext.Panel',
	xtype: 'timesheets',
	requires: ['RM.component.RMList', 'RM.view.TimeSheetsCalendar', 'RM.component.RMCalendar'],
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
                                { text: 'Customer', value: 'customer' }, 
                                { text: 'Date', value: 'date' }                                               	            
			                ]
			            }, {
			                xtype: 'rmlist',
			                store: 'TimeEntries',
                            flex: 1,
			                grouped: true,                  
			                emptyText: 'No timesheets found.',
			                itemTpl: new Ext.XTemplate(
                                '<tpl if="TimeEntryId == \'00000000-0000-0000-0000-000000000000\'">',
                                '<div class="rm-invoicelineitem-add" style = "padding-left: 0; font-weight: normal;">Add time for today</div>',
                                '<tpl else>',
                                    '<div>',
                                        '<div style="width: 65%; display: inline-block;">',
                                            '<div class="rm-orgnametext">{[this.customerText(values.CustomerName)]}</div>',
                                        '</div>',
                                        '<div style="width: 35%; display: inline-block; vertical-align: top;">',
                                            '<div class="rm-nextgrayarrow rm-orgnametext rm-alignr" style="font-weight: normal;">{[RM.AppMgr.minsToTime(values.Duration)]}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div>',
                                        '<div style = "width: 65%; display: inline-block;">',
                                            '<div class="rm-timesheetrowfields rm-pt5" >{[this.projectText(values.ProjectName)]}</div>',
                                        '</div>',
                                        '<div style = "width: 35%; display: inline-block; vertical-align: top;" >',
                                            '<div class="rm-timesheetrowfields rm-alignr rm-pt5" style="margin-right: 20px;">{[this.billableText(values.Billable)]}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div>',
                                        '<div style = "display: inline-block;">',
                                            '<div class="rm-timesheetrowfields rm-pt5">{[this.itemText(values.ItemName)]}</div>',
                                        '</div>',
                                    '</div>',
                                '</tpl>',
                                {
                                    billableText: function (billable) {
                                        if (billable)
                                            return "";
                                        else
                                            return "Not billable";
                                    }
                                },
                                {
                                    customerText: function (customerName) {
                                        if (customerName == null) return "No customer";
                                        else return customerName;
                                    }
                                },
                                {
                                    projectText: function (projectName) {
                                        if (projectName == null) return "No project";
                                        else return projectName;
                                    }
                                },
                                {
                                    itemText: function (itemName) {
                                        if (itemName == null) return "No item";
                                        else return itemName;
                                    }
                                }
                                )
			                }
			        ]
			    }, {
			        title: 'Calendar',
			        xtype: 'rmcalendar'			        
			    }]
			}
		]
	}   
});