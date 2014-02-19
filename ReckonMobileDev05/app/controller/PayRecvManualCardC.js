Ext.define('RM.controller.PayRecvManualCardC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvManualCard',
     config: {
        refs: {
            payRecvManualCard: 'payrecvmanualcard'
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
        RM.ViewMgr.showPanel(view);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    recordTransaction: function() {
        RM.PayMgr.showScreen('PaySendReceipt');    
    },
    
    back: function () {
        RM.ViewMgr.back();
    }   
});