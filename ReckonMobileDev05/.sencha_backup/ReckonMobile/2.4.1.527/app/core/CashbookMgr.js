Ext.define('RM.core.CashbookMgr', {
    alternateClassName: 'RM.CashbookMgr',
    singleton: true,
    requires: ['RM.core.PermissionsMgr', 'RM.core.EventMgr', 'RM.core.ViewMgr', 'RM.core.Selectors'],    
    
    config: {
        cashbookId: null,
        currentCashbook: null
    },
    
    getTaxPreferences: function() {
        return this.getCurrentCashbook().TaxPreference;
    },
    
    getAccountingCategories: function(){
        return this.getCurrentCashbook().AccountingCategories;
    },
    
    getCountrySettings: function(){
        return this.getCurrentCashbook().CountrySettings;        
    },
    
    getSalesPreferences: function() {
        return this.getCurrentCashbook().SalesPreferences;
    },
    
    hasLockOffDate: function() {
        return this.getCurrentCashbook().LockoffDate !== null;
    },
    
    getLockOffDate: function() {
        return new Date(this.getCurrentCashbook().LockoffDate);
    },
    
    loadLastCashbook: function(callback, callbackScope, callbackFail, callbackNetFail) {
        if(this.getCashbookId()){
            this.setCashbook(this.getCashbookId(), callback, callbackScope, callbackFail, callbackNetFail);
        }
    },
    
    unloadCashbook: function(){
        this.setCashbookId(null);
        this.setCurrentCashbook(null);
    },
        
    selectCashBook: function() {

        RM.Selectors.showCashBooks(
			function (data) {                			    
                RM.EventMgr.logEvent(RM.Consts.Events.OP, 2, 'cm.sc.1', 'CashBook=' + data.CashBookId);
                this.setCashbook(data.CashBookId,                    
                    function(){
                        this.setCashbookId(data.CashBookId);
                        RM.ViewMgr.showMainNavContainer(localStorage.getItem('RmDisplayName'), data.BookName);
                        var dashboardC = RM.AppMgr.getAppControllerInstance('RM.controller.DashboardC');
                        dashboardC.showView(this._currentCashbook.Dashboard);
        	            RM.ViewMgr.showDashboard();                        
                    },
                    this,
                    function(recs, eventMsg){
                        RM.AppMgr.showErrorMsgBox(eventMsg);
                        RM.AppMgr.login();
                    }                
                );
			},
			this
		);
        
    },    
    
    setCashbook: function(cashbookId, callback, callbackScope, callbackFail, callbackNetFail){
        var me = this;
	    RM.AppMgr.saveServerRec('CashBookSelect', false, { CashBookId: cashbookId },
	        function (recs) {
                me.setCashbookId(cashbookId);  
                me.setCurrentCashbook(recs[0]);
                
	            Ext.data.StoreManager.lookup('GSTCodes').setData(recs[0].GSTCodes);
                Ext.data.StoreManager.lookup('AccountingCategories').setData(recs[0].AccountingCategories);
                
                Ext.data.StoreManager.lookup('TaxStatuses').setData(recs[0].AmountTaxStatuses);
                Ext.data.StoreManager.lookup('ItemTypes').setData(recs[0].ItemTypes);
                
                RM.PermissionsMgr.setPermissions(me.getCurrentCashbook().Permissions, me.getCurrentCashbook().Access);
                              
                if(callback){
                    callback.call(callbackScope);
                }
	        },
            callbackScope,
            callbackFail,
            'Loading book...',
            callbackNetFail
	    );        
    }
});