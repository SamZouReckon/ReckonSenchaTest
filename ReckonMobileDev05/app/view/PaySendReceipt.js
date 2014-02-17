Ext.define('RM.view.PaySendReceipt',{
    extend: 'RM.component.SecurePanel',
     xtype: 'paysendreceipt',
     config: {
        cls: 'rm-whitebg',
        layout: 'card',
        activeItem: 0,
        items:[{
				xtype:'container',
				cls: 'rm-emailinvoicebackground',
				items: [
					{
						xtype: 'container',
						layout: 'hbox',
						height: 50,
						cls: ['rm-emailpositivepanel', 'rm-p10'],
						items: [
							{
								cls: ['rm-emailcheckmark','rm-iconsize25'],
								flex:1
							},{
								itemId: 'sentcont',
                                cls: 'rm-pt5',
                                html: '',
								flex:5
							}
						]
							
					},{
                        xtype: 'exttextfield',
                        cls: 'rm-flatfield',
                        label: 'SMS receipt',
                        labelWidth: '6.5em',
                        placeHolder: 'enter'
                    },{
                        xtype: 'exttextfield',
                        cls: 'rm-flatfield',
                        label: 'Email receipt',
                        labelWidth: '6.5em',
                        placeHolder: 'enter'
                    },{
						xtype: 'button',
						text: 'SEND RECEIPT',
						itemId: 'send',
						cls: 'rm-emailscreenbtn'
					},{
						xtype: 'button',
						text: 'DON\'T SEND RECEIPT',
						itemId: 'dontsend',
						cls: 'rm-emailscreenbtn'
					}
				]
			},{
                xtype:'container',
				cls: 'rm-emailinvoicebackground',
				items: [
					{
						xtype: 'container',
						layout: 'hbox',
						height: 50,
						cls: ['rm-emailpositivepanel', 'rm-p10',],
						items: [
							{
								cls: ['rm-emailcheckmark','rm-iconsize25'],
								flex:1
							},{
								itemId: 'sentcont',
                                cls: 'rm-pt5',
                                html: 'Email sent',
								flex:5
							}
						]
							
					},{
						xtype: 'button',
						text: 'DONE',
						itemId: 'done',
						cls: 'rm-emailscreenbtn'
					}
				]
            }
         ] 
         
     }
});