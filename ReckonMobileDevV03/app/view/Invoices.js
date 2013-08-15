Ext.define('RM.view.Invoices', {
	extend: 'Ext.Panel',
	xtype: 'invoices',
	requires: ['RM.component.SortSearchBar','RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
	config: {
		
		layout: 'fit',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{
						itemId: 'back',
						ui: 'rm_topbarbuttonleft',
						width: '2.6em',
						iconCls: 'rm-back',
						iconMask: 'true'
					}, {
						xtype: 'component',
						itemId: 'title',
						html: 'Invoices',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
						text: 'ADD',
						itemId: 'add',                        
						ui: 'rm_topbarbuttonright'
					}
				]
			}, {
				xtype: 'sortsearchbar',
				docked: 'top',
				sortfields: [
					{ text: 'Amount', value: 'amount' },
					{ text: 'Due date', value: 'duedate' }
				]
			}
		]
	},
    
	initialize: function() {        
        this.isShowCustomer = this.config.isShowCustomer;
		this.callParent(arguments);
        
		this.add({
			xtype: 'list',
			store: 'Invoices',
            loadingText: null,
			disableSelection: true,
			grouped: true,            
			itemTpl: this.getTemplate(),
			
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
		});
        
	},
    
	setIsShowCustomer: function(isShowCustomer) {
        this.isShowCustomer = isShowCustomer;
	},
    
	getTemplate: function() {
       
        var tplStr =                         
                	
               '<tpl if="this.isShowCustomer()">'+
                    '<div>'+
                        '<div style="width: 55%; display: inline-block;">'+
                            '<div class="rm-orgnametext rm-pl5">{CustomerName}</div>'+
                        '</div>'+
                        '<div style="width: 45%; display: inline-block; vertical-align: top;">'+
                            '<div class="rm-nextgrayarrow rm-invoice-invoiceamount rm-alignr ">${[RM.AppMgr.numberWithCommas(values.Amount)]}</div>'+
                        '</div>' + 
                    '</div>'+
        			'<div>' +
                        '<div style="display: inline-block; vertical-align: top;">'+
        			        '<div class="rm-invoices-invoicecode rm-pt5 rm-pl5">{InvCode}</div>' +
                        '</div>'+                        
        			'</div>' +            
                '<tpl else>'+
                    '<div>' +
                        '<div style="width: 55%; display: inline-block; vertical-align: top;">'+
                            '<div class="rm-orgnametext rm-pt5 rm-pl5">{InvCode}</div>'+
                        '</div>' +
                        '<div style="width: 45%; display: inline-block; vertical-align: top;">'+
                            '<div class="rm-nextgrayarrow rm-pt5 rm-invoices-invoiceamount rm-alignr ">${[RM.AppMgr.numberWithCommas(values.Amount)]}</div>' +
                        '</div>'+
                    '</div>' +
                '</tpl>'+			
    			'<div>' +  
                    '<div style="width: 60%; display: inline-block; vertical-align: top;">'+
                        '<div class="rm-invoices-duestatus rm-pt5 rm-pl5 "> {[this.calculateDays(values.DueDate, values.DueDays, values.Status)]}' +
                            '<tpl if="this.isOverdue(values.DueDate, values.DueDays, values.Status)">' +                                
                                "<span class='rm-reddot'></span>" +
                                "<tpl if='RM.ViewMgr.showEmailReminder()'>"+
                                    "<span class='rm-emailreminder rm-pl5'>Send email reminder</span>" +
                                '</tpl>' +
                            '</tpl>' +
                        '</div>' +
                    '</div>'+
                    '<div style="width: 40%; display: inline-block; vertical-align: top;">'+
                            '<div class="rm-invoices-duestatus rm-alignr rm-pt5 rm-mr20">{[RM.AppMgr.capitalizeString(RM.InvoicesMgr.getInvoiceStatusText(values.Status))]}</div>'+
                    '</div>' +                     
    			'</div>'
						 
        
        var me = this;
        
		return new Ext.XTemplate(
			tplStr,
			{
            isOverdue: function(dueDate, dueDays, status){
               if (status == RM.Consts.InvoiceStatus.PAID) return false; 
               return dueDate && dueDate.getFullYear() > 1 && dueDays < 0;
            },
			calculateDays: function (dueDate, dueDays, status) {
                if (status == RM.Consts.InvoiceStatus.PAID) return ''; 
                if(!dueDate || dueDate.getFullYear() == 1){
                    return 'No due date';                    
                }
				else if (dueDays < 0) {
					return "Overdue"
				}
				else if (dueDays == 0) {
					return "Due today"
				}
				else if (dueDays == 1) {
					return "Due in 1 day"
				}
				else {
					return "Due in " + dueDays + " days"
				}
			},
            isShowCustomer: function(){
                return me.isShowCustomer;
            }
		});        
	}  
});
