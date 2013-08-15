Ext.define('RM.component.ChooseInvoiceItem', {
    requires: ['RM.component.Popup'],

    initialize: function(){
		
		this.popup=null;
	},
	
	show: function(cb,cbs){
		
		RM.ViewMgr.regBackHandler(this.hide, this);

       this.popup = Ext.create('RM.component.Popup', {
            defaults: {
					xtype: 'button',                    
					ui:'rm_btnaslistrow',
                    cls: 'rm-swipecontainer',
					handler: function(btn){
						this.hide();
						cb.call(cbs, btn.getItemId());
					},
					scope: this
				},
            items: [{
							xtype: 'component',
							html: 'Choose item to add',
                            cls: 'rm-title'
						},{
							text: 'Item',
							itemId: 'item',
                            
						},{
							text: 'Time',
							itemId: 'time',
                            
						},{
							text: 'Expenses',
							itemId: 'expenses',
                            
						}
				
					],
			
			
          
        });
		this.popup.show();		
	},	
	
	hide: function(){
        RM.ViewMgr.deRegBackHandler();
		this.popup.hide();
	}
});