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
    
    init: function() {
       this.callParent();        
       RM.AppMgr.application.on( {'rm-permissionsupdated' : this.showDashboardData, scope : this} );
    },
    
    showView: function(dashboardData){
        this.dashboardData = dashboardData;
        this.onShow();
    },    
    
    onShow: function(){       
        this.showDashboardData();
    },
    
    showDashboardData: function(){                    
        if(this.getDashboardCont()){
        	this.getNetPosition().setViewData(this.dashboardData);
        	this.getAlerts().setViewData(this.dashboardData);
        	this.getTopExpenses().setViewData(this.dashboardData.TopExpenses);            
        	this.getBudgetOverview().setViewData(this.dashboardData.BudgetOverview);
        }          
    }   

});