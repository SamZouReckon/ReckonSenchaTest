Ext.define('RM.view.Modules', {
	extend: 'Ext.Container',
	xtype: 'modules',
	config: {		
        layout:{
            type: 'vbox'            
        },
        style: 'background:white',
		items: [
			{
				xtype: 'toolbar',                
				docked: 'top',
                ui: 'rm-main-topbar',
				items: [
					{
                        xtype: 'component',
                        cls: 'rm-module-topbar-icon'
                    },{
                        xtype: 'spacer'
                    }, {
                        iconMask: true,
                        iconCls: 'rm-settings',                        
                        itemId: 'options',
                        ui: 'rm_maintopbarbuttonright'
                    }
				]
			},{
                xtype: 'component',
                padding: '28 10 28 10',
                html: 'Your modules',
                cls: 'rm-intromsg'
            },{
                xtype: 'dataview',
                flex: 1,
                baseCls: 'rm-moduletiles',
        		store: {
        			fields: ['ModuleCode', {name:'Activated', type:'bool'}, 'ShortName', 'FullName', 'Description', 'Image']
        		},    
                itemTpl: new Ext.XTemplate(
                    '<div style="height:220px;width:120px;"><img src="resources/images/{Image}-'+
                    '<tpl if="Activated == true">'+
                        'on'+                                            
                    '</tpl>'+ 
                   '<tpl if="Activated == false">'+
                        'off'+                                            
                    '</tpl>'+
                    '.png">'+
                    '<div style= "color: #969696;">{ShortName}</div></div>'
                ),	         
                
            }     
        
        
		],
       
	} 
    
});
