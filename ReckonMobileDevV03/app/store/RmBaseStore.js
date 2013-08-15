Ext.define('RM.store.RmBaseStore', {
    extend: 'Ext.data.Store',	
    config: {
        autoLoad: false,
        remoteFilter: true,
        remoteSort: true,        
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                rootProperty: 'recs'
            },
            timeout: RM.Consts.Api.STORE_LOAD_TIME_OUT,
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    RM.core.AppMgr.onDataProxyException(proxy, response, operation, eOpts);
                }
            }
        }
    }
});