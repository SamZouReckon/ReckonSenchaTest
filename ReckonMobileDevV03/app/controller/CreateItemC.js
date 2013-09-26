Ext.define('RM.controller.CreateItemC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            createItem: 'createitem',
            createItemForm: 'createitem formpanel',
            acctCatFld: 'createitem selectfield[name=SaleCategoryID]',
            taxCodeFld: 'createitem selectfield[name=SaleTaxCodeID]'
        },
        control: {
            'createitem #back': {
                tap: 'back'
            },            
            'createitem #save': {
                tap: 'onSave'
            }
        }

    },
	
	showView: function(cb, cbs){
        this.goCb = cb;
        this.goCbs = cbs;
        
		var view = this.getCreateItem();
		if(!view){
			view = {xtype:'createitem'};
        }
        else{
             this.getCreateItemForm().reset();
            this.getAcctCatFld().setValue(null);
            this.getTaxCodeFld().setValue(null);
        }
		RM.ViewMgr.showPanel(view);		
		
	},
    
    onSave: function(){
        var vals = this.getCreateItemForm().getValues();
        vals.ActiveStatus = RM.Consts.ItemStatus.ACTIVE;  //Remove this hardcoded value when state field is added back to form
        //vals.ActiveStatus = vals.ActiveStatus ? RM.Consts.ItemStatus.ACTIVE : RM.Consts.ItemStatus.INACTIVE; //Uncomment this line when state field is added back to form
        
        RM.AppMgr.saveServerRec('Items', true, vals,
			function () {
                RM.AppMgr.itemUpdated('item');
                RM.ViewMgr.back();
			},
			this,
            function(recs, eventMsg){
                alert(eventMsg);                
            }
		);        
        
    },

    back: function () {
        RM.ViewMgr.back();
    }


});