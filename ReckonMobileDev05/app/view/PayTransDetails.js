Ext.define('RM.view.PayTransDetails', {
    extend: 'Ext.Panel',
    xtype: 'paytransdetails',
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
                    width: '6em',
    				ui: 'rm_topbarbuttonright'
    			}
            ]
        },{
            xtype: 'button',
            itemId: 'sendreceipt',
            text: '<span class="rm-btn-arrow">SEND RECEIPT</span>',
            cls: 'rm-photopreviewbtn'
        },{
            xtype: 'button',
            itemId: 'refund',
            text: '<span class="rm-btn-arrow">REFUND</span>',
            cls: 'rm-photopreviewbtn'
        },{
            xtype: 'extdatepickerfield',
            cls: 'rm-flatfield',
            dateFormat : 'jS M Y',
            label: 'Paid'
        },{
            xtype: 'exttextfield',
            cls: 'rm-flatfield',
            label: 'Card'
        },{
            xtype: 'exttextfield',
            cls: ['rm-flatfield', 'rm-flatfield-last'],
            label: 'Receipt no',
            labelWidth: '6em'            
        },{
            xtype: 'container',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                layout: 'vbox',
                flex: 1,
                items: [{
                    xtype: 'component',
                    html: 'LOCATION',
                    cls: ['rm-alignc', 'rm-fontsize70', 'rm-pay-graytext'],
                    margin: '15 auto 0 auto'
                }/*,{
                    xtype: 'map',
                    useCurrentLocation: true,
                    cls: 'rm-border1px',
                    height: 180
                }*/]
                
            },{
                xtype: 'container',
                layout: 'vbox',                
                flex: 1,
                items: [{
                    xtype: 'component',
                    html: 'PHOTO',
                    cls: ['rm-alignc', 'rm-fontsize70', 'rm-pay-graytext'],
                    margin: '15 auto 0 auto'
                },{
                    xtype: 'img',
                    html: 'No photo<br>taken', 
                    cls: 'rm-border1px',
                    styleHtmlContent: true,
                    styleHtmlCls: ['rm-fontsize70', 'rm-pay-graytext'],
                    backgroundCls: 'rm-pay-noimagebg',
                    src: '',
                    height: 180
                }]
            }]
        }
        ]
    }
});