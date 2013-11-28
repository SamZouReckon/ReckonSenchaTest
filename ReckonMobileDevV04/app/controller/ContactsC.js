Ext.define('RM.controller.ContactsC', {
    extend: 'Ext.app.Controller',
    rmPermissionName: 'contacts',
    config: {
        refs: {
            contacts: 'contacts',
            contactsList: 'contacts list'
        },
        control: {
			'contacts': {
				show: 'onShow'
			},
            'contacts sortsearchbar': {
                sort: 'onSort',
                search: function (val) {
                    this.searchFilter = val;
                    this.setLoadTimer();
                },

                searchclear: function () {
                    delete this.searchFilter;
                    this.loadList();
                }
            },		
			'contacts list': {
				select: 'onItemSelect'			
			},
			'contacts #add': {
                tap: 'add'
            },
            'contacts #refresh': {
                tap: function (textField) {
                    this.loadList();
                }
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
        this.contactTypeFilter = 'customersuppliers';
    },
	
	onShow: function(){        
		this.getContactsList().getStore().getProxy().setUrl(RM.AppMgr.getApiUrl('Contacts'));
        this.loadList();
    },

    onSort: function(val){
      this.contactTypeFilter = val;
      this.loadList();
    },
    
    onItemUpdated: function (itemType) {
        if (itemType == 'contact' && this.getContacts()) {
            this.loadList();
        }
    },

	onItemSelect: function(list, rec){

		// Delay the selection clear so get a flash of the selection
		setTimeout(function(){list.deselect(rec);},500);
		RM.ContactsMgr.showContactDetail(false, rec.data,
			function(closeType, data){
				if(closeType == 'save')
					this.loadList();				
			}, 
			this
		);

    },	
	
	add: function(){
        
		RM.ContactsMgr.showContactDetail(true, null,
			function(closeType, data){
				if(closeType == 'save')
					this.loadList();
			}, 
			this
		);
	
	},	

    loadList: function () {
        var store = this.getContactsList().getStore();
        
        store.removeAll(); //prevents an error that occurs if scrolled to say group S in suppliers and then change to Customers which has no group S
        
        store.clearFilter();
        if(this.contactTypeFilter){
            store.filter('contacttype', this.contactTypeFilter);
        }        
        if(this.searchFilter){
            store.filter('search', this.searchFilter);
        }
        RM.AppMgr.loadStore(store);
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }


});