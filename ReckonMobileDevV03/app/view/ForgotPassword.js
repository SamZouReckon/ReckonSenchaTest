Ext.define('RM.view.ForgotPassword', {
    extend: 'Ext.Panel',
    xtype: 'forgotpassword',
    config: {
        
		layout: 'card',
        style: 'background:#FFF;',
		activeItem: 0,        
		items: [{
				xtype:'panel',
                style: 'background: #FFFFFF',
				layout: {
					type: 'vbox',					
					pack: 'start',
					align: 'stretch'
				},
				items:[{
						xtype: 'toolbar',
						docked: 'top',
                        ui: 'rm-main-topbar',
						items: [{
								//ui: 'back',
								ui: 'rm_maintopbarbuttonleft',
								iconCls: 'rm-back',
                                width: '2.6em',
								iconMask: 'true',
								itemId: 'back'				
							},{
								xtype: 'component',
								html: 'Forgotten password',
								cls: 'rm-topbartitle'
							}
						]						
					},{
						xtype: 'component',
						html: 'Please enter your email to reset your password',
						cls: 'rm-resetpasswordmsg',
                        padding: '18 15 15 15'
					},{
						xtype: 'extemailfield',                        
						label: 'Email',
						itemId: 'email',
                        labelWidth: '3.5em',                        
						cls: 'rm-emailpasswordfield',                        
                        clearIcon: false, 
                        placeHolder: 'enter'             
					},{
						xtype: 'button',
						text: 'SEND',
                        itemId: 'send',
                        cls:'rm-loginbtn'						
					}
				]
			},{
				xtype:'container',
                style: 'background:#FFF;',
                items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            height: 106,
                            cls: 'rm-emailpositivepanel',
                            items: [
                                {
                                    cls: 'rm-emailcheckmark',
                                    flex:1
                                },
                                {
                                    itemId: 'successMsg',							        						        
                                    flex:5
                                }
                            ]
							
					},{
						xtype: 'button',
						text: 'CONTINUE',
						itemId: 'continue',
						cls: 'rm-emailscreenbtn'
					}
				]
				
			},{
				xtype:'container',
                style: 'background:#FFF;',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        height: 130,
                        cls: 'rm-emailnegativepanel',
                        items: [
                                {
                                    cls: 'rm-emailcrossmark',
                                    flex: 1
                                },
                                {
                                    itemId: 'failMsg',                                                            
                                    flex:5
                                }
                            ]

                    },{
						xtype: 'button',
						text: 'OK',
						itemId: 'ok',
						cls: 'rm-emailscreenbtn'
					}
				]
				
			}
		]		

    }
});