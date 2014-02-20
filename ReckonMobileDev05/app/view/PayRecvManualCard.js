Ext.define('RM.view.PayRecvManualCard',{
    extend: 'RM.component.SecurePanel',
    xtype: 'payrecvmanualcard',
    config:{
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
            xtype: 'component',
            html: 'A credit card transaction will be created but payment won\'t be processed.',            
            cls: ['rm-fontsize80', 'rm-pay-grayheadertext']
        },{
            xtype: 'exttextfield',
            label: 'Credit card type',
            placeHolder: 'choose',
            labelWidth: '12em',
            cls: 'rm-flatfield'
        },{
            xtype: 'exttextfield',
            label: 'Amount',
            placeHolder: 'enter',
            cls: 'rm-flatfield'
        },{
            xtype: 'extdatepickerfield',
            dateFormat : 'jS M Y',
            label: 'Date',
            cls: 'rm-flatfield'
        },{
            xtype: 'button',
            itemId: 'recordtransaction',
            text: '<span class="rm-btn-arrow">RECORD TRANSACTION</span>',
            cls: 'rm-photopreviewbtn',
        }
        ]
    }    
});