Ext.define('RM.view.PayAmountDetails',{
    extend: 'RM.component.SecurePanel',
    xtype: 'payamountdetails',
    config:{        
        cls: 'rm-whitebg',
        items: [{
                    xtype: 'toolbar',
                    docked: 'top',            
                    items: [{
                            xtype: 'component',
                            itemId: 'title',
                            html: '',
                            cls: 'rm-topbartitle'
                        },{
        					xtype:'spacer'
        				},{
            				text: 'Return',
            				itemId: 'return', 
                            width: '6em',
            				ui: 'rm_topbarbuttonright'
            			}
                    ]
            },{                
                    xtype: 'component',
                    itemId: 'details',
                    padding: 5,
                    margin:0                       
            }
        ]
    }
});