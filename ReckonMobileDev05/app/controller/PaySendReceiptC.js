Ext.define('RM.controller.PaySendReceiptC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PaySendReceipt',
     config: {
        refs: {
            paySendReceipt: 'paysendreceipt'
        },
        control: {            
            'paysendreceipt #sendreceiptbtn': {
                tap: 'sendReceipt'
            },
            'paysendreceipt #dontsendreceiptbtn': {
                tap: 'done'
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
        this.getPaySendReceipt().setActiveItem(0);
    },   
    
    done: function() {       
       RM.ViewMgr.showPay();
    },
    
    sendReceipt: function () {
        this.getPaySendReceipt().setActiveItem(1);
    }    
});