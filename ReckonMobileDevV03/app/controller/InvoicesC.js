Ext.define('RM.controller.InvoicesC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.component.CustInvSummaryList', 'RM.component.InvoicesList'],
    config: {
        refs: {
            Invoices: 'invoices',
            sortSearchBar: 'invoices sortsearchbar'
        },
        control: {
            'invoices': {
                show: 'onShow'
            },
            'invoices sortsearchbar': {
                sort: 'onSort',
                search: 'onSearch',
                searchclear: 'onSearchClear'
            },
            'invoices list': {
                select: 'onItemSelect'
            },
            'invoices #add': {
                tap: 'add'
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);        
    },

    showView: function () {
        
        var view = this.getInvoices();
        if (!view){
            view = { xtype: 'invoices' };            
        }            
        RM.ViewMgr.showPanel(view);
    },
    
    onShow: function () {
        if(!this.dataLoaded){
            this.onSort('duedate');
            this.dataLoaded = true;
        }        
    },

    onItemUpdated: function (itemType) {
        if (itemType == 'invoice') {            
            this.activeList.reload();
        }
    },

    onSort: function (sortVal) {
        
        var view = this.getInvoices();
        view.removeAt(2);
        if(sortVal == 'customer'){
            this.activeList = view.add({xtype:'custinvsummarylist'});
        }
        else{            
            this.activeList = view.add({xtype:'invoiceslist', sortVal:sortVal, isShowCustomer: false});        
        }

    },

    onSearch: function(val){
        this.activeList.setSearch(val);
    },
    
    onSearchClear: function(){
        this.activeList.clearSearch();
    },
    
    add: function () {
        RM.InvoicesMgr.showInvoiceDetail(true, null,
			function (closeType, data) {
			    return null;
			},
			this
		);
    }

});