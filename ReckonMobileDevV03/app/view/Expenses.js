Ext.define('RM.view.Expenses', {
	extend: 'Ext.Panel',
	xtype: 'expenses',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
	config: {
		
		layout: 'fit',
		items:[
			{
				xtype: 'toolbar',                
				docked: 'top',				
				items: [
					{
						xtype: 'component',
						html: 'Expenses',
						cls: 'rm-topbartitle'
						
					},{
						xtype: 'spacer'					
					},{
						text: 'ADD',
						itemId: 'add',                        
						ui: 'rm_topbarbuttonright',
					
					}
				]
			},{
				xtype: 'sortsearchbar',				
				docked: 'top'
			},{
				xtype: 'list',
				store: 'Expenses',
                grouped: true,
                loadingText: null,
                itemTpl: new Ext.XTemplate(
                '<tpl if="ExpenseId == \'00000000-0000-0000-0000-000000000000\'">',
                    '<div class="rm-invoicelineitem-add" style = "padding-left: 0; font-weight: normal;">Add an expense</div>',
                '<tpl else>',                 
                    '<div>',
                        '<div style="width: 55%; display: inline-block;">',
                            '<div class="rm-orgnametext">{[this.customerText(values.CustomerName)]}</div>',
                        '</div>',
                        '<div style="width: 45%; display: inline-block; vertical-align: top;">',
                            '<div class="rm-nextgrayarrow rm-orgnametext rm-alignr">${[RM.AppMgr.numberWithCommas(values.Amount)]}</div>',
                        '</div>' , 
                    '</div>',
                    '<div>',
                        '<div style = "width: 70%; display: inline-block;">',
                            '<div class="rm-expensesrowfields rm-pt5" >{[this.projectText(values.ProjectName)]}</div>',
                        '</div>' ,
                            '<div style = "width: 30%; display: inline-block; vertical-align: top;" ><div class="rm-expensesrowfields rm-alignr rm-pt5" style="margin-right: 20px;">{[this.statusText(values.StatusCode)]}</div>',
                        '</div>',
                    '</div>',
                    '<div>',
                        '<div style = "display: inline-block;">',
                            '<div class="rm-expensesrowfields rm-pt5">{[this.itemText(values.ItemName)]}</div>',
                        '</div>',
                    '</div>',                           
                '</tpl>',
                {
                    customerText: function (customerName) {
                        if(customerName == null) return "No customer";
                        else return customerName;
                     }
                },
                {
                    statusText: function (statusCode) {
                        if (statusCode == 'd') return "Draft";
                        else if (statusCode == 's') return "Submitted";
                        else if (statusCode == 'a') return "Approved";
                        else if (statusCode == 'p') return "Paid";
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
                ),                
				
				plugins: [
					{
                        xclass: 'RM.component.RMPullRefresh',                        
                    },{
						type: 'listpaging',
						autoPaging: true,
                        noMoreRecordsText: ''
					}
				]
			}
		] 
	}
});