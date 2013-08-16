Ext.define('RM.view.settings.MyPreferences', {
	extend: 'Ext.Panel',
	xtype: 'mypreferences',
	config: {
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
                ui: 'rm-main-topbar',
				items: [
					{
						ui: 'rm_maintopbarbuttonleft',
						iconCls: 'rm-back',
                        width: '2.6em',
						icon: 'resources/images/icons/rm-back.png',
						itemId: 'back'
					},{
						xtype: 'component',
						html: 'My preferences',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
						text: 'SAVE',
						itemId: 'save',
                        ui: 'rm_maintopbarbuttonright'
					}
				]
			},{
				xtype: 'component',
				padding: 5,
				html: 'My Preferences'

			},{
				xtype: 'toolbar',
				docked: 'bottom',
                ui: 'rm-main-topbar',
				items: [
					{
						xtype: 'spacer'
					}, {
						xtype: 'button',
						text: 'Core Settings',
						itemId: 'coreSettings',
						ui: 'rm_maintopbarbuttonright'
					}
				]
			}
		]
	}
});