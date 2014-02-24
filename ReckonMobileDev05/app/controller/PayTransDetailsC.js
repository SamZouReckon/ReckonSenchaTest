Ext.define('RM.controller.PayTransDetailsC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransDetails',
    config: {
        refs: {
            payTransDetails: 'paytransdetails'
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
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransDetails();
        if (!view){
            view = { xtype: 'paytransdetails' };
        }       
        RM.ViewMgr.showPanel(view);
    },   
    
    refund: function(){        
        RM.PayMgr.showScreen('PayTransRefund');   
    },
    
    sendReceipt: function(){
        
    },
    
    back: function () {
        RM.ViewMgr.back();
    }     
});