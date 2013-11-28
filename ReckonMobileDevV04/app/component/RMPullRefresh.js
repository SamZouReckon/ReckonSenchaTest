Ext.define('RM.component.RMPullRefresh', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'rmpullrefresh',    
    config: {               
        lastUpdatedText: 'Last update:',  
        pullRefreshText: '',
        releaseRefreshText: '',        
        loadingText: '<img src="resources/images/rm-loading-img.gif" width="175" height="35">',  
        lastUpdatedDateFormat: 'd/m/Y h:iA',
    },

    //Override fetchLatest() behaviour so that lists are reloaded instead of default of inserting new records at the start
    //The deafult behaviour had issues with grouping and new records in web app not appearing immediately in mobile
    fetchLatest: function(){
        this.getList().getStore().loadPage(1, {
            callback: function (recs, operation, success) {
               if(success) { 
                    this.setViewState('loaded');
                    this.fireEvent('latestfetched');                   
               } 
            },
            scope: this
        });
    }
    
});