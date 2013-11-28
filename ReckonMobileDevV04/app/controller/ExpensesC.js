Ext.define('RM.controller.ExpensesC', {
    extend: 'Ext.app.Controller',	
    config: {
        refs: {
            expenses: 'expenses',
            expensesList: 'expenses list'
        },
        control: {
			'expenses': {
				show: 'onShow'
			},
            'expenses sortsearchbar': {

                search: function (val) {
                    var store = this.getExpensesList().getStore();
                    store.clearFilter();
                    store.filter('search', val);
                    this.setLoadTimer();
                },

                searchclear: function () {
                    this.getExpensesList().getStore().clearFilter();
                    this.loadList();
                }
            },		
			'expenses list': {
				select: 'onItemSelect'			
			},
			'expenses #add': {
                tap: 'add'
            },
            'expenses #refresh': {
                tap: function (textField) {
                    this.loadList();
                }
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },
	
	onShow: function(){
		var store = Ext.data.StoreManager.lookup('Expenses');
		store.getProxy().setUrl(RM.AppMgr.getApiUrl('Expenses'));
		//store.load();
        this.loadList();
    },

    onItemUpdated: function (itemType) {
        if (itemType == 'expense' && this.getExpenses()) {
            this.loadList();
        }
    },


	onItemSelect: function(list, rec){
	
        if (rec.data.ExpenseId == '00000000-0000-0000-0000-000000000000') {
            this.add();
            setTimeout(function () { list.deselect(rec); }, 50);
        }
        else {
    		// Delay the selection clear so get a flash of the selection
    		setTimeout(function(){list.deselect(rec);},500);
    		RM.ExpensesMgr.showExpenseDetail(rec.data,
    			function(closeType, data){
    				if(closeType == 'save')
    					this.loadList();				
    			}, 
    			this
    		);
        }            
	},	
	
	add: function(){
		RM.ExpensesMgr.showExpenseDetail(null,
			function(closeType, data){
				if(closeType == 'save')
					this.loadList();
			}, 
			this
		);
	
	},	

    loadList: function () {
        RM.AppMgr.loadStore(this.getExpensesList().getStore());
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }


});