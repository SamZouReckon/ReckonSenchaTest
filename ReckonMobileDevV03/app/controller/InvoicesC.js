Ext.define('RM.controller.InvoicesC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.Invoices'],
    config: {
        refs: {
            invoices: 'invoices',
            invoicesList: 'invoices list',
            invoicesTitle: 'invoices #title',
            sortSearchBar: 'invoices sortsearchbar'
        },
        control: {
            'invoices #back': {
                tap: 'back'
            },
            'invoices': {
                show: 'onShow'
            },
            'invoices sortsearchbar': {
                sort: 'onSort',

                search: function (val) {
                    this.search = val;
                    this.setLoadTimer();
                },

                searchclear: function () {
                    delete this.search;
                    this.loadList();
                }
            },
            'invoices list': {
                itemtap: 'onItemTap'
                //,select: 'onItemSelect'			
            },
            'invoices #add': {
                tap: 'add'
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },

    showView: function (invoicesTitle, customerId, customerName, sortVal) {
        this.invoicesTitle = invoicesTitle;
        this.customerId = customerId;
        this.customerName = customerName;

        var view = this.getInvoices();
        if (!view){
            view = { xtype: 'invoices', isShowCustomer: (this.customerId == null) };
        }
        else{
            view.setIsShowCustomer(this.customerId == null);            
        }
        RM.ViewMgr.showPanel(view);

        var store = this.getInvoicesList().getStore();
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('Invoices'));
        //if (customerId)
        //    store.filter('customerId', customerId);
        
        if (sortVal) {
            this.setFilters();
            this.getSortSearchBar().setSearch(sortVal);
            var groupDueDate = (sortVal == 'duedate');
            store.setGroupField(groupDueDate ? 'DuePeriodName' : '');
            this.getInvoicesList().setGrouped(groupDueDate);
        }
        else{
            this.loadList();
        }           
    },
    

    onShow: function () {
        this.getInvoicesTitle().setHtml(this.invoicesTitle);
    },

    onItemUpdated: function (itemType) {
        if (itemType == 'invoice' && this.getInvoices()) {
            this.loadList();
        }
    },

    setFilters: function(){
        var store = this.getInvoicesList().getStore();
        store.clearFilter();
        
        if(this.customerId){
            store.filter('customerId', this.customerId);
        }
        
        if(this.search){
            store.filter('search', this.search);
        }        
        
    },
    
    onSort: function (sortVal) {
        var store = this.getInvoicesList().getStore();

        var groupDueDate = (sortVal == 'duedate');
        store.setGroupField(groupDueDate ? 'DuePeriodName' : '');
        this.getInvoicesList().setGrouped(groupDueDate);
        this.loadList();
    },

    onItemTap: function (list, index, target, rec, e, eOpts) {
        if (Ext.fly(e.target).hasCls('rm-emailreminder')) {
            this.sendInvoiceReminder(rec.data.InvoiceId);         
        }
        else {
            RM.InvoicesMgr.showInvoiceDetail(false, rec.data,
				function (closeType, data) {
				    //if(closeType == 'save')
				    //	Ext.Msg.alert('Save', Ext.encode(data), Ext.emptyFn);
				    return null;
				},
				this
			);
        }

    },
    
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

    /*onItemSelect: function(list, rec){
	
    // Delay the selection clear so get a flash of the selection
    setTimeout(function(){list.deselect(rec);},500);

    },*/

    add: function () {
        var data = this.customerId ? { CustomerId: this.customerId, CustomerName: this.customerName} : null;
        RM.InvoicesMgr.showInvoiceDetail(true, data,
			function (closeType, data) {
			    return null;
			},
			this
		);
    },

    loadList: function () {
        this.setFilters();
        
        RM.AppMgr.loadStore(this.getInvoicesList().getStore());
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    },

    back: function () {
        //this.detailsCb.call(this.detailsCbs, 'back');
        RM.ViewMgr.back();
    }


});