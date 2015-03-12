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
					}, {
					    xtype: 'spacer'

					}, {
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
			                emptyText: 'No timesheets found.'
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