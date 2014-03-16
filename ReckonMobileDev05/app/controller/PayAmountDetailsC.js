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
                    '<div class="rm-balance-breakdown-row"><span>Discount</span><span class="rm-balance-breakdown-amount">{1}</span></div>' +
                '</tr>' +                
                '<tr>'+
                    '<div class="rm-balance-breakdown-row"><span>Surcharge</span><span class="rm-balance-breakdown-amount">${2}</span></div>' +
                '</tr>' +                 
                '<tr>' +
                    '<div class="rm-balance-breakdown-due"><span>TOTAL</span><span class="rm-balance-breakdown-amount">${3}</span></div>'   +
                '</tr>' + 
             '</table>', 
            data.Amount, 
            data.Discount, 
            this.formatNumber(data.Surcharge), 
            this.formatNumber(data.Total)));
    },
    
    formatNumber: function(val, decimalPlaces){        
        if(!val){
            return '';
        } 
        decimalPlaces ? decimalPlaces = decimalPlaces : decimalPlaces = 2;
        var result = val;        
        result = parseFloat(val);
        result = result.toFixed(decimalPlaces);    
        return result;       
    },
    
    onReturn: function(){
        RM.ViewMgr.back('flip');
    }
    
});