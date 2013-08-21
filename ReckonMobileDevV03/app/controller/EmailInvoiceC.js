Ext.define('RM.controller.EmailInvoiceC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.EmailInvoice'],
    config: {
        refs: {
            emailInvoice: 'emailinvoice',
            emailInvoiceForm: 'emailinvoice formpanel',
            email: 'emailinvoice emailfield[name=Email]',
            subject: 'emailinvoice textfield[name=Subject]',
            sentCont: 'emailinvoice #sentcont',
            errorCont: 'emailinvoice #errorcont',
            templateFld: 'emailinvoice selectfield[name=InvoiceTemplateID]'
        },
        control: {
            'emailinvoice': {
                show: 'onShow'
            },            
            'emailinvoice #back': {
                tap: 'back'
            },
            'emailinvoice #send': {
                tap: 'onSend'
            },
            'emailinvoice #continue': {
                tap: 'onContinue'
            },
            'emailinvoice #retry': {
                tap: 'onRetry'
            },
            'emailinvoice #cancel': {
                tap: 'onCancel'
            }
        }

    },

    showView: function (cb, cbs, invoiceData, msgType) {
        this.goCb = cb;
        this.goCbs = cbs;
        this.invoiceData = invoiceData;
        this.msgType = msgType;
        
        var view = this.getEmailInvoice();
        if (view) {
            view.setActiveItem(0);
        }
        else {
            view = { xtype: 'emailinvoice' };
        }
        
        this.loadTemplates();
        
        RM.ViewMgr.showPanel(view);
    },

    
    onShow: function(){
        this.getEmailInvoiceForm().reset();  
        RM.AppMgr.getServerRec('InvoiceMessagesTemplates', {InvoiceID: this.invoiceData.InvoiceId}, 
            function(rec){
                this.getEmailInvoiceForm().setValues({Email: this.invoiceData.CustomerEmail, Subject: rec.Subject, Body: rec.Body });
            },
            this
        );        
    },
    
    loadTemplates: function(){
        var store = Ext.data.StoreManager.lookup('InvoiceTemplates');
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('InvoiceTemplates'));
        
        store.clearFilter();
        store.filter('templateType', RM.Consts.DocTemplates.INVOICE);
        
        RM.AppMgr.loadStore(store,
            function(){
                this.getTemplateFld().setValue(this.invoiceData.TemplateID);
            },
            this
        );
        
    }, 
    
     validateForm: function(vals){        
        
         var isValid = true;
         /*var regExEmail = new RegExp("^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$");
         if(regExEmail.test(vals.Email)){
             RM.AppMgr.showErrorMsgBox('Please enter a valid email address');
             isValid = false;
         }*/
         if(vals.Email == ''){
             this.getEmail().showValidation(false);
             isValid = false;
         }
         if(!RM.AppMgr.validateEmail(vals.Email)){             
             this.getEmail().showValidation(false);
             isValid = false;
             RM.AppMgr.showInvalidEmailMsg();
         }
         if(vals.Subject == ''){
             this.getSubject().showValidation(false);
             isValid = false;
         }
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
         
        return isValid;
    },  
    
    onSend: function () {
        var vals = this.getEmailInvoiceForm().getValues();
        vals.InvoiceId = this.invoiceData.InvoiceId;
        vals.MsgType = this.msgType;
        if(this.validateForm(vals)){ 
             RM.AppMgr.saveServerRec('InvoiceMessages', true, vals,
                function (recs) {
                    this.showEmailSent(vals.Email);
                },
                this,
                function (recs) {
                    this.showEmailFail();
                }
            );
        }
    },

    showEmailSent: function (email) {
        this.getSentCont().setHtml('Email sent to ' + email);
        this.getEmailInvoice().setActiveItem(1);
    },

    showEmailFail: function () {
        this.getErrorCont().setHtml('Error sending email.');
        this.getEmailInvoice().setActiveItem(2);
    },

    onContinue: function () {
        //RM.ViewMgr.backTo('invoicedetail');
        this.goCb.call(this.goCbs);
    },

    onRetry: function () {
        this.getEmailInvoice().setActiveItem(0);
    },

    onCancel: function () {
        //RM.ViewMgr.backTo('invoicedetail');
        this.goCb.call(this.goCbs);
    },

    back: function () {
         RM.AppMgr.showYesNoMsgBox("Are you sure you want to cancel sending email?",
                  function(btn){
                      if(btn == 'yes'){
                          RM.ViewMgr.back();
                      }
                  },
                  this
                );
        
    }

});