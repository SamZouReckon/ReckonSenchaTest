Ext.define('RM.view.PayAmountInput', {
        extend: 'Ext.Panel',
        xtype: 'payamountinput',
        requires: ['RM.component.CalcKeypad'],
        config: {
        cls: 'rm-whitebg',
        scrollable: 'vertical',        
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
                            }
                         ]             
            },
            {
                                        xtype: 'container',
                                        docked: 'top',
                                        scrollable: 'horizontal',
                                        height: '3em',
                                        cls: 'rm-whitebg',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'button',                                                
                                                cls: ['rm-white-flatbtn', 'rm-payamountinput-back-arrow'],
                                                itemId: 'historyshowbtn',
                                                docked: 'left'
                                            },
                                            {
                                                xtype: 'component',
                                                html: '',                                                
                                                cls: 'rm-pay-currencyprefix'
                                            },{
                                                xtype: 'component',
                                                html: '0.00',
                                                itemId: 'amount',                                               
                                                height: '1.1em',
                                                cls: 'rm-pay-amount'
                                            },{
                                                xtype: 'button',
                                                itemId: 'clearinputbtn',
                                                margin: 9,
                                                ui: 'plain', 
                                                iconCls: 'rm-btn-iconsize',
                                                icon: 'resources/images/icons/rm-fieldclear.svg',
                                                docked: 'right'                                        
                                            },{
                                                xtype: 'button',                                                
                                                cls: ['rm-white-flatbtn', 'rm-payamountinput-arrow'],
                                                itemId: 'historyhidebtn',
                                                hidden: true,
                                                docked: 'right'
                                            }                
                                        ]
            },
            {
                xtype: 'container',
                itemId: 'inputandhistorycontainer',
                layout: 'card',
                activeItem: 0,               
                items: [
                    {
                        xtype: 'container',
                        cls: 'rm-whitebg',
                        scrollable: 'vertical',
                        items: [        
                                    
                                {
                                    xtype: 'container',
                                    cls: ['rm-whitebg', 'rm-border-top'],
                                    height: '2.5em',
                                    layout: 'hbox',
                                    items: [
                                        /*{
                                            xtype: 'component',
                                            itemId: 'totalwithgstfield',
                                            html: 'Total with GST $0.00',
                                            cls: 'rm-pay-gsttext',
                                            flex: 1
                                        }*/{
                        				    xtype: 'exttextfield', 
                                            itemId: 'discount',
                                            readOnly: true,                        					
                        					cls: 'rm-flatfield',
                                            border: 0,
                                            clearIcon: false,                            
                                            flex: 1
                        				},{
                                            xtype: 'button',
                                            itemId: 'gstbtn',
                                            width: 72,
                                            cls: ['rm-white-flatbtn', 'rm-border-left', 'rm-pay-gstbtn']
                                        }                
                                    ]
                            },{                                                            
                                    xtype: 'container',                                    
                                    scrollable: 'vertical',
                                    cls: ['rm-whitebg', 'rm-border-top'],
                                    height: '2.5em',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'exttextfield',
                                            itemId: 'descriptionfield',
                                            cls: 'rm-ml5',
                                            inputCls: 'rm-pay-description',
                                            clearIcon: false,
                                            readOnly: true,
                                            placeHolder: 'Add optional description',
                                            flex: 1
                                        },{
                                            xtype: 'button',
                                            itemId: 'camerabtn',
                                            width: 72,
                                            cls: ['rm-white-flatbtn', 'rm-border-left', 'rm-pay-camerabtn']
                                        }                        
                                    ]
                        },{                    
                                    xtype: 'button',
                                    itemId: 'charge',
                                    text: '<span class="rm-btn-arrow">CHARGE</span>',
                                    cls: 'rm-photopreviewbtn',
                              
                        },{
                            xtype: 'calckeypad',
                            docked: 'bottom'  
                        }
                ]
            }
            ,{
                   xtype: 'container',
                   cls: 'rm-whitebg',
                   scrollable: 'vertical',
                   html: 'History',
                   styleHtmlContent: true,
                   styleHtmlCls: ['rm-p10', 'rm-fontsize70', 'rm-pay-graytext', 'rm-border1px'],
                   itemId: 'historycontainer'
            }               
        ]
            }           
         ] 
    }
});
