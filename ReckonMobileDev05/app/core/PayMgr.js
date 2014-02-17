Ext.define('RM.core.PayMgr', {
    alternateClassName: 'RM.PayMgr',
    singleton: true,
    requires: ['RM.core.ViewMgr','RM.core.PermissionsMgr'],  

    init: function (application) {
        
    },
    
    showScreen: function (screenName, screenData, callBack, callBackScope) {   
        RM.AppMgr.showScreen.apply(this, arguments); 
    }
    
    
});