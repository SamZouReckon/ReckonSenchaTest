Ext.define('RM.controller.CustomerInvoicesC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            customerInvoices: 'customerinvoices',
            invoicesList: 'customerinvoices list',
            sortSearchBar: 'customerinvoices sortsearchbar'
        },
        control: {
            'customerinvoices': {
                show: 'onShow'
            },
            'customerinvoices sortsearchbar': {
                sort: 'onSort',

                search: function (val) {
                    var store = this.getInvoicesList().getStore();
                    store.clearFilter();
                    store.filter('search', val);
                    this.setLoadTimer();
                },

                searchclear: function () {
                    this.getInvoicesList().getStore().clearFilter();
                    this.loadList();
                }
            },
            'customerinvoices list': {
                select: 'onItemSelect'
            },
            'customerinvoices #add': {
                tap: 'add'
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },

    showView: function () {
        var view = this.getCustomerInvoices();
        if (!view)
            view = { xtype: 'customerinvoices' };
        RM.ViewMgr.showPanel(view);
    },


    onShow: function () {
        this.getInvoicesList().getStore().getProxy().setUrl(RM.AppMgr.getApiUrl('CustomerInvoices'));
        this.loadList();
    },

    onItemUpdated: function (itemType) {
        if (itemType == 'invoice' && this.getCustomerInvoices()) {
            this.loadList();
        }
    },

    onSort: function (sortVal) {
        if (sortVal != 'customer') {
            RM.InvoicesMgr.showCustInvoices('Invoices', null, null, sortVal);
            this.getSortSearchBar().setSearch('customer');
        }
    },

    onItemSelect: function (list, rec) {
        // Delay the selection clear so get a flash of the selection
        setTimeout(function () { list.deselect(rec); }, 500);
        RM.InvoicesMgr.showCustInvoices(rec.data.CustomerName,  rec.data.CustomerId, rec.data.CustomerName, 'duedate');
    },

    add: function () {
        RM.InvoicesMgr.showInvoiceDetail(true, null,
			function (closeType, data) {
			    return null;
			},
			this
		);
    },

    loadList: function () {
        RM.AppMgr.loadStore(this.getInvoicesList().getStore());
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }


});