Ext.define('RM.view.PaySendReceipt',{
    extend: 'RM.component.SecurePanel',
     xtype: 'paysendreceipt',
     config: {
        cls: 'rm-whitebg',
        layout: 'card',
        activeItem: 0,
        items:[{
                    xtype: 'toolbar',
                    docked: 'top',  
            		itemId: 'topbar',
                    items: [{
                            itemId: 'back',
                            ui: 'rm_topbarbuttonleft',
                            icon: 'resources/images/icons/rm-back.svg',
                            iconCls: 'rm-backbtniconcls',
                            width: '2.6em',
                            iconMask: 'true'
                        }, {
                            xtype: 'component',
                            itemId: 'toolbartitle',
                            html: '',
                            cls: 'rm-topbartitle'
                        },{
        					xtype:'spacer'
        				},{
            				text: 'Details',
            				itemId: 'details', 
                            width: '6em',
            				ui: 'rm_topbarbuttonright'
            			}
                    ]
        		},{
    				xtype:'container',                    
    				cls: 'rm-emailinvoicebackground',
    				items: [
    					{
    						xtype: 'container',
                            itemId: 'msgpanel',
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
                        label: 'SMS receipt',                        
                        labelWidth: '7.5em',
                        placeHolder: 'enter'
                    },{
                        xtype: 'exttextfield',
                        name: 'Email',
                        clearIcon: false,
                        hidden: true,
                        cls: 'rm-flatfield',
                        label: 'Email receipt',
                        labelWidth: '7.5em',
                        placeHolder: 'enter'
                    },{
                        xtype: 'component',
                        itemId: 'emailcomponent',
                        html: 'To email receipts, use Preferences to set and verify your email address',
                        cls: 'rm-p10 rm-fontsize80 rm-colorgrey rm-whitebg rm-border-top'                        
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
                      	xtype: 'component',
                          cls: 'rm-whitebg rm-p1015 rm-fontsize80 rm-colorgrey',                          
                          html: 'Check your Messages app on your device to see if it went through.'
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