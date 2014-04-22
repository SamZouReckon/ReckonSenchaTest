Ext.define('RM.view.PayAmountInputBack', {
        extend: 'Ext.Panel',
        xtype: 'payamountinputback',
        requires: ['RM.component.PayAmountInputCalc'],
        config: {
        cls: 'rm-whitebg',
        layout: 'vbox',            
        items:[
             {
                    xtype: 'toolbar',
                    docked: 'top',				
                    items: [{					
        						itemId: 'back',
        						ui: 'rm_topbarbuttonleft',
        						icon: 'resources/images/icons/rm-back.svg',
                                iconCls: 'rm-backbtniconcls',                        		
                                width: '2.6em'						
							},
                             {
                                xtype: 'component',
                                html: '',
                                cls: 'rm-topbartitle',
                                itemId: 'toolbarTitle'
                            },{
        						xtype: 'spacer'
        					},{
                				text: 'Details',
                				itemId: 'details', 
                                width: '5em',
                				ui: 'rm_topbarbuttonright'
                			}
                         ]             
            },{
                xtype: 'payamountinputcalc',
                itemId: 'payamountinputcalcpanel',
                flex: 1
            }            
        ]
            
    }
});
