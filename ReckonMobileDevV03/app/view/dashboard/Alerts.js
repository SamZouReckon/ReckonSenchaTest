Ext.define('RM.view.dashboard.Alerts', {
    extend: 'Ext.Panel',
    xtype: 'dbalerts',
    config: {
        
		items: [{				
                html: '<h2 class="rm-hearderbg">ALERTS</h2>'
			},{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items:[
                    {
                        itemId: 'msg',
                        html: '<div class="rm-dashboard-nodata">' + RM.Consts.NoAccessMsg + '</div>',
                        flex:1
                    },
                    {
						itemId: 'invoices',
                        flex:1
					},{
						itemId: 'bills',
                        flex:1
					}
				]
			
			}]
    },
	
    initialize: function() {        
		this.callParent(arguments);		
		var cont = this.getComponent(1);
		cont.getComponent('bills').element.on('tap', this.onBillsTap, this);
		cont.getComponent('invoices').element.on('tap', this.onInvoicesTap, this);
	},  
	
    setViewData: function(data) {        
        this.getComponent(1).getComponent('msg').setHidden(RM.PermissionsMgr.canView('Invoices') || RM.PermissionsMgr.canView('Bills'));
        this.getComponent(1).getComponent('invoices').setHidden(!RM.PermissionsMgr.canView('Invoices'));
        this.getComponent(1).getComponent('bills').setHidden(!RM.PermissionsMgr.canView('Bills'));
        
        if (!RM.PermissionsMgr.canView('Invoices') && !RM.PermissionsMgr.canView('Bills')) {           
            return;
        }        
        
        this.getComponent(1).getComponent('invoices').setHtml(
            '<div class="rm-digitpanel">' +
            '<div >' +
            '<div class="rm-digittext">' + data.InvoicesOverdueNr + '</div>' +
            '<div class="rm-fltl rm-mt5">' +
            '<div class="rm-billtext rm-pl5 rm-nextgrayarrow rm-fontsize100">Invoices</div>' +
            '<div class="rm-billtext">Overdue</div>' +
            '<div class="rm-billamount">$' + RM.AppMgr.valueWithCommas(data.InvoicesOverdueAmount) + '</div>' + 
            '</div>' +
            '<div class="rm-clr"></div>' +
            '</div>' +
            '</div>'
            );
        
        this.getComponent(1).getComponent('bills').setHtml(
            '<div class="rm-digitpanel">' +
            '<div >' +
            '<div class="rm-digittext">' + data.BillsOverdueNr + '</div>' +
            '<div class="rm-fltl rm-mt5">' +
            '<div class="rm-billtext rm-pl5 rm-nextgrayarrow rm-fontsize100">Bills</div>' +
            '<div class="rm-billtext">Due soon</div>' + 
            '<div class="rm-billamount">$' + RM.AppMgr.valueWithCommas(data.BillsOverdueAmount) + '</div>' + 
            '</div>' +
            '<div class="rm-clr"></div>' +
            '</div>' +
            '</div>'           
            );
        /*
        this.getComponent(1).getComponent('bills').setHtml(
        '<div class="rm-digitpanel">' +
        '<div >' +
        '<div class="rm-digittext">  </div>' +
        '<div class="rm-fltl rm-mt5">' +
        '<div class="rm-billtext rm-pl5 rm-fontsize100">Bills</div>' +
        '<div class="rm-billtext">Coming soon</div>' + 
        '<div class="rm-billamount">  </div>' + 
        '</div>' +
        '<div class="rm-clr"></div>' +
        '</div>' +
        '</div>'           
        );
        */
    },
	
	onBillsTap: function(){
        RM.ViewMgr.showBills();
	},	
	
	onInvoicesTap: function(){
		RM.ViewMgr.showInvoices();	
	}
});