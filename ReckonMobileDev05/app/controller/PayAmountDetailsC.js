Ext.define('RM.controller.PayAmountDetailsC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayAmountDetails',
    config: {
        refs: {
            payAmountDetails: 'payamountdetails',
            detailsComp: 'payamountdetails #details'
        },
        control:{
            'payamountdetails':{
                show: 'onShow'
            },
            'payamountdetails #return':{
                tap: 'onReturn'
            }            
        }
    },
    
    
    showView: function (data) {
        this.details = data;
        var view = this.getPayAmountDetails();
        if (!view)
            view = { xtype: 'payamountdetails' };
        RM.ViewMgr.showPanel(view, 'flip');
    },
    
    onShow: function () {
        var data = this.details;       
        this.getDetailsComp().setHtml(       
        Ext.util.Format.format(
            '<table width="90%" class="rm-tablelayout">' +        
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>Amount</span><span class="rm-balance-breakdown-amount">${0}</span></div>' +
                '</tr>' +
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>GST</span><span class="rm-balance-breakdown-amount">${1}</span></div>' +
                '</tr>' +                
                '<tr>'+
                    '<div class="rm-balance-breakdown-row"><span>Surcharge</span><span class="rm-balance-breakdown-amount">${2}</span></div>' +
                '</tr>' +                 
                '<tr>' +
                    '<div class="rm-balance-breakdown-due"><span>TOTAL</span><span class="rm-balance-breakdown-amount">${3}</span></div>'   +
                '</tr>' + 
             '</table>', 
            data.Amount, 
            data.GST, 
            data.Surcharge, 
            data.Total));
    },
    
    onReturn: function(){
        RM.ViewMgr.back('flip');
    }
    
});