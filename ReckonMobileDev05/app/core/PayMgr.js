Ext.define('RM.core.PayMgr', {
    alternateClassName: 'RM.PayMgr',
    singleton: true,

    init: function (application) {
        
    },
    
    showScreen: function (screenName, screenData, callBack, callBackScope) {        
        RM.AppMgr.showScreen.apply(this, arguments);
    }
    
    
});