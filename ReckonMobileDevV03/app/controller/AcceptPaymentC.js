Ext.define('RM.controller.AcceptPaymentC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AcceptPayment', 'RM.view.AcceptPaymentMsg'],
    config: {
        refs: {
            acceptPayment: 'acceptpayment',
            acceptPaymentForm: 'acceptpayment formpanel',
            amountPaid: 'acceptpayment numberfield[name=AmountPaid]',
            acceptPaymentMsg: 'acceptpaymentmsg',
            msgCont: 'acceptpaymentmsg #msgcont'
        },
        control: {
            'acceptpayment': {
                show: 'onShow'
            },
            'acceptpayment #back': {
                tap: 'onBack'
            },
            'acceptpayment #pay': {
                tap: 'onPay'
            },
            'acceptpaymentmsg': {
                show: 'onMsgShow'
            },
            'acceptpaymentmsg #continue': {
                tap: 'onContinue'
            }
        }
    },

    showView: function (invoiceData) {
        //console.log(Ext.encode(invoiceData));
        this.invoiceId = invoiceData.InvoiceId;
        this.fullAmount = invoiceData.BalanceDue;
        this.accountsReceivableCategoryID = invoiceData.AccountsReceivableCategoryID;
        this.customerId = invoiceData.CustomerId;
        
        var view = this.getAcceptPayment();
        if (!view) {
            view = { xtype: 'acceptpayment' };
        }
        
        this.loadSelectFields();
        
        RM.ViewMgr.showPanel(view);
    },
    
    onShow: function(){
        var form = this.getAcceptPaymentForm();
        form.reset();        
        form.setValues({AmountPaid: this.fullAmount});
    },
    
    loadSelectFields: function(){
        
        var bankAcctStore = Ext.data.StoreManager.lookup('BankAccounts');
        bankAcctStore.getProxy().setUrl(RM.AppMgr.getApiUrl('BankAccount'));        
        RM.AppMgr.loadStore(bankAcctStore,
            function(){
                //this.getTemplateFld().setValue(this.invoiceData.TemplateID);
            },
            this
        );  
        
        var payMethodStore = Ext.data.StoreManager.lookup('PaymentMethods');
        payMethodStore.getProxy().setUrl(RM.AppMgr.getApiUrl('PaymentMethod'));        
        RM.AppMgr.loadStore(payMethodStore,
            function(){
                //this.getTemplateFld().setValue(this.invoiceData.TemplateID);
            },
            this
        );
        
    },
    
    showMsg: function () {
        var view = this.getAcceptPaymentMsg();
        if (!view) {
            view = { xtype: 'acceptpaymentmsg' };
        }
        RM.ViewMgr.showPanel(view);
    },

    onMsgShow: function () {        
        //this.getMsgCont().setHtml('$' + RM.AppMgr.numberWithCommas(Ext.Number.toFixed(this.amountPaid, 2)) + ' accepted.');
        this.getMsgCont().setHtml('Payment Accepted');
    },

    onContinue: function () {
        RM.ViewMgr.backTo('invoicedetail');
    },    
    
     validateForm: function(vals){        
        
        var isValid = true;
        return isValid;
    },     
    
    
    onPay: function(){
        var vals = this.getAcceptPaymentForm().getValues();
        vals.InvoiceId = this.invoiceId;
        vals.AccountsReceivableCategoryID = this.accountsReceivableCategoryID;
        vals.CustomerSupplierID = this.customerId;

        if(this.validateForm(vals)){ 
            //alert(Ext.encode(vals)); return;
            //this.showMsg(); return;
            RM.AppMgr.saveServerRec('AcceptPayment', true, vals,
    		    function () {                    
    		        this.showMsg();
    		        RM.AppMgr.itemUpdated('invoice');
    		    },
    		    this,
                function(recs, eventMsg){
                    alert('Accept Payment Failed ' + eventMsg);
                }
    	    );
        }            
        
    },

    onBack: function () {
         RM.AppMgr.showYesNoMsgBox("Are you sure you want to cancel pay invoice?",
                  function(btn){
                      if(btn == 'yes'){
                          RM.ViewMgr.back();
                      }
                  },
                  this
                );
        
    }

});