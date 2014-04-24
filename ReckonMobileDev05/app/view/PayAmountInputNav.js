Ext.define('RM.view.PayAmountInputNav', {
        extend: 'Ext.Panel',
        xtype: 'payamountinputnav',
        requires: ['RM.component.PayAmountInputCalc'],
        config: {
        cls: 'rm-whitebg',
        layout: 'vbox',            
        items:[
             {
                    xtype: 'toolbar',
                    docked: 'top',				
                    items: [
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
