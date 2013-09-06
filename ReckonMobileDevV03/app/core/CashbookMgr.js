Ext.define('RM.core.CashbookMgr', {
    alternateClassName: 'RM.CashbookMgr',
    singleton: true,
    requires: ['RM.core.PermissionsMgr', 'RM.core.EventMgr', 'RM.core.ViewMgr', 'RM.core.Selectors'],    
    
    config: {
        cashbookId: null,
        currentCashbook: null
    },
    
    getTaxPreferences: function() {
        return this.currentCashbook.TaxPreference;
    },
    
    getSalesPreferences: function() {
        return this.currentCashbook.SalesPreferences;
    },
    
    loadLastCashbook: function() {
        if(this.cashBookId){
            this.setCashbook(this.cashBookId, this.cashbookName);
            return true;
        }
        else {                    
            return false;
        }
    },
        
    selectCashBook: function() {

        RM.Selectors.showCashBooks(
			function (data) {
                this.cashBookId = data.CashBookId;			    
                RM.EventMgr.logEvent(RM.Consts.Events.OP, 2, 'am.sc.1', 'CashBook=' + data.CashBookId);
                this.setCashbook(data.CashBookId,
                    function(){
                        RM.ViewMgr.showMainNavContainer(localStorage.getItem('RmDisplayName'), data.BookName);
                        var dashboardC = RM.AppMgr.getAppControllerInstance('RM.controller.DashboardC');
                        dashboardC.showView(this.currentCashbook.Dashboard);
        	            RM.ViewMgr.showDashboard();                        
                    },
                    this
                );
			},
			this
		);
        
    },    
    
    setCashbook: function(cashbookId, cb, cbs){
	    RM.AppMgr.saveServerRec('CashBookSelect', false, { CashBookId: cashbookId },
	        function (recs) {
                this.currentCashbook = recs[0];
                
	            Ext.data.StoreManager.lookup('GSTCodes').setData(recs[0].GSTCodes);
                Ext.data.StoreManager.lookup('AccountingCategories').setData(recs[0].AccountingCategories);
                Ext.data.StoreManager.lookup('ItemTypes').setData(recs[0].ItemTypes);
                
                RM.PermissionsMgr.setPermissions(this.currentCashbook.Permissions);
                
                this.cashBookId = cashbookId;                
                if(cb){
                    cb.call(cbs);
                }
	        },
            this,
            null,
            'Loading book...'
	    );        
    }
});