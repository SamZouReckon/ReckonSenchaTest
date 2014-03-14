Ext.define('RM.controller.PayRecvManualCardC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvManualCard',
     config: {
        refs: {
            payRecvManualCard: 'payrecvmanualcard',
            cardType: 'payrecvmanualcard extselectfield[name=CardTypeId]',
        },
        control: {
            'payrecvmanualcard #back': {
                tap: 'back'
            },
            'payrecvmanualcard #details': {
                tap: 'onDetailsTap'
            },
            'payrecvmanualcard #recordtransaction': {
                tap: 'recordTransaction'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvManualCard();
        if (!view){
            view = { xtype: 'payrecvmanualcard' };
        }      
        
        this.loadSelectFields();
        
        RM.ViewMgr.showPanel(view);
    },
    
    loadSelectFields: function(){
        
        var cardTypeStore = Ext.data.StoreManager.lookup('CardTypes');
        cardTypeStore.getProxy().setUrl(RM.AppMgr.getApiUrl('CardType'));        
        RM.AppMgr.loadStore(cardTypeStore,
            function(){},
            this
        );
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    recordTransaction: function() {
        RM.PayMgr.createTransaction(this.data, function(){
            RM.PayMgr.showScreen('PaySendReceipt');  
        },this); 
    },
    
    back: function () {
        RM.ViewMgr.back();
    }   
});