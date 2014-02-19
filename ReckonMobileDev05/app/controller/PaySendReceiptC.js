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
    
    sendReceipt: function () {
        this.getPaySendReceipt().setActiveItem(1);
    }    
});