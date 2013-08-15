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
		var keyHeight = 40;
		
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
				defaults: {xtype:'button', cls: 'rm-flatkeypadbutton'},
				items:[{
						text: 'BACK',
						height: keyHeight
					},{
						text: '+',
						height: keyHeight					
					},{
						text: '=',
						flex: 1
					}
				]
			}
		
		
		
		
		]);
		
		/*this.add([{
			xtype: 'container',
			layout: 'hbox',
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'flatkeypadbutton'},
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
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'flatkeypadbutton'},
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
			defaults: {xtype: 'button', flex: 1, height: 60, cls: 'flatkeypadbutton'},
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
			defaults: {xtype: 'button', flex: 1, height: 50, cls: 'flatkeypadbutton'},
			items:[{
					text: ''
				},{
					text: '0'
				},{
					//text: 'x'
					iconMask: true,
					iconCls: 'crossIcon',
					
				}
			]
		}]);*/
    },
	
	onKeyTap: function(btn){

	    this.fireEvent('keytap', btn.getText().toLowerCase());	
	}
	

});