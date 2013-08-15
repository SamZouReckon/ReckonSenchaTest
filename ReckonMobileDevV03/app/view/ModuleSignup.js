Ext.define('RM.view.ModuleSignup', {
	extend: 'Ext.Panel',
	xtype: 'modulesignup',
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
						iconMask: 'true',
						itemId: 'back'
					},{
						xtype: 'component',
						html: 'Module Signup',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
						text: 'SIGN UP',
						itemId: 'signup',
                        width: '4.4em',
						ui: 'rm_maintopbarbuttonright'
					}
				]
			},{
				xtype: 'component',
				padding: 5,
				html: 'Module signup to go here'

			}
		]
	}
});