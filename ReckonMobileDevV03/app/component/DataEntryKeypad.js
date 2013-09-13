Ext.define('RM.component.DataEntryKeypad', {
    extend: 'Ext.Panel',
    
    requires: ['Ext.Button'],
    
    xtype: 'dataentrykeypad',
    
    config: {
		control: {
			'button': {
				tap: 'onKeyTap'
			}
		},
		items: [{
			xtype: 'container',
			layout: 'hbox',
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'rm-flatkeypadbutton'},
			items:[{
					text: '1'
				},{
					text: '2'
				},{
					text: '3'
				}
			]
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'rm-flatkeypadbutton'},
			items:[{
					text: '4'
				},{
					text: '5'
				},{
					text: '6'
				}
			]
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'rm-flatkeypadbutton'},
			items:[{
					text: '7',					
				},{
					text: '8'
				},{
					text: '9'
				}
			]
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'rm-flatkeypadbutton'},
			items:[{
					text: '.'
				},{
					text: '0'
				},{
					text: 'BACK',
                    style: 'font-size: 0.8em; padding-left: 1.05em; padding-right: 1.05em; '
				}
			]
		}]		
    },

	onKeyTap: function(btn,e){
		this.fireEvent('keytap', btn.getText().toLowerCase());   
        e.stopPropagation();            //To stop tap event propagating to root container
	}
	

});