Ext.define('RM.view.AcceptPayment', {
    extend: 'Ext.Panel',
    xtype: 'acceptpayment',
    requires: ['RM.component.RMAmountField2'],
    config: {
        
        style: 'background:#FFFFFF',
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',            
            items: [{
                itemId: 'back',
                ui: 'rm_topbarbuttonleft',
                icon: 'resources/images/icons/rm-back.svg',
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
			xtype: 'secureformpanel',
			padding: 0,
			items: [
                {
					xtype: 'rmamountfield2',
					name: 'AmountPaid',
					label: 'Amount',
                    rmmandatory: true,
                    labelWidth: 150,
					cls: 'rm-flatfield',				                
					clearIcon: false,
					placeHolder: 'Enter',
                    decimalPlaces: 2,
                    prefix: '$'
				},{
					xtype: 'extselectfield',
					label: 'Bank Account',
                    rmmandatory: true,
                    labelWidth: 150,
					usePicker: true,
					name: 'BankAccountID',
					store: 'BankAccounts',
					displayField: 'Description',
					valueField: 'BankAccountID',
                    autoSelect: false,
					placeHolder: 'Select',
					cls: 'rm-flatfield',
					ui: 'plain'
				},{
					xtype: 'extselectfield',
					label: 'Payment Method',
                    rmmandatory: true,
                    labelWidth: 150,
					usePicker: true,
					name: 'PaymentMethodID',
					store: 'PaymentMethods',
					displayField: 'Description',
					valueField: 'PaymentMethodID',
                    autoSelect: false,
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