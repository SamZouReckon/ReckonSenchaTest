Ext.define('RM.component.SortSearchBar', {
    extend: 'Ext.Toolbar',    
    xtype: 'sortsearchbar',
	requires: ['RM.component.DropdownButton', 'Ext.field.Search'],
    
    config: {
		ui: 'rm-sortsearch-topbar',
		control: {
			'dropdownbutton': {
				sort: 'onSort'
			},
			'textfield': {			
				keyup: 'onSearchKeyUp',
				clearicontap: 'onClearIconTap'
			},
			'button': {			
				tap: 'onSearchToggle'
			}
		}
    },
        
    /*initConfig: function() {
		this.callParent(arguments);
    },*/
    
	
    initialize: function() {
		this.callParent(arguments);
		
		this.add([{
				xtype: 'dropdownbutton',				
				width: 190,				
				options: this.config.sortfields
			},{
				xtype: 'textfield',
				hidden: true,
				width: '80%',
                clearIcon: false
			},{
				xtype: 'spacer'				
			},{
				xtype: 'button',                
                margin: 0,
				ui: 'plain',				
                icon: 'resources/images/icons/rm-search.svg'				
			}
		]);

    },
	
	onSort: function(val){
		this.fireEvent('sort', val);	
	},
	
	onSearchKeyUp: function(sf){		
		this.fireEvent('search', sf.getValue());	
	},
	
	onClearIconTap: function(){
		this.fireEvent('searchclear');
	},

    setSearch: function(sortVal){
        //alert('setSearch ' + sortVal);
        this.getComponent(0).changeText(sortVal);
    },
	
	onSearchToggle: function(){
        
		var sort = this.getComponent(0), search = this.getComponent(1), btn = this.getComponent(3);       
        search.setHidden(!search.isHidden());
        if('resources/images/icons/rm-search.svg' == btn.getIcon())
        {
            btn.setIcon('resources/images/icons/rm-cross.svg');
            search.focus();
        }
        else 
        {   if(search.getValue()!='')  this.fireEvent('searchclear');         
            search.reset();            
            btn.setIcon('resources/images/icons/rm-search.svg');
        }
        if(this.config.sortfields!=null){
		    sort.setHidden(!sort.isHidden());
        }	
        
	}

});