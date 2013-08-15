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
					iconCls: 'rm-back',
                    width: '2.6em',
					iconMask: true,
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
            xtype: 'textareafield',
			itemId: 'notetext',            
            clearIcon: false,
            //placeHolder: 'enter', //is set in controller depending on whether is editable or not
            cls: 'rm-addnotefield'                      
        }
        ]
    }
});