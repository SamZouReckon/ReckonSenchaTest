Ext.define('RM.controller.InvoiceActionsC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.InvoiceActions'],
    config: {
        refs: {
            invActions: 'invoiceactions',
            invStatus: 'invoiceactions #invoiceStatus',
            invAproveBtn: 'invoiceactions #approve',
            invPayBtn: 'invoiceactions #pay',
            invEmailBtn: 'invoiceactions #email'
        },
        control: {
            'invoiceactions': {
                show: 'onShow'
            },            
            'invoiceactions #back': {
                tap: 'back'
            },
            'invoiceactions #approve': {
                tap: 'onApprove'
            },            
            'invoiceactions #pay': {
                tap: 'onPay'
            },
            'invoiceactions #cancel': {
                tap: 'onCancel'
            },
            'invoiceactions #email': {
                tap: 'onEmail'
            },
            'invoiceactions #history': {
                tap: 'onHistory'
            }
        }

    },

    showView: function (data) {
        this.invoiceData = data;
        var view = this.getInvActions();
        if (!view){
            view = { xtype: 'invoiceactions' };
        }            
        RM.ViewMgr.showPanel(view);
    },

    onShow: function(){
        this.getInvStatus().setHtml(RM.InvoicesMgr.getInvoiceStatusText(this.invoiceData.Status));
        
        var hideApprove = !(RM.InvoicesMgr.isInvoiceApprovable(this.invoiceData.Status) || RM.PermissionsMgr.canApprove('Invoices'));
        this.getInvAproveBtn().setHidden(hideApprove);        
        
        var hideEmail = !( RM.InvoicesMgr.isInvoiceEmailable(this.invoiceData.Status) || RM.PermissionsMgr.canApprove('Invoices'));
        this.getInvEmailBtn().setHidden(hideEmail);
        
        this.getInvPayBtn().setHidden(!RM.InvoicesMgr.isInvoicePayable(this.invoiceData.Status));        
    },
    
    onApprove: function () {
        RM.AppMgr.saveServerRec('InvoiceApprove', true, {InvoiceID: this.invoiceData.InvoiceId},
			function () {
                RM.AppMgr.itemUpdated('invoice');
                RM.ViewMgr.backTo('invoices');
			},
			this,
            function(recs, eventMsg){
                alert(eventMsg);                
            }
		);  
    },    
    
    onPay: function () {
        //RM.InvoicesMgr.showAcceptPayment(this.invoiceData.invoiceId, this.invoiceData.BalanceDue);
        RM.InvoicesMgr.showAcceptPayment(this.invoiceData);
    },

    onEmail: function () {
        RM.InvoicesMgr.sendMsg(
            function(){
                RM.ViewMgr.backTo('invoicedetail');
            },
            this,
            this.invoiceData, 
            'email'
        );
    },

    onHistory: function () {
        RM.Selectors.showHistory('Invoice', RM.Consts.HistoryTypes.INVOICE, this.invoiceData.InvoiceId);
    },

    back: function () {
        RM.ViewMgr.back();
    }

});