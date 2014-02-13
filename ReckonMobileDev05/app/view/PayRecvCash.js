Ext.define('RM.view.PayRecvCash',{
     extend: 'RM.component.SecurePanel',
     xtype: 'payrecvcash',
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
			xtype: 'container',
            height: '2.6em',
            cls: 'rm-whitebg',
            layout: 'hbox',
            items:[{
                xtype: 'img',
                src: 'resources/images/icons/rm-cash.svg',
                height: 25,
                width: 40,
                margin: 12,
                docked: 'left'
            },{
                xtype: 'component',
                cls: ['rm-whitebg', 'rm-pay-graytext', 'rm-fontsize80'],
                html: 'Cash received',
                margin: 15,
                docked: 'right',
                flex: 1
            }]
			
		},{
            xtype: 'exttextfield',
            cls: ['rm-flatfield', 'rm-flatfield-last'],
            label: 'Change'
        }
         ]
     }
    
});