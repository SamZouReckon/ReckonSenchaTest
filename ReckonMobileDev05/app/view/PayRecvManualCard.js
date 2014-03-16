Ext.define('RM.view.PayRecvManualCard',{
    extend: 'Ext.Panel',
    xtype: 'payrecvmanualcard',
    config:{
        cls: 'rm-whitebg',
        layout: 'fit',
        items: [
                     {
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
                				text: 'Details',
                				itemId: 'details', 
                                width: '5em',
                				ui: 'rm_topbarbuttonright'
                			}
                        ]
                    },{
                        xtype: 'formpanel',
                        itemId: 'payrecvmanualcardform',
                        items:[
                                {
                                    xtype: 'component',
                                    html: 'A credit card transaction will be created but payment won\'t be processed.',            
                                    cls: ['rm-fontsize80', 'rm-pay-grayheadertext']
                                },
                                {
                                    xtype: 'extselectfield',
                                    label: 'Credit card type',
                                    name: 'CardType',
                                    placeHolder: 'choose',
                                    labelWidth: '9em',
                                    cls: 'rm-flatfield',
                                    options: [
                                                {text: 'Visa',  value: 'Visa'},
                                                {text: 'Master Card', value: 'MasterCard'},
                                                {text: 'American Express',  value: 'AmEx'}
                                            ],
                                    
                                },
                                {
                                    xtype: 'extdatepickerfield',
                                    name: 'Date',
                                    dateFormat : 'jS M Y',
                                    label: 'Date',
                                    cls: 'rm-flatfield'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'recordtransaction',
                                    text: '<span class="rm-btn-arrow">RECORD TRANSACTION</span>',
                                    cls: 'rm-photopreviewbtn',
                                }
                        ]
                    },
        ]
    }    
});