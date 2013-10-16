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
            xtype: 'textareafield',
			itemId: 'notetext',            
            clearIcon: false,
            //placeHolder: 'enter', //is set in controller depending on whether is editable or not
            cls: 'rm-addnotefield'                      
        }
        ]
    }
});