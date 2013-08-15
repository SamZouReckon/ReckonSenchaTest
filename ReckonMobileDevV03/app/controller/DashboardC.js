Ext.define('RM.controller.DashboardC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
			netPosition: 'dashboard dbnetposition',
			alerts: 'dashboard dbalerts',
			topExpenses: 'dashboard dbtopexpenses',
			budgetOverview: 'dashboard dbbudgetoverview',
            dashboardCont: 'dashboard #cont'			
        },
        control: {
			'dashboard': {
                //contready: 'loadItems'
                show: 'onShow'
            }	
        }

    },
    
    showView: function(dashboardData){
        this.dashboardData = dashboardData;
        this.onShow();
    },    
    
    onShow: function(){
        //this.showDashboardData(RM.AppMgr.getDashboardData());
        //alert('onShow');
        this.showDashboardData(this.dashboardData);
    },
    
    showDashboardData: function(rec){
        //this.getDashboardCont().setHidden(false);
        //window.clearInterval(loadingTimer);
    	//RM.ViewMgr.hideLoadingMask();
    	//var rec = Ext.decode(response.responseText).recs[0];
        if(this.getDashboardCont()){
        	this.getNetPosition().setViewData(rec);
        	this.getAlerts().setViewData(rec);
        	this.getTopExpenses().setViewData(rec.TopExpenses);
            //this.getTopExpenses().setViewData([]); //Test No Top Expenses
        	this.getBudgetOverview().setViewData(rec.BudgetOverview);
        }           
    }/*,
	
	loadItems: function(){
        
        //RM.ViewMgr.showLoadingMask();
        
        //var loadingTimer = window.setInterval(
        //    function(){ 
        //        RM.ViewMgr.showLoadingMask();
        //    }
        //    ,3000);
       
        
        Ext.Ajax.request({
            url: RM.AppMgr.getApiUrl('Dashboard'),
            method: 'GET',
            timeout: RM.Consts.Api.TIME_OUT,
			success: function(response){
                this.getDashboardCont().setHidden(false);
                //window.clearInterval(loadingTimer);
				RM.ViewMgr.hideLoadingMask();
				var rec = Ext.decode(response.responseText).recs[0];				
				this.getNetPosition().setViewData(rec);
				this.getAlerts().setViewData(rec);
				this.getTopExpenses().setViewData(rec.TopExpenses);
                //this.getTopExpenses().setViewData([]); //Test No Top Expenses
				this.getBudgetOverview().setViewData(rec.BudgetOverview);                
                //this.getBudgetOverview().setViewData([]); //Test No Budgets                
			},
            failure: function (resp) {
                //window.clearInterval(loadingTimer);
                RM.ViewMgr.hideLoadingMask();
                RM.AppMgr.handleServerCallFailure(resp);
            },
            scope: this
        });
	
	}*/   

});