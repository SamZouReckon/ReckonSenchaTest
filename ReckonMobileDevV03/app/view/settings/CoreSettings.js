Ext.define('RM.view.settings.CoreSettings', {
    extend: 'Ext.Panel',
    xtype: 'coresettings',
    config: {
        layout: 'fit',
        style: 'background: #FFFFFF',
        items: [{
            xtype: 'toolbar',
            ui: 'rm-main-topbar',
            docked: 'top',            
            items: [{
				ui: 'rm_maintopbarbuttonleft',
				icon: 'resources/images/icons/rm-back.png',				
				itemId: 'back'				
			},{
                xtype: 'component',
                html: 'Core settings',
                cls: 'rm-topbartitle'
            }, {
                xtype: 'spacer'
            }, {
                text: 'SAVE',
                width: '4em',
                itemId: 'save',
                ui: 'rm_maintopbarbuttonright'
            }
                ]
        }, {
            xtype: 'formpanel',            
            itemId: 'settingsForm',
            defaults: {labelWidth: 110},
            padding: 0,
            items: [/*{
                    xtype: 'textfield',
                    name: 'ApiUrl',
                    label: 'Api Url'
                },*/{
                    xtype: 'selectfield',
                    name: 'ApiLocation',
                    label: 'Api Location',
                    usePicker: true,
                    options: [
                        //{text: 'Roadshow Server', value: 'roadshowserver'},
                        {text: 'Demo Server', value: 'demoserver'},                        
                        //{text: 'Demo Laptop',  value: 'demolaptop'},
                        //{text: 'Demo Laptop IP',  value: 'demolaptopip'},
                        {text: 'Dev Server', value: 'devserver'},
                        {text: 'QA Server', value: 'qaserver'},
                        {text: 'Dev Local',  value: 'devlocal'},
                        {text: 'Dev Local IIS',  value: 'devlocaliis'},
                        {text: 'Dev MB',  value: 'devmb'},
                        //{text: 'Demo Laptop AS',  value: 'demolaptopas'},
                        {text: 'None',  value: 'none'}
                    ]
                },{
                    xtype: 'selectfield',
                    name: 'ApiType',
                    label: 'Api Type',
                    usePicker: true,
                    options: [
                        {text: 'Normal',  value: 'normal'},
                        {text: 'Test', value: 'test'},
                        {text: 'Json',  value: 'json'}
                    ]
                }            
            ]
        },{
            xtype: 'toolbar',
            ui: 'rm-main-topbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                width: '7em',
                text: 'Upload logs',
                itemId: 'uploadLogs',
                ui: 'rm_maintopbarbuttonright'
            }
            //<debug>
            , {
                xtype: 'button',
                width: '7em',
                text: 'I Am The Law',
                itemId: 'iAmTheLaw',
                ui: 'rm_maintopbarbuttonright'
            }
            //</debug>
            ]
        }
        ]
    }
});
