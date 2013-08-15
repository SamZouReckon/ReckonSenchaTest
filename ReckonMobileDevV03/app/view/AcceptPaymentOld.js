Ext.define('RM.view.AcceptPayment', {
    extend: 'Ext.Panel',
    xtype: 'acceptpayment',
    requires: ['RM.component.DataEntryKeypad'],    
    config: {
        
        style: 'background:#FFFFFF',
        layout: 'vbox',
        items: [{
            xtype: 'toolbar',
            docked: 'top',            
            items: [{
                itemId: 'back',
                ui: 'rm_topbarbuttonleft',
                iconCls: 'rm-back',
                width: '2.6em',
                iconMask: 'true'
            }, {
                xtype: 'component',
                itemId: 'title',
                cls: 'rm-topbartitle'
            }, {
                xtype: 'spacer'
            }, {
                text: 'NEXT',
                itemId: 'next',                
                ui: 'rm_topbarbuttonright'
            }
            ]
        },{			
			xtype: 'exttextfield',
			itemId: 'paymentAmount',
			label: 'Payment',
            cls:'rm-flatfield',
            style: 'border-bottom: 1px solid #D1D1D1',
            readOnly: true,
			clearIcon: false						
		},{
            xtype: 'component',			
			html: 'For part-payments',
            cls: 'rm-acceptpaymenttext'
        },{
			xtype: 'component',			
			html: 'Tap to edit.',
            cls: 'rm-acceptpaymenttaptext',
            listeners: {
                tap: {
                    element: 'element',                    
                    fn: function () { 
						this.getParent().fireEvent('edit'); 
					}
                }
            }			
		},{
		    xtype: 'dataentrykeypad',
            docked: 'bottom',
			hidden: true,
            bubbleEvents: 'keytap'
        }
       ]
    }
});