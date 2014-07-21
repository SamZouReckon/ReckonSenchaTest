Ext.define('RM.controller.AccountsC', {
    extend: 'Ext.app.Controller',
    requires: 'RM.view.Accounts',
    config: {
        refs: {
            accounts: 'accounts',
            accountsList: 'accounts list'
        },
        control: {
            'accounts #back': {
                tap: 'back'
            },
            'accounts sortsearchbar': {
                search: function (val) {
                    this.nameFilter = val;
                    this.setLoadTimer();
                },

                searchclear: function () {
                    delete this.nameFilter;
                    this.loadList();
                }
            },						
            'accounts list': {
                select: 'onItemSelect'
            }
        }

    },
    
    init: function () {
        //this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },    

    showView: function (selectDetails, cb, cbs) {       
        this.selectDetails = selectDetails;
        this.selectCb = cb;
        this.selectCbs = cbs;        
        var view = { xtype: 'accounts', selectDetails: selectDetails}; //create a new view each time as we want selectDetails to be effective
        RM.ViewMgr.showPanel(view);
        this.loadList();
    },

    /*onItemUpdated: function (itemType) {
        if (itemType == 'item') {
            this.loadList();
        }
    },  */  
    
    onItemSelect: function (list, rec) {

        setTimeout(function () { list.deselect(rec); }, 500);
        var item = rec.data;
        item.ItemName = item.Name;
        if(this.selectDetails){
    		RM.Selectors.showItemDetail(this.showItemTax, item,
    			function(closeType, data){
    				this.selectCb.call(this.selectCbs, [data]);
    				RM.ViewMgr.back({ type: 'slide', direction: 'left' });
    			},
    			this
    		);
       }
       else{
			this.selectCb.call(this.selectCbs, [item]);
			RM.ViewMgr.back({ type: 'slide', direction: 'left' });
       }
    
    },
    
   /* onCreateItem: function(){
        //alert('onCreateItem');
        RM.InvoicesMgr.showCreateItem(
            function(){
                
                
            },
            this
       );
        
    },*/

    back: function () {
        RM.ViewMgr.back();
    },

    loadList: function () {
        var store = Ext.create("Ext.data.Store", { 
            fields: [{name:'Name'}],
    		data: RM.CashbookMgr.getAccountingCategories(),            
		});        
        store.clearFilter();
        /*if (this.projectIdFilter){
            store.filter('projectid', this.projectIdFilter);
        }*/
        if (this.nameFilter){
            store.filter('Name', this.nameFilter);
        }
        //RM.AppMgr.loadStore(store);    
        this.getAccountsList().setItemTpl('{Name}');
		this.getAccountsList().setStore(store);        
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }
});