Ext.define('RM.view.AppStop', {
    extend: 'Ext.Panel',
    xtype: 'appstop',
    config: {
        layout: 'fit',
        style: 'background: #FFFFFF',
        items: [{
				xtype: 'toolbar',                
				docked: 'top',
                ui: 'rm-main-topbar',
				items: [
					{
                        xtype: 'component',
                        cls: 'rm-module-topbar-icon'
                    }, {
					    xtype:'component',
                        html: 'App Stop',
                        cls: 'rm-topbartitle'                    
					}
				]
			}
        ]
    }
});
