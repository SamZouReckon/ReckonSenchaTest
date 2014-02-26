Ext.define('RM.controller.PayRecvChequeC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvCheque',
     config: {
        refs: {
            payRecvCheque: 'payrecvcheque'
        },
        control: {
            'payrecvcheque #back': {
                tap: 'back'
            },
            'payrecvcheque #details': {
                tap: 'onDetailsTap'
            },
            'payrecvcheque #charge': {
                tap: 'charge'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvCheque();
        if (!view){
            view = { xtype: 'payrecvcheque' };
        }       
        RM.ViewMgr.showPanel(view);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    charge: function(){
       RM.PayMgr.createTransaction(this.data, function(){
            RM.PayMgr.showScreen('PaySendReceipt');  
        },this);   
    },
    
    back: function () {
        RM.ViewMgr.back();
    }    
});