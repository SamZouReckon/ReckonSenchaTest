Ext.define('RM.view.PayPreferences',{
    extend: 'Ext.Panel',
    xtype: 'paypreferences',
    config:{        
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',            
                items: [
                             {
                                xtype: 'component',
                                itemId: 'title',
                                html: 'Preferences',
                                cls: 'rm-topbartitle'
                            }
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'rm-whitebg',
                items:[                
                    {            
            			xtype: 'rmcheckbox',			                  
            			border: '0',
                        text: '<span class="rm-fontweightbold">I have a Reckon device</span><br><span class="rm-colorblue rm-fontsize80">What is a Reckon device?</span>',
            			labelCls: 'rm-checkbox-smalltext rm-paypreferences-leftalign',								
            			cls: 'rm-checkbox-rightalign',	
            			style: 'border-color: #DBDBDB; border-style: solid;'							
                    },{
                        xtype: 'rmamountfield',
                        cls: ['rm-flatfield', 'rm-flatfield-last'],
                        label: 'Surcharge',
                        itemId: 'surcharge',            
                        clearIcon: false,            
                        placeHolder: 'enter'
                    }
                ]
            }
        
        ]
    }
});