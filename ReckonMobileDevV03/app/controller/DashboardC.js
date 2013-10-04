Ext.define('RM.controller.DashboardC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
			netPosition: 'dashboard dbnetposition',
			alerts: 'dashboard dbalerts',
			topExpenses: 'dashboard dbtopexpenses',
			budgetOverview: 'dashboard dbbudgetoverview',
            dashboardCont: 'dashboard #cont',
            noaccessCont: 'dashboard #noaccesscont'
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
        var canViewNetPosition = RM.PermissionsMgr.canView('PAndLReport');
        var canViewAlertsInvoices = RM.PermissionsMgr.canView('Invoices');
        var canViewAlertsBills =  RM.PermissionsMgr.canView('Bills');
        var canViewTopExpenses = RM.PermissionsMgr.canView('AccountEnquiryReport');
        var canViewBudgets = RM.PermissionsMgr.canView('Budgets');
        
        //For no access to all components
        if(this.getNoaccessCont()) this.getNoaccessCont().setHidden(canViewNetPosition || canViewAlertsInvoices || canViewAlertsBills || canViewTopExpenses || canViewBudgets);
        
        if(this.getDashboardCont()){
            if(canViewNetPosition){
                this.getNetPosition().setViewData(this.dashboardData);
            } 
            if(canViewAlertsInvoices || canViewAlertsBills){
                this.getAlerts().setViewData(this.dashboardData);
            }
            if(canViewTopExpenses){
                this.getTopExpenses().setViewData(this.dashboardData.TopExpenses);  
            }        	
        	if(canViewBudgets){
               this.getBudgetOverview().setViewData(this.dashboardData.BudgetOverview); 
            } 
            this.getNetPosition().setHidden(!canViewNetPosition);
            this.getAlerts().setHidden(!(canViewAlertsInvoices || canViewAlertsBills));
            this.getTopExpenses().setHidden(!canViewTopExpenses);  
            this.getBudgetOverview().setHidden(!canViewBudgets);        	
        }         
    }   

});