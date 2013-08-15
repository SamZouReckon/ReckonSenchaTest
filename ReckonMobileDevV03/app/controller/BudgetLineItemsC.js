Ext.define('RM.controller.BudgetLineItemsC', {
    extend: 'Ext.app.Controller',
	requires: ['RM.view.budgets.LineItems'],
    config: {
        refs: {
            budgetLineItems: 'budgetlineitems',
			budgetTitle: 'budgetlineitems #title',
            budgetLineItemsList: 'budgetlineitems list'
        },
        control: {			
            'budgetlineitems #back': {
                tap: 'back'
            },
            'budgetlineitems rmcheckbox': {
                check: 'onZeroItemsCheck'
            }
        }

    },

	showView: function(budgetId, budgetName){

		var view = this.getBudgetLineItems();
		if(!view){
			view = {xtype:'budgetlineitems'};
        }
		RM.ViewMgr.showPanel(view);
		
		this.getBudgetTitle().setHtml(budgetName);
        
		
		//filter by BudgetId		
		var store = this.getBudgetLineItemsList().getStore();
		store.getProxy().setUrl(RM.AppMgr.getApiUrl('BudgetLineItems'));
		store.filter('BudgetId', budgetId);
		this.loadList();		
	},
    
    onZeroItemsCheck: function(checked){
        this.getBudgetLineItemsList().getStore().filter('IncludeZeroItems', !checked);
        this.loadList();
    },
    
    loadList: function () {
        RM.AppMgr.loadStore(this.getBudgetLineItemsList().getStore());
    },    
	
	back: function(){
		RM.ViewMgr.back();
	}


});