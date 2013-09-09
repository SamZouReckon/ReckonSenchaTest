Ext.define('RM.component.ChooseInvoiceItem', {
    requires: ['RM.component.Popup'],

    items: [{
        		xtype: 'component',
				html: 'Choose item to add',
                cls: 'rm-title'
			},{
				text: 'Item',
				itemId: 'item'                
			},{
				text: 'Time',
				itemId: 'time',
                permissionFor: 'TimeSheets_BillEntry'                            
			},{
				text: 'Expenses',
				itemId: 'expenses',
                permissionFor: 'ExpenseClaims_BillEntry'
			}
	
		],
    
    initialize: function(){
		
		this.popup=null;
	},
	
	show: function(cb,cbs){
        RM.ViewMgr.regBackHandler(this.hide, this);

        var popup = Ext.create('RM.component.Popup', {
            defaults: {
					xtype: 'button',                    
					ui:'rm_btnaslistrow',
                    cls: 'rm-swipecontainer',
					handler: function(btn){
						this.hide();
						cb.call(cbs, btn.getItemId());
					},
					scope: this
				}          
        });
        
        var selectableItemCount = 0;
        this.items.forEach(function(item) {
            if(!item.permissionFor || RM.PermissionsMgr.getPermission(item.permissionFor)) {
                popup.add(item);
                if (item.itemId) { selectableItemCount += 1; }
            }
        });
        
        // Only show the popup if more than one selectable option is available
        if (selectableItemCount > 1) {
            this.popup = popup;
		    popup.show();	
        }
        // Otherwise just callback as if the only available item has been selected
        else {            
            cb.call(cbs, this.items[1].itemId);
        }
	},	
	
	hide: function(){
        RM.ViewMgr.deRegBackHandler();
		this.popup.hide();
	}
});