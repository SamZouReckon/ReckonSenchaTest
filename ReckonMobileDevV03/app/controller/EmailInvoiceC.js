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
            templateFld: 'emailinvoice selectfield[name=InvoiceTemplateId]'
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
        RM.AppMgr.getServerRec('InvoiceMessagesTemplates', {InvoiceId: this.invoiceData.InvoiceId}, 
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
                this.getTemplateFld().setValue(this.invoiceData.TemplateId);
            },
            this
        );
        
    }, 
    
    validateForm: function(vals) {        
        var isValid = true; 
        
        //To reset label color
        this.getEmail().showValidation(true);
        this.getSubject().showValidation(true);
        
        if(vals.Email == '' && vals.Subject == ''){
             this.getEmail().showValidation(false);
            this.getSubject().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidFormMsg();
            return isValid;
        }
        
        if (vals.Email == '') {
            this.getEmail().showValidation(false);
            isValid = false;
        }
         
        if (vals.Subject == '') {
            this.getSubject().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidFormMsg();
            return isValid;
        }
         
        if (!RM.AppMgr.validateEmail(vals.Email)) {             
            this.getEmail().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidEmailMsg();
            return isValid;
        }
        
        if (!isValid) {            
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
                function (recs, eventMsg) {
                    this.showEmailFail(eventMsg);
                },'Sending...'
            );
        }
    },

    showEmailSent: function (email) {
        this.getSentCont().setHtml('Email sent to ' + email);
        this.getEmailInvoice().setActiveItem(1);
    },

    showEmailFail: function (eventMsg) {
        this.getErrorCont().setHtml('Error sending email.<br/>' + eventMsg);
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