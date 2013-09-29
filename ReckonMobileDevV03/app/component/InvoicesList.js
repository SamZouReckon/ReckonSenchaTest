Ext.define('RM.component.InvoicesList', {
    extend: 'Ext.Panel',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
    xtype: 'invoiceslist',    
    config:{
        layout: 'fit',
        control: {
            'list': {
                itemtap: 'onItemTap'
            }
        }        
    },

    initialize: function () {

        this.customerId = this.config.customerId;
        this.isShowCustomer = this.config.isShowCustomer;
		this.callParent(arguments);
        
        var groupDueDate = (this.config.sortVal == 'duedate');
        
		this.add({
			xtype: 'list',
			store: 'Invoices',
            loadingText: null,
			disableSelection: true,
			grouped: groupDueDate,
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
        
        var store = Ext.data.StoreManager.lookup('Invoices');
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('Invoices'));
        if(groupDueDate){
            store.setGroupField('DuePeriodName');    
        }        
        RM.AppMgr.loadStore(store);
        
    },
    
    onItemTap: function (list, index, target, rec, e, eOpts) {
        if (Ext.fly(e.target).hasCls('rm-emailreminder')) {
            this.sendInvoiceReminder(rec.data.InvoiceId);         
        }
        else {
            RM.InvoicesMgr.showInvoiceDetail(false, rec.data,
				function (closeType, data) {
				    return null;
				},
				this
			);
        }

    },
    
    reload: function(){
         this.loadList();
    },    
    
    setSearch: function(val){
        this.search = val;
        this.setLoadTimer();
    },
    
    clearSearch: function(){
        delete this.search;
        this.loadList();     
    },
    
    loadList: function () {
        var store = Ext.data.StoreManager.lookup('Invoices');
        store.clearFilter();
        
        if(this.customerId){
            store.filter('customerId', this.customerId);
        }
        
        if(this.search){
            store.filter('search', this.search);
        }     
        
        RM.AppMgr.loadStore(store);
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    },
    
    //This method which will be called from onItemTap will currently never be called as RM.ViewMgr.showEmailReminder() always returns false
    //- it was set to return false as although the initial mobile ux had an reminder functionality the web app doesn't at this stage so decision was to turn it off in mobile as well
    sendInvoiceReminder: function(invoiceId){
        
        RM.AppMgr.getServerRecById('Invoices', invoiceId,
			function (data) {
                RM.InvoicesMgr.sendMsg(
                    function(){
                        RM.ViewMgr.backTo('invoices');
                    },
                    this,
                    data, 
                    'emailreminder'
                ); 
			},
			this,
            function(eventMsg){
                alert(eventMsg);                
            }
		);
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