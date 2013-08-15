Ext.define('RM.view.CustomDiscount', {
    extend: 'Ext.Panel',
    xtype: 'customdiscount',
	requires: ['RM.component.DataEntryKeypad'],
    config: {
        
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{					
					ui: 'rm_topbarbuttonleft',
					iconCls: 'rm-back',
					iconMask: 'true',
					itemId: 'back',
					width: '2.6em'
				},{
					xtype: 'component',
					html: 'Custom or absolute',
					cls: 'rm-topbartitle'
				},{
					xtype:'spacer'
				},{
					text: 'SAVE',
					itemId: 'save',                    
					ui: 'rm_topbarbuttonright'
				}
            ]
        },{
            xtype: 'formpanel',
			padding: 0,
			defaults: {labelWidth: 160},
			items: [{
					xtype: 'exttextfield',
					itemId: 'percentDiscount',
					label: '% discount',
                    cursorSimulate: true,
                    readOnly: true,
                    cls: 'rm-flatfield',
					placeHolder: 'enter'
				},{
					xtype: 'exttextfield',
					itemId: 'absoluteDiscount',
					label: 'Absolute amount',
                    cursorSimulate: true,
                    readOnly: true,
                    cls: 'rm-flatfield',
					placeHolder: 'enter',
                    border: '1 0 1 0',
                    style: 'border-color: #DBDBDB; border-style: solid;'
				}
			]
        },{
			xtype:'dataentrykeypad',
			maskPin: true,
			docked: 'bottom'
		}
        ]
    }
});