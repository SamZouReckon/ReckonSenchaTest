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
		//layout: 'hbox'
        
            
        items: [{
            xtype: 'container',
            layout: 'hbox',
            items:[{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: 50, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '1'				
					},{
						text: '4'					
					},{
						text: '7'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: 50, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '2'				
					},{
						text: '5'					
					},{
						text: '8'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: 50, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '3'				
					},{
						text: '6'					
					},{
						text: '9'					
					}
				]
			},{
				xtype:'container',
				flex: 1,
				defaults: {xtype:'button', height: 50, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: 'BACK',
                        style: 'font-size: 70%'
					},{
						text: '+'					
					},{
						text: 'x'					
					}
				]
			}]
        },{
				xtype:'container',
				height: 50,
				layout: 'hbox',
				defaults: {xtype:'button', height: 50, cls: 'rm-flatkeypadbutton'},
				items:[{
						text: '.',						
                        flex: 0.85
					},{
						text: '0',
						flex: 0.85
					},{
						text: '=',
						flex: 2.3
					}
				]
			}]
            
    },
        
    /*initialize: function() {
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
		
		
    },*/
	
	onKeyTap: function(btn){        
	    this.fireEvent('keytap', btn.getText().toLowerCase());	
	}
	

});