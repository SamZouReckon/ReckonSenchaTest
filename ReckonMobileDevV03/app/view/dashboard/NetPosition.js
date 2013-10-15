Ext.define('RM.view.dashboard.NetPosition', {
    extend: 'Ext.Panel',
    xtype: 'dbnetposition',
    config: {
        
		items: [{
				html: '<h2 class="rm-hearderbg">NET POSITION YEAR TO DATE</h2>'
			},{
				itemId: 'cont'
		}]
    },
	    
	setViewData: function(data){
        
        /*if (!RM.PermissionsMgr.canView('PAndLReport')) {
            this.getComponent('cont').setHtml('<div class="rm-dashboard-nodata">' + RM.Consts.NoAccessMsg + '</div>');            
            return;
        }*/
        
		this.getComponent('cont').setHtml( 
        
            '<div class="rm-panelboard">'+
            '<table cellspacing="0" cellpadding="0" width="100%">'+
            '<tr>'+
            '<td width="49%">'+
            '<div class="rm-greendot rm-dashboardnetposition">Income: <span class="rm-netpositionamount">' + RM.AppMgr.formatCurrency(data.NetPositionIncome, 0, true) + '</span></div>'+
            '<div class="rm-reddoticon rm-dashboardnetposition">Expense: <span class="rm-netpositionamount">' + RM.AppMgr.formatCurrency(data.NetPositionExpenses, 0, true) + '</span></div>'+
            '</td>'+
            '<td width="2%"><div class="rm-equalicon">=</div></td>'+
            '<td width="49%"><div class="rm-totalamount">' + RM.AppMgr.formatCurrency(data.NetPositionIncome - data.NetPositionExpenses, 0) + '</div></td>'+
            '<tr>'+
            '</table>'+
            '</div>'        
        );
	}
});