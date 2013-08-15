Ext.define('RM.view.InvoiceActions', {
    extend: 'Ext.Panel',
    xtype: 'invoiceactions',
    config: {
        
        style: 'background: #FFF;',
		defaults: {xtype: 'button'},
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
					ui: 'rm_topbarbuttonleft',
					iconCls: 'rm-back',
					iconMask: 'true',
                    width: '2.6em',
					itemId: 'back'				
				},{
					xtype: 'component',
					html: 'Invoice actions',
					cls: 'rm-topbartitle'
				}
            ]
        },{
            xtype: 'component',
            itemId: 'invoiceStatus',
            cls: 'rm-hearderbg'
            //style: 'background: #ECECEC; color: #6D6D6D;'
        },{
			text: 'Approve invoice',
			itemId: 'approve',
			cls: 'rm-arrowimgbtn rm-invoiceaction-bg',
            icon: 'resources/images/icons/rm-accept.png',
            iconAlign: 'left'	
            			
        },{
			text: 'Pay invoice',
			itemId: 'pay',
			cls: 'rm-arrowimgbtn rm-invoiceaction-bg',
            icon: 'resources/images/icons/rm-receive.png',
            iconAlign: 'left'	
            			
        },{
			text: 'Email customer',
			itemId: 'email',
			cls: 'rm-arrowimgbtn rm-invoiceaction-bg',
            icon: 'resources/images/icons/rm-email.png',
            iconAlign: 'left'
           						
        },{
			text: 'View invoice history',
			itemId: 'history',
			cls: 'rm-arrowimgbtn rm-invoiceaction-bg',
            icon: 'resources/images/icons/rm-history.png',
            iconAlign: 'left'						
        }
        ]
    }
});
