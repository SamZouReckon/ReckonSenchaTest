Ext.define('RM.view.TimeSheets', {
	extend: 'Ext.Panel',
	xtype: 'timesheets',
	requires: ['RM.component.RMList','RM.view.TimeSheetsCalendar'],
	config: {
		
		layout: 'fit',
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
			}/*,{
				xtype: 'sortsearchbar',				
				docked: 'top'
			}*/
		]
	},
    
	initialize: function() {        
       
		this.callParent(arguments);       
        
		this.add([{
				xtype: 'timesheetscalendar',
				id: 'swipePanelId',
				docked: 'top',
				listeners: {
					painted: function () {
						var swipeDiv = document.getElementById('slideCalender');
						swipeDiv.style.display = "none";
					}
				},
				draggable: {
					direction: 'vertical',
					initialOffset: {
						x: 0,
						y: 0
					},
					constraint: {
						min: {
							x: 0,
							y: -100
						},
						max: {
							x: 0,
							y: 0
						}
					},
					listeners: {
						dragstart: function (draggable, evt, offsetX, offsetY, eOpts) {
							var swipeDiv = document.getElementById('slideCalender');
							if (swipeDiv.style.display == 'none') {
								draggable.setInitialOffset({
									x: 0,
									y: -170
								});
								swipeDiv.style.display = "";
							}
						},
						drag: function (draggable, evt, offsetX, offsetY, eOpts) {
							//console.log(offsetY);
						},
						dragend: function (draggable, evt, offsetX, offsetY, eOpts) {
							var swipeDiv = document.getElementById('slideCalender')
							if (offsetY < -50) {
								swipeDiv.style.display = "none";
								draggable.setInitialOffset({
									x: 0,
									y: 0
								})
                                this.fireEvent('calhide');
							}
							else {
								draggable.setInitialOffset({
									x: 0,
									y: 0
								})
								swipeDiv.style.display = "";
                                this.fireEvent('calshow');
							}
						},
                        scope: this
					}
				}
			}, {
				xtype: 'rmlist',
				store: 'TimeEntries',
				grouped: true,
                loadingText: null,
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
                            '</div>' , 
                        '</div>',
                        '<div>',
                            '<div style = "width: 65%; display: inline-block;">',
                                '<div class="rm-timesheetrowfields rm-pt5" >{[this.projectText(values.ProjectName)]}</div>',
                            '</div>' ,
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
                            if(customerName == null) return "No customer";
                            else return customerName;
                         }
                    },
                    {
                        projectText: function(projectName){
                            if(projectName == null) return "No project";
                            else return projectName;                        
                        }
                    },
                    {
                        itemText: function(itemName){
                            if(itemName == null) return "No item";
                            else return itemName;                        
                        }
                    }					
					)
			}]);
        
	}    
    
});