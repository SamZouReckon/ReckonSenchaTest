Ext.define('RM.view.PayTransRefund', {
    extend: 'Ext.Panel',
    xtype: 'paytransrefund',
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
                }
            ]
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Amount to refund',
            labelWidth: '9em'            
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Reason'
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Notes'
        },{
            xtype: 'button',
            itemId: 'refund',
            text: '<span class="rm-btn-arrow">REFUND</span>',
            cls: 'rm-photopreviewbtn'
        }
        ]
    }
});
    