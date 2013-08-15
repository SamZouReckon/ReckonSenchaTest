Ext.define('RM.controller.InvoiceBalanceBreakdownC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.InvoiceBalanceBreakdown'],
    config: {
        refs: {
            invBalBreakdown: 'invoicebalancebreakdown',
            breakdownCont: 'invoicebalancebreakdown #breakdownCont'
        },
        control: {
            'invoicebalancebreakdown': {
                show: 'onShow'
            },
            'invoicebalancebreakdown #back': {
                tap: 'back'
            }
        }

    },

    showView: function (data) {
        this.invoiceData = data;
        var view = this.getInvBalBreakdown();
        if (!view)
            view = { xtype: 'invoicebalancebreakdown' };
        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {
        var data = this.invoiceData;
        
        console.log(Ext.encode(data));
        
        this.getBreakdownCont().setHtml(Ext.util.Format.format(
                   '<table width="90%" class="rm-tablelayout">' +
                    '<tr>'+
                   '<div class="rm-balance-breakdown-row"><span>Total</span><span class="rm-balance-breakdown-amount">${0}</span></div>' +
                   '</tr>' +
                    '<tr>' +
                   '<div class="rm-balance-breakdown-row"><span>Discount</span><span class="rm-balance-breakdown-amount">${1}</span></div>' +
                   '</tr>' +
                    '<tr>' +
                   '<div class="rm-balance-breakdown-row"><span>Tax</span><span class="rm-balance-breakdown-amount">${2}</span></div>' +
                   '</tr>' +
                    '<tr>' +
                   '<div class="rm-balance-breakdown-row"><span>Subtotal</span><span class="rm-balance-breakdown-amount">${3}</span></div>' +
                   '</tr>' +
                    '<tr>' +
                   '<div class="rm-balance-breakdown-row"><span>Already paid</span><span class="rm-balance-breakdown-amount">${4}</span></div>' +
                   '</tr>' +
                    '<tr>' +
                   '<div class="rm-balance-breakdown-due"><span>Balance due</span><span class="rm-balance-breakdown-amount">${5}</span></div>'   +
                   '</tr>' + 
                   '</table>'              
                   , this.formatNumber(data.Amount), this.formatNumber(data.DiscountTotal), this.formatNumber(data.Tax), this.formatNumber(data.Subtotal), this.formatNumber(data.Paid), this.formatNumber(data.BalanceDue))
                   );
    },

    formatNumber: function(val){
        return  RM.AppMgr.numberWithCommas(Ext.Number.toFixed(val, 2));
    },
    
    back: function () {
        RM.ViewMgr.back();
    }

});
