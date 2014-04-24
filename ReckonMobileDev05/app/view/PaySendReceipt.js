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
								itemId: 'title',
                                cls: 'rm-pt5',
                                html: '',
								flex:5
							}
						]
							
					},{
                        xtype: 'rmphonefield',
                        name: 'SMS',
                        clearIcon: false,
                        cls: 'rm-flatfield',
                        label: 'SMS a receipt',                        
                        labelWidth: '7.5em',
                        placeHolder: 'enter'
                    },{
                        xtype: 'exttextfield',
                        name: 'Email',
                        clearIcon: false,
                        cls: 'rm-flatfield',
                        label: 'Email a receipt',
                        labelWidth: '7.5em',
                        placeHolder: 'enter'
                    },{
						xtype: 'button',						
						itemId: 'sendreceiptbtn',
						text: '<span class="rm-btn-arrow">SEND RECEIPT</span>',
                        cls: 'rm-photopreviewbtn'
					},/*{
						xtype: 'button',						
						itemId: 'sendreceiptbtn2',
						text: '<span class="rm-btn-arrow">SEND RECEIPT</span>',
                        cls: 'rm-photopreviewbtn'
					},*/{
						xtype: 'button',						
						itemId: 'dontsendreceiptbtn',
						text: '<span class="rm-btn-arrow">DON\'T SEND RECEIPT</span>',
                        cls: 'rm-photopreviewbtn'
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
                        itemId: 'done',
						text: '<span class="rm-btn-arrow">DONE</span>',
                        cls: 'rm-photopreviewbtn'					
					},{
                        xtype: 'button',
                        itemId: 'retry',
						text: '<span class="rm-btn-arrow">RETRY</span>',
                        cls: 'rm-photopreviewbtn'	
                    }
				]
            }
         ] 
         
     }
});