Ext.define('RM.component.RMPullRefresh', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'rmpullrefresh',    
    config: {               
        lastUpdatedText: 'Last update:',  
        pullRefreshText: '',
        releaseRefreshText: '',        
        loadingText: '<img src="resources/images/rm-loading-img.gif" width="175" height="35">'         
    }
});