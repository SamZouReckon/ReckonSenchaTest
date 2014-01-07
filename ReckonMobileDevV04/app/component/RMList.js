Ext.define('RM.component.RMList', {
    extend: 'Ext.List',
    xtype: 'rmlist',
    requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],    
    
    config: {
        emptyText: '<div class = "rm-list-emptytext">No books found.</div></br>' +
                   '<div>' +
                   '<img src= "resources/images/rm-emptylist-arrow.svg" class= "rm-list-emptytext-img" align = "center"></img>' +
                   '<span class= "rm-list-emptytext-desc">Pull down to refresh</span>' +
                   '</div>',	
        plugins: [
            {
                xclass: 'RM.component.RMPullRefresh',                        
            },{
                type: 'listpaging',
                autoPaging: true,
                noMoreRecordsText: ''
            }
        ]       
    }
});