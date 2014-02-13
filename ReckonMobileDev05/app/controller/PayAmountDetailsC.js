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
                tap: 'return'
            }            
        }
    },
    
    
    showView: function (data) {
        this.details = data;
        var view = this.getPayAmountDetails();
        if (!view)
            view = { xtype: 'payamountdetails' };
        RM.ViewMgr.showPanel(view);
    },
    
    onShow: function () {
        var data = this.details;       
        this.getDetailsComp().setHtml(
        '<table width="90%" class="rm-tablelayout">' +        
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>Amount</span><span class="rm-balance-breakdown-amount">$50.54</span></div>' +
                '</tr>' +
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>GST</span><span class="rm-balance-breakdown-amount">$2.45</span></div>' +
                '</tr>' +                
                '<tr>'+
                    '<div class="rm-balance-breakdown-row"><span>Surcharge</span><span class="rm-balance-breakdown-amount">$2.40</span></div>' +
                '</tr>' +                 
                '<tr>' +
                    '<div class="rm-balance-breakdown-due"><span>TOTAL</span><span class="rm-balance-breakdown-amount">$54.67</span></div>'   +
                '</tr>' + 
             '</table>'
        /*Ext.util.Format.format(
            '<table width="90%" class="rm-tablelayout">' +        
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>Amount</span><span class="rm-balance-breakdown-amount">$50.54</span></div>' +
                '</tr>' +
                '<tr>' +
                    '<div class="rm-balance-breakdown-row"><span>GST</span><span class="rm-balance-breakdown-amount">$2.45</span></div>' +
                '</tr>' +                
                '<tr>'+
                    '<div class="rm-balance-breakdown-row"><span>Surcharge</span><span class="rm-balance-breakdown-amount">$2.40</span></div>' +
                '</tr>' +                 
                '<tr>' +
                    '<div class="rm-balance-breakdown-due"><span>TOTAL</span><span class="rm-balance-breakdown-amount">$54.67</span></div>'   +
                '</tr>' + 
             '</table>', 
            this.formatCurrency(data.Amount), 
            this.formatCurrency(data.GST), 
            this.formatCurrency(data.Surcharge), 
            this.formatCurrency(data.Total))*/
        );
    },
    
    return: function(){
        RM.ViewMgr.back();
    }
    
});