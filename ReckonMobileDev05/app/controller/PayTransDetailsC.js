Ext.define('RM.controller.PayTransDetailsC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransDetails',
    config: {
        refs: {
            payTransDetails: 'paytransdetails',
            date: 'paytransdetails #date',
            cardNumber: 'paytransdetails #cardno',
            receiptNumber: 'paytransdetails #receiptno'
            
        },
        control: {            
            'paytransdetails #refund': {
                tap: 'refund'
            },
            'paytransdetails #sendreceipt': {
                tap: 'sendReceipt'
            },
            'paytransdetails #back': {
                tap: 'back'
            },
            'paytransdetails #details': {
                tap: 'onDetailsTap'
            },
        }
     },
    
    showView: function (data, callback, callbackScope) {
        this.data = data;
        var view = this.getPayTransDetails();
        if (!view){
            view = { xtype: 'paytransdetails' };
        }       
        RM.ViewMgr.showPanel(view);
        this.loadData();
    },   
    
    loadData: function(){
        console.log(this.data);
        this.getDate().setValue(this.data.TransactionDate);
        this.getCardNumber().setValue('Card Ending with 4455');
        this.getReceiptNumber().setValue('KSC1298');
    },
    
    refund: function(){        
        RM.PayMgr.showScreen('PayTransRefund');   
    },
    
    sendReceipt: function(){
        
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    back: function () {
        RM.ViewMgr.back();
    }     
});