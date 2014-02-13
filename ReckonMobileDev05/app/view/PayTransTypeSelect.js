Ext.define('RM.view.PayTransTypeSelect', {
	extend: 'RM.component.SecurePanel',
    xtype: 'paytranstypeselect', 
    config: {        
        
        cls: 'rm-whitebg',
        items: [{
            xtype: 'toolbar',
            docked: 'top',            
            items: [{
                    itemId: 'back',
                    ui: 'rm_topbarbuttonleft',
                    icon: 'resources/images/icons/rm-back.svg',
                    iconCls: 'rm-backbtniconcls',
                    width: '2.6em',
                    iconMask: 'true'
                }, {
                    xtype: 'component',
                    itemId: 'title',
                    html: '',
                    cls: 'rm-topbartitle'
                },{
					xtype:'spacer'
				},{
    				text: 'DETAILS',
    				itemId: 'details', 
                    width: '5em',
    				ui: 'rm_topbarbuttonright'
    			}
            ]
        },{
			xtype: 'button',
			text: 'Credit card <span class="rm-pay-graytext rm-fontsize70">(using a Pay device)</span>',
			cls: ['rm-arrowimgbtn', 'rm-paymenttype-btn-bg'],
            icon: 'resources/images/icons/rm-credit.svg',
            iconCls: 'rm-btn-iconsize',
            iconAlign: 'left',
            paymentType: RM.Consts.PaymentMethodTypes.CREDIT_CARD
		},{
			xtype: 'button',
			text: 'Cash',
			cls: ['rm-arrowimgbtn', 'rm-paymenttype-btn-bg'],			
			icon: 'resources/images/icons/rm-cash.svg',
            iconCls: 'rm-btn-iconsize',
			iconAlign: 'left',
			paymentType: RM.Consts.PaymentMethodTypes.CASH
		},{
			xtype: 'button',
			text: 'Cheque',
			cls: ['rm-arrowimgbtn', 'rm-paymenttype-btn-bg'],		
			icon: 'resources/images/icons/rm-cheque.svg',
            iconCls: 'rm-btn-iconsize',
			iconAlign: 'left',
			paymentType: RM.Consts.PaymentMethodTypes.CHEQUE
		},{
			xtype: 'button',
			text: 'Other credit transaction',
			cls: ['rm-arrowimgbtn', 'rm-paymenttype-btn-bg'],	
			icon: 'resources/images/icons/rm-cheque.svg',
            iconCls: 'rm-btn-iconsize',
			iconAlign: 'left',
			//paymentType: RM.Consts.PaymentMethodTypes.OTHER
		}
        ]
    }
});