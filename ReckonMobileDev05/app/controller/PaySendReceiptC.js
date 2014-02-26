Ext.define('RM.controller.PaySendReceiptC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PaySendReceipt',
     config: {
        refs: {
            paySendReceipt: 'paysendreceipt'
        },
        control: {            
            'paysendreceipt #sendreceipt': {
                tap: 'sendReceipt'
            },
            'paysendreceipt #done': {
                tap: 'done'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPaySendReceipt();
        if (!view){
            view = { xtype: 'paysendreceipt' };
        }       
        RM.ViewMgr.showPanel(view);
    },   
    
    done: function() {
       console.log('done'); 
       RM.ViewMgr.showPay();
    },
    
    sendReceipt: function () {
        this.getPaySendReceipt().setActiveItem(1);
    }    
});