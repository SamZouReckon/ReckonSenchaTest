Ext.define('RM.view.dashboard.Dashboard', {
	extend: 'Ext.Panel',
	xtype: 'dashboard',
	requires: ['RM.view.dashboard.NetPosition', 'RM.view.dashboard.Alerts', 'RM.view.dashboard.TopExpenses', 'RM.view.dashboard.BudgetOverview'],
	config: {              
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',				
				items: [
					{
						xtype: 'component',
						html: 'Dashboard',
                        cls: 'rm-topbartitle'                        
					}
				]
			}, {
				xtype: 'container',
				cls:'rm-dashboard',  
				scrollable: 'vertical',
                itemId: 'cont',
				padding: 5,
				items: [
					{
						xtype: 'dbnetposition',                
					}, {
						xtype: 'dbalerts'
					}, {
						xtype: 'dbtopexpenses'
					}, {
						xtype: 'dbbudgetoverview'
					}
				]
			}
		]
	}/*,

	initialize: function () {
		this.callParent();
		this.on('painted', function () {
			this.fireEvent('contready')
		}, this);
	}*/
});