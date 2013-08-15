Ext.define('RM.core.InvoicesMgr', {

    singleton: true,

    requires: ['RM.view.InvoiceDetail', 'RM.view.History', 'RM.component.ChooseInvoiceItem', 'RM.component.ChooseInvoiceDiscount', 'RM.view.CreateItem', 'RM.view.InvoiceTimeSelectDetail'],

    init: function (application) {
        
    },

    getInvoiceStatusText: function(status){
        
        switch(status){
            case RM.Consts.InvoiceStatus.DRAFT:
                return 'DRAFT';
            case RM.Consts.InvoiceStatus.APPROVED:
                return 'INVOICED';
            case RM.Consts.InvoiceStatus.PARTIALLY_PAID:
                return 'PARTIALLY PAID';
            case RM.Consts.InvoiceStatus.PAID:
                return 'PAID';
        }
        
        return 'UNKNOWN';        
    },
    
    isInvoiceApprovable: function(status){
        return (status == RM.Consts.InvoiceStatus.DRAFT);        
    },    
    
    isInvoicePayable: function(status){        
        return (status == RM.Consts.InvoiceStatus.APPROVED) || (status == RM.Consts.InvoiceStatus.PARTIALLY_PAID);
    },
    
    isInvoiceEditable: function(status){
        return (status == RM.Consts.InvoiceStatus.DRAFT);
    },    
    
    isInvoiceEmailable: function(status){        
        return (status == RM.Consts.InvoiceStatus.APPROVED) || (status == RM.Consts.InvoiceStatus.PARTIALLY_PAID) || (status == RM.Consts.InvoiceStatus.PAID);
    },    
    
    showCustInvoices: function (invoicesTitle, customerId, customerName, sortVal) {

        var invoicesC = RM.AppMgr.getAppControllerInstance('RM.controller.InvoicesC');
        invoicesC.showView(invoicesTitle, customerId, customerName, sortVal);
    },

    showInvoiceDetail: function (isCreate, data, cb, cbs) {
        var invoiceDetailC = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceDetailC');
        invoiceDetailC.showView(isCreate, data, cb, cbs);
    },

    showChooseItemPopup: function (customerId, showItemTax, cb, cbs) {
        var itemPopup = Ext.create('RM.component.ChooseInvoiceItem');
        itemPopup.show(
			function (itemId) {
			    switch (itemId) {
			        case 'item':
			            //RM.Selectors.showItems(showItemTax, null, true, cb, cbs);
                        this.showInvoiceLineItem(true, customerId, showItemTax, null, cb, cbs);
			            break;
			        case 'time':
			            this.showInvoiceTimeSelect(customerId, cb, cbs);
			            break;
			        case 'expenses':
			            this.showInvoiceExpenseSelect(customerId, cb, cbs);
			            break;
			    }
			},
			this
		);
    },

    showChooseDiscountPopup: function (val, cb, cbs) {

        var discPopup = Ext.create('RM.component.ChooseInvoiceDiscount');
        discPopup.show(
            val,
			function (disc) {
			    if (disc == 'custom')
			        this.showCustomDiscount(val, cb, cbs);
			    else
			        cb.call(cbs, disc);
			},
			this
		);
    },
    
    showContactDetail: function(isCreate, data, cb, cbs){
        var contactDetailC = RM.AppMgr.getAppControllerInstance('RM.controller.ContactDetailC');
        contactDetailC.showView(isCreate, data, cb, cbs);  
    },
    
    showCreateItem: function(cb, cbs){
        var createItem = RM.AppMgr.getAppControllerInstance('RM.controller.CreateItemC');
        createItem.showView(cb, cbs);        
    },

    showCustomDiscount: function (val, cb, cbs) {
        var custDisc = RM.AppMgr.getAppControllerInstance('RM.controller.CustomDiscountC');
        custDisc.showView(val, cb, cbs);
    },

    showInvoiceLineItem: function(editable, customerId, showTaxCode, detailsData, cb, cbs){
        var invLineItem = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceLineItemC');
        invLineItem.showView(editable, customerId, showTaxCode, detailsData, cb, cbs);
    },
    
    showInvoiceTimeSelect: function (customerId, cb, cbs) {
        var invoiceTimeSelectC = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceTimeSelectC');
        invoiceTimeSelectC.showView(customerId, cb, cbs);
    },

    showInvoiceExpenseSelect: function (customerId, cb, cbs) {
        var invoiceExpSelectC = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceExpenseSelectC');
        invoiceExpSelectC.showView(customerId, cb, cbs);
    },
    
    showInvoiceTimeSelectDetail: function(detailsTitle, items, cb, cbs){
        var invoiceTimeSelectDetailC = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceTimeSelectDetailC');
        invoiceTimeSelectDetailC.showView(detailsTitle, items, cb, cbs);
    },

    showBalanceBreakdown: function (data) {
        var balBreakdown = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceBalanceBreakdownC');
        balBreakdown.showView(data);
    },

    showActions: function (invoiceId) {
        var actions = RM.AppMgr.getAppControllerInstance('RM.controller.InvoiceActionsC');
        actions.showView(invoiceId);
    },

    sendMsg: function (cb, cbs, invoiceData, msgType) {
        var emailInvoice = RM.AppMgr.getAppControllerInstance('RM.controller.EmailInvoiceC');
        emailInvoice.showView(cb, cbs, invoiceData, msgType);
    },

    /*emailInvoiceReminder: function (invoiceId) {

        RM.AppMgr.saveServerRec('InvoiceMessages', true, { MsgType: 'emailreminder', InvoiceId: invoiceId },
			function () {
			    RM.ViewMgr.back();
			},
			this
		);

    },*/

    showAcceptPayment: function (invoiceData) {
        RM.AppMgr.getAppControllerInstance('RM.controller.AcceptPaymentC').showView(invoiceData);
    }

});