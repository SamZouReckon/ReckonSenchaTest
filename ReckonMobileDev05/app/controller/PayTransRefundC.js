Ext.define('RM.controller.PayTransRefundC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransRefund',
    config: {
        refs: {
            payTransRefund: 'paytransrefund'
        },
        control: {            
            'paytransrefund #refund': {
                tap: 'refund'
            },
            'paytransrefund #back': {
                tap: 'back'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransRefund();
        if (!view){
            view = { xtype: 'paytransrefund' };
        }       
        RM.ViewMgr.showPanel(view);
    },   
    
    refund: function(){
           
    },
    
    back: function () {
        RM.ViewMgr.back();
    }     
});