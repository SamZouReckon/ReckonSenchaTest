Ext.define('RM.view.InvoiceTimeSelectDetail', {
    extend: 'Ext.Panel',
    xtype: 'invoicetimeselectdetail',
    requires: ['RM.component.InvoiceTimeSelectDetailPan'],
    config: {
        layout: 'vbox',
        
        style: 'background: #FFFFFF',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
					ui: 'back',
					itemId: 'back',
					ui: 'rm_topbarbuttonleft',
                    width: '2.6em',
					iconCls: 'rm-back',
					iconMask: 'true'
				},{
					xtype: 'component',
                    itemId: 'detailsTitle',
					cls: 'rm-topbartitle'
				},{
					xtype: 'spacer'
				},{
					text: 'ADD',
					itemId: 'add',                    
					ui: 'rm_topbarbuttonright'	
				}
                ]
        }
        ]
    }
});