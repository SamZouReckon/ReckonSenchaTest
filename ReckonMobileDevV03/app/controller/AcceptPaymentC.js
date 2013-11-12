Ext.define('RM.controller.AcceptPaymentC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AcceptPayment', 'RM.view.AcceptPaymentMsg'],
    config: {
        refs: {
            acceptPayment: 'acceptpayment',
            acceptPaymentForm: 'acceptpayment formpanel',
            amountPaid: 'acceptpayment textfield[name=AmountPaid]',
            bankAccount: 'acceptpayment extselectfield[name=BankAccountId]',
            paymentMethod: 'acceptpayment extselectfield[name=PaymentMethodId]',
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
        this.accountsReceivableCategoryId = invoiceData.AccountsReceivableCategoryId;
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
        //form.reset();        
        form.setValues({AmountPaid: this.fullAmount});
    },
    
    loadSelectFields: function(){
        
        var bankAcctStore = Ext.data.StoreManager.lookup('BankAccounts');
        bankAcctStore.getProxy().setUrl(RM.AppMgr.getApiUrl('BankAccount'));        
        RM.AppMgr.loadStore(bankAcctStore,
            function(){
                //this.getTemplateFld().setValue(this.invoiceData.TemplateId);
            },
            this
        );  
        
        var payMethodStore = Ext.data.StoreManager.lookup('PaymentMethods');
        payMethodStore.getProxy().setUrl(RM.AppMgr.getApiUrl('PaymentMethod'));        
        RM.AppMgr.loadStore(payMethodStore,
            function(){
                //this.getTemplateFld().setValue(this.invoiceData.TemplateId);
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
        //this.getMsgCont().setHtml(RM.AppMgr.formatCurrency(this.amountPaid)) + ' accepted.');
        this.getMsgCont().setHtml('Payment Accepted');
    },

    onContinue: function () {
        RM.ViewMgr.backTo('slidenavigationview');
    },    
    
     validateForm: function(vals){        
        var isValid = true;
        
        if(!vals.AmountPaid){
            this.getAmountPaid().showValidation(false);
            isValid = false;
        } 
        
        if(!vals.BankAccountId){
            this.getBankAccount().showValidation(false);
            isValid = false;
        } 
         
        if(!vals.PaymentMethodId){
            this.getPaymentMethod().showValidation(false);
            isValid = false;
        }
         
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
            return false;
        }
         
        if(vals.AmountPaid > this.fullAmount){
            this.getAmountPaid().showValidation(false);
            RM.AppMgr.showErrorMsgBox('Payment Amount cannot be more than the balance due amount of ' + RM.AppMgr.formatCurrency(this.fullAmount));            
            isValid = false;
        }        
         
        return isValid;
    },     
    
    
    onPay: function(){
        var vals = this.getAcceptPaymentForm().getValues();
                
        vals.InvoiceId = this.invoiceId;
        vals.AccountsReceivableCategoryId = this.accountsReceivableCategoryId;
        vals.CustomerSupplierId = this.customerId;

        if(this.validateForm(vals)){ 
            RM.AppMgr.saveServerRec('AcceptPayment', true, vals,
    		    function () {                    
    		        this.showMsg();
    		        RM.AppMgr.itemUpdated('invoice');
    		    },
    		    this,
                function(recs, eventMsg){
                    RM.AppMgr.showOkMsgBox(eventMsg);
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