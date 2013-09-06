Ext.define('RM.view.CustomerInvoices', {
	extend: 'RM.component.SecurePanel',
	xtype: 'customerinvoices',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging', 'RM.component.SecureButton'],
    config: {
		permissionFor: 'Invoices',
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
						xtype: 'component',
						html: 'Invoices',
                        cls: 'rm-topbartitle',
					},{
						xtype: 'spacer'					
					},{
						text: 'ADD',
						itemId: 'add',
                        xtype: 'securebutton',
                        permissionFor: 'Invoices',
						ui: 'rm_topbarbuttonright'
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top',
				sortfields: [
					{text: 'Customer',  value: 'customer'},
					{text: 'Amount', value: 'amount'},
					{text: 'Due date',  value: 'duedate'}
				]
			},{
				xtype: 'list',
				store: 'CustomerInvoices',
                loadingText: null,
				grouped: true,
				itemTpl: '<div class="rm-nextgrayarrow rm-ml5 rm-mr5">{CustomerName}' + '<span class="rm-customerinvoices-invoicecount">' + ' ({InvoiceCount}) ' + '</span>' +
                                '<tpl if=" 0< InvoiceOverdueCount">' +                                
                                "<span class='rm-reddot'></span>" +
                                '</tpl>'+
                         '</div>',                         
				
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