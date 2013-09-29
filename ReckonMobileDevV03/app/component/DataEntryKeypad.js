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
            itemId: 'doneContainer',
			defaults: {xtype: 'button', flex: 1, height: 40, cls: 'rm-keypad-topbar'},
			items:[{
                    text: 'CANCEL',
                    itemId: 'cancel',
                    
                    //style: 'font-size: 0.8em; padding-left: 0px; padding-right: 0px;'
                },{                    
                    itemId: 'bar',                    
                    
                    //style: 'font-size: 0.8em; padding-left: 0px; padding-right: 0px;'
                },{
					text: 'DONE',
                    itemId: 'done',
                    
                    //style: 'font-size: 0.8em; padding-left: 0px; padding-right: 0px;'
				}
			]
		},{
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
					text: '7'
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
					text: '.',
                    itemId: 'dotBtn'
				},{
					text: '0',
                    itemId: '0'
				},{
                    cls: 'rm-flatkeypadbutton rm-flatkeypad-crossbtn',
                    itemId: 'backspace'					
				}
			]
		}]		
    },
    
    initialize: function() {
        if(!this.config.keypadType){
            var done = this.getComponent('doneContainer');           
            done.setHidden(true);
        }        
        this.callParent(arguments);
    },

	onKeyTap: function(btn,e){        
		this.fireEvent('keytap', (btn.getText() ? btn.getText().toLowerCase() : btn.getItemId().toLowerCase()));   
        e.stopPropagation();            //To stop tap event propagating to root container
	}	

});