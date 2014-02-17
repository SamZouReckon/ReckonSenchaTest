Ext.define('RM.view.PayTransTerminal',{
    extend: 'RM.component.SecurePanel',
    xtype: 'paytransterminal',
    config: {
        cls: 'rm-whitebg',  
        layout: 'fit',
		items:[{
                    xtype: 'toolbar',
                    docked: 'top',            
                    items: [{
                            itemId: 'back',
                            ui: 'rm_topbarbuttonleft',
                            icon: 'resources/images/icons/rm-back.svg',
                            iconCls: 'rm-backbtniconcls',
                            width: '2.6em',
                            iconMask: 'true'
                        },{
                            xtype: 'component',
                            itemId: 'title',
                            html: '',
                            cls: 'rm-topbartitle'
                        },{
        					xtype:'spacer'
        				},{
            				text: 'DETAILS',
            				itemId: 'return', 
                            width: '6em',
            				ui: 'rm_topbarbuttonright'
            			}
                    ]
            },{
                xtype: 'container',
                layout: 'card',
                activeItem: 2,
                items: [
                            {
                            xtype: 'container',                            
                            layout: 'vbox',
                            align: 'center',
                            items:[                    
                                {
                                    xtype: 'img',
                                    src: 'resources/images/icons/rm-update-icon.svg',
                                    height: 40,
                                    width: 40,
                                    margin: '25px auto'                        
                                },{
                                    xtype: 'component',
                                    html: 'No device detected', 
                                    cls: 'rm-update-title', 
                                    margin: '-8 0 5 0'
                                },{
                                    xtype: 'component',
                                    html: 'No Reckon Pay device detected. <br>Please insert a device and try again.',
                                    cls: 'rm-update-msg',  
                                    margin: '0 0 25 0'
                                }             
                            ]                  
                        },{
                            xtype: 'container',                            
                            layout: 'vbox',
                            align: 'center',
                            items:[                    
                                {
                                    xtype: 'img',
                                    src: 'resources/images/icons/rm-update-icon.svg',
                                    height: 40,
                                    width: 40,
                                    margin: '25px auto'                        
                                },{
                                    xtype: 'component',
                                    html: 'Insert Chip', 
                                    cls: 'rm-update-title', 
                                    margin: '-8 0 5 0'
                                },{
                                    xtype: 'component',
                                    html: 'OR',
                                    style: 'text-align: center;'  
                                },{
                                    xtype: 'img',
                                    src: 'resources/images/icons/rm-update-icon.svg',
                                    height: 40,
                                    width: 40,
                                    margin: '25px auto'                        
                                },{
                                    xtype: 'component',
                                    html: 'Swipe Card',
                                    cls: 'rm-update-msg',  
                                    margin: '0 0 25 0'
                                }             
                            ]   
                        },{
                            xtype: 'container',                            
                            items: [{
                                xtype: 'component',
                                html: 'Total amount',
                                cls: ['rm-alignc']
                            },{
                                xtype: 'component',
                                html: '$14.60',
                                cls: ['rm-alignc']
                            },{
                                xtype: 'component',
                                html: 'Please enter your PIN<br>to confirm payment',
                                cls: ['rm-alignc']
                            }
                            
                            ]
                        }
                ]
            } 
        
        ]
    }
});