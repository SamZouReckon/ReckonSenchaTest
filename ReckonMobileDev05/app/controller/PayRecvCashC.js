Ext.define('RM.controller.PayRecvCashC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvCash',
     config: {
        refs: {
            payRecvCash: 'payrecvcash'
        },
        control: {
            'payrecvcash #back': {
                tap: 'back'
            },
            'payrecvcash #details': {
                tap: 'onDetailsTap'
            },
            'payrecvcash #tendercash': {
                tap: 'tenderCash'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvCash();
        if (!view){
            view = { xtype: 'payrecvcash' };
        }       
        RM.ViewMgr.showPanel(view);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    tenderCash: function(){
        RM.PayMgr.createTransaction(this.data, function(){
            RM.PayMgr.showScreen('PaySendReceipt');  
        },this);
    },
        
    back: function () {
        RM.ViewMgr.back();
    }    
});