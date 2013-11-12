Ext.define('RM.controller.InvoiceActionsC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.InvoiceActions'],
    config: {
        refs: {
            invActions: 'invoiceactions',
            invStatus: 'invoiceactions #invoiceStatus',
            invApproveBtn: 'invoiceactions #approve',
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
        
        var hideApprove = !(RM.InvoicesMgr.isInvoiceApprovable(this.invoiceData.Status) && RM.PermissionsMgr.canApprove('Invoices'));
        this.getInvApproveBtn().setHidden(hideApprove);        
        
        var hideEmail = !( RM.InvoicesMgr.isInvoiceEmailable(this.invoiceData.Status) && RM.PermissionsMgr.canApprove('Invoices'));
        this.getInvEmailBtn().setHidden(hideEmail);
        
        this.getInvPayBtn().setHidden(!RM.InvoicesMgr.isInvoicePayable(this.invoiceData.Status));        
    },
    
    onApprove: function () {        
        RM.AppMgr.saveServerRec('InvoiceApprove', true, {InvoiceId: this.invoiceData.InvoiceId},
			function () {
                RM.AppMgr.itemUpdated('invoice');
                RM.AppMgr.showSuccessMsgBox('Invoice ' + this.invoiceData.InvCode +' was Approved.');     
                this.invoiceData.Status = RM.Consts.InvoiceStatus.APPROVED;
                this.getInvStatus().addCls("rm-approved-hearderbg");
                this.onShow();
			},
			this,
            function(recs, eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
            }
		);  
    },    
    
    onPay: function () {
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