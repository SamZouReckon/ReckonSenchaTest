Ext.define('RM.core.PayMgr', {
    alternateClassName: 'RM.PayMgr',
    singleton: true,
    requires: ['RM.core.ViewMgr','RM.core.PermissionsMgr'],  

    init: function (application) {
        
    },
    
    showScreen: function (screenName, screenData, callBack, callBackScope) {   
        RM.AppMgr.showScreen.apply(this, arguments); 
    },
    
    createTransaction: function(transaction, callBack, callBackScope)
    {
        RM.AppMgr.saveServerRec('PayTransaction', true, transaction,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    getTransaction: function(transactionId, callBack, callBackScope){
        RM.AppMgr.getServerRec('PayTransaction', true, transactionId,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    getTransactions: function(callBack, callBackScope){
        RM.AppMgr.getServerRecs('PayTransaction', true, [],
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    sendReceipt: function(receipt, callBack, callBackScope){
        RM.AppMgr.saveServerRec('PayTransactionReceipt', true, receipt,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    createRefund: function(refundTransaction, callBack, callBackScope){
        RM.AppMgr.saveServerRec('PayTransaction', true, refundTransaction,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    createTransactionHistory: function(transactionHistory, callBack, callBackScope){
        RM.AppMgr.saveServerRec('PayTransactionHistory', true, transactionHistory,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    },
    
    readTransactionHistory: function(transactionHistoryId, callBack, callBackScope){
        RM.AppMgr.getServerRec('PayTransactionHistory', true, transactionHistoryId,
		    function () {                    
		        callBack.call(callBackScope);
		    },
		    this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
	    );
    }
});