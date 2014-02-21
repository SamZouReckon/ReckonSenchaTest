Ext.define('RM.view.PayPreferences',{
    extend: 'Ext.Panel',
    xtype: 'paypreferences',
    config:{
        cls: 'rm-whitebg',
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
                    html: 'Preferences',
                    cls: 'rm-topbartitle'
                }
            ]
        },{            
			xtype: 'rmcheckbox',			                  
			border: '1 0 1 0',
            text: '<span class="rm-fontweightbold">I have a Reckon device</span><br><span class="rm-colorblue rm-fontsize80">What is a Reckon device?</span>',
			labelCls: 'rm-checkbox-smalltext rm-paypreferences-leftalign',								
			cls: 'rm-checkbox-rightalign',	
			style: 'border-color: #DBDBDB; border-style: solid;'							
        }
        ]
    }
});