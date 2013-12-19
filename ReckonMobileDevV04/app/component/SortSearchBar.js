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
				clearicontap: 'onClearIconTap',
                blur: 'onSearchBlur'
			},
			'button': {			
				tap: 'onSearchToggle'
			}
		}
    },
    
	
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
                iconCls: 'rm-sortsearchbtn',
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
        
		var search = this.getComponent(1);       

        if(search.isHidden())
        {
            this.showSearch();
        }
        else 
        {   
            this.hideSearch();
        }
        
        
	},
    
    showSearch: function(){        
        var search = this.getComponent(1), btn = this.getComponent(3), sort = this.getComponent(0);
        
        
        btn.setIcon('resources/images/icons/rm-cross.svg');        
        sort.setHidden(true);
        search.setHidden(false);
        search.focus();
        this.needForceFocus = true;
        /*if (this.focusTimer) {
            clearTimeout(this.focusTimer);
            this.focusTimer = null;
        }
        this.focusTimer = Ext.defer(this.focusSearch, 1000, this);*/
        
    },
    
    /*focusSearch: function(){        
        this.getComponent(1).focus();        
    }, */
    
    onSearchBlur: function() { 
        if (Ext.os.is('Android')) {
            if (this.needForceFocus) {
                this.getComponent(1).focus();
                this.needForceFocus = false;              
            }
        }           
    },
    
    hideSearch: function(supressEvent){
        var search = this.getComponent(1), btn = this.getComponent(3), sort = this.getComponent(0);
        search.blur();
        search.setHidden(true);
        if(!supressEvent && search.getValue() != ''){
            this.fireEvent('searchclear'); 
        }           
        search.reset(); 
        
        btn.setIcon('resources/images/icons/rm-search.svg');        
        sort.setHidden(this.config.sortfields == null);
    }

});