Ext.define('RM.view.AcceptPayment', {
    extend: 'Ext.Panel',
    xtype: 'acceptpayment',
    config: {
        
        style: 'background:#FFFFFF',
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',            
            items: [{
                itemId: 'back',
                ui: 'rm_topbarbuttonleft',
                icon: 'resources/images/icons/rm-back.png',
                width: '2.6em'                
            }, {
                xtype: 'component',
                html: 'Pay invoice',
                cls: 'rm-topbartitle'
            }, {
                xtype: 'spacer'
            }, {
                text: 'PAY',
                itemId: 'pay',                
                ui: 'rm_topbarbuttonright'
            }
            ]
        },{
			xtype: 'formpanel',
			padding: 0,
			items: [
                {
					xtype: 'extnumberfield',
					name: 'AmountPaid',
					label: 'Amount',
					cls: 'rm-flatfield',				                
					clearIcon: false,
					placeHolder: 'Enter'
				},{
					xtype: 'selectfield',
					label: 'Bank Account',
                    labelWidth: 150,
					usePicker: true,
					name: 'BankAccountID',
					store: 'BankAccounts',
					displayField: 'Description',
					valueField: 'BankAccountID',
					placeHolder: 'Select',
					cls: 'rm-flatfield',
					ui: 'plain'
				},{
					xtype: 'selectfield',
					label: 'Payment Method',
                    labelWidth: 150,
					usePicker: true,
					name: 'PaymentMethodID',
					store: 'PaymentMethods',
					displayField: 'Description',
					valueField: 'PaymentMethodID',
					placeHolder: 'Select',
					cls: 'rm-flatfield',
					ui: 'plain',
                    border: '1 0 1 0',
                    style: 'border-color: #DBDBDB; border-style: solid;'	                    
				}
			]
		}
       ]
    }
});