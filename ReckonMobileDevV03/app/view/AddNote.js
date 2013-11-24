Ext.define('RM.view.AddNote', {
    extend: 'Ext.Panel',
    xtype: 'addnote',
    config: {
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{					
					ui: 'rm_topbarbuttonleft',
					icon: 'resources/images/icons/rm-back.svg',
                    iconCls: 'rm-backbtniconcls',
                    width: '2.6em',					
					itemId: 'back'				
				},{
					xtype: 'component',					
                    itemId: 'title',
					cls: 'rm-topbartitle'
				},{
					xtype:'spacer'
				},{
					text: 'ADD',
					itemId: 'add',                    
					ui: 'rm_topbarbuttonright'

				}
            ]
        },{
			xtype: 'formpanel',
			padding: 0,
			items: [{
                xtype: 'textareafield',
    			itemId: 'notetext',            
                clearIcon: false,
                //placeHolder: 'enter', //is set in controller depending on whether is editable or not
                cls: 'rm-addnotefield',
                //cls: 'rm-flatfield rm-inputel-alignl',
                border: '1 0 1 0',
                style: 'border-color: #DBDBDB; border-style: solid;',                
                maxRows: 10,
                listeners: {    
                    focus: function(field) {                                        
                        var numOfRows = field.getValue().split("\n").length;                                       
                        field.setMaxRows(numOfRows+2);
                    },
                    keyup: function(field) {
                        var numOfRows = field.getValue().split("\n").length;                                          
                        field.setMaxRows(numOfRows+2);
                    }
                }
            }]               
        }
        ]
    }
});