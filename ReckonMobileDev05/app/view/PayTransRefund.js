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
                    html: 'Issue a refund',
                    cls: 'rm-topbartitle'
                }
            ]
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Amount to refund',
            labelWidth: '9em',
            placeHolder: 'enter'
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Reason',
            placeHolder: 'choose'
        },{
            xtype: 'exttextfield',
            itemId: 'notes',
            cls: 'rm-flatfield',
            label: 'Notes',
            clearIcon: false,
            placeHolder: 'enter'
        },{
            xtype: 'button',
            itemId: 'refund',
            text: '<span class="rm-btn-arrow">REFUND</span>',
            cls: 'rm-photopreviewbtn'
        }
        ]
    }
});
    