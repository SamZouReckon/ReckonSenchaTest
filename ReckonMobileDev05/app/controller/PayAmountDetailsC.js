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
        this.data = data;
        var view = this.getPayAmountDetails();
        if (!view)
            view = { xtype: 'payamountdetails' };
        RM.ViewMgr.showPanel(view, 'flip');
    },
    
    onShow: function () {            
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
            this.formatNumber(this.data.Amount), 
            this.formatDiscountValue(), 
            this.formatNumber(this.data.Surcharge), 
            this.formatNumber(this.data.Total)));
    },
    
    formatDiscountValue: function(){
       var discount = 'None';
       if (!this.data.DiscountPercent && !this.data.DiscountAmount) {
           return discount; 
       }
       else if (this.data.DiscountPercent) {
           var amount = parseFloat(this.data.Amount);
           discount = (parseFloat(this.data.DiscountPercent) / 100) * amount;
           discount = '(' + this.data.DiscountPercent + '%' + ')' + ' $' + discount.toFixed(2);
       }
       else if (this.data.DiscountAmount) {
           discount = '$' + this.data.DiscountAmount;
       }
       return discount;
    },
    
    formatNumber: function(val, decimalPlaces){        
        if(!val){
            return '0.00';
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