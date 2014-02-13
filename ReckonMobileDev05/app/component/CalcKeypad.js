Ext.define('RM.component.CalcKeypad', {
    extend: 'Ext.Panel',
    
    requires: ['Ext.Button'],
    
    xtype: 'calckeypad',
    
    config: {
		control: {
			'button': {
				tap: 'onKeyTap'
			}
		},
		layout: 'hbox'
    },
        
    initialize: function() {
		this.callParent(arguments);
		var keyHeight = 50;
		
		this.add([{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: keyHeight, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '1'				
					},{
						text: '4'					
					},{
						text: '7'					
					},{
						text: '00'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: keyHeight, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '2'				
					},{
						text: '5'					
					},{
						text: '8'					
					},{
						text: '0'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: keyHeight, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '3'				
					},{
						text: '6'					
					},{
						text: '9'					
					},{
						text: '.'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				layout: 'vbox',
				defaults: {xtype:'button', height: keyHeight, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: 'BACK',
						style: 'font-size: 70%;'
					},{
						text: '+',
						
					},{
						text: '=',
						height: keyHeight*2
					}
				]
			}		
		]);
		
		
    },
	
	onKeyTap: function(btn){        
	    this.fireEvent('keytap', btn.getText().toLowerCase());	
	}
	

});