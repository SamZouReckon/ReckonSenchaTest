Ext.define('RM.controller.PaySendReceiptC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PaySendReceipt',
     config: {
        refs: {
            paySendReceipt: 'paysendreceipt',
            paySendReceiptTitle: 'paysendreceipt #title',
            smsFld: 'paysendreceipt textfield[name=SMS]',
            emailFld: 'paysendreceipt textfield[name=Email]',
            sentCont: 'paysendreceipt #sentcont'
        },
        control: {            
            'paysendreceipt #sendreceiptbtn': {
                tap: 'sendReceipt'
            },
            /*'paysendreceipt #sendreceiptbtn2': {
                tap: 'sendReceiptUsingSmsUri'
            },*/
            'paysendreceipt #dontsendreceiptbtn': {
                tap: 'done'
            },
            'paysendreceipt #done': {
                tap: 'done'
            }
        }
     },
    
    showView: function (data, callback, callbackScope) {
        this.data = data;
        this.callback = callback;
        this.callbackScope = callbackScope;
        
        var view = this.getPaySendReceipt();
        if (!view){
            view = { xtype: 'paysendreceipt' };
        }       
        RM.ViewMgr.showPanel(view);
        this.clearFields();
        this.getPaySendReceipt().setActiveItem(0);
        this.getPaySendReceiptTitle().setHtml('$' + data.Total + ' charged');
        if(this.data.CustomerEmail){
            this.getEmailFld().setValue(this.data.CustomerEmail);
        }
    },  
    
    clearFields: function(){
        this.getEmailFld().setValue('');
        this.getSmsFld().setValue('');
    },
    
    done: function() {
        if(this.callback){
            this.callback.call(this.callbackScope);
        }
        else{
            RM.ViewMgr.showPayWithSlideNav();
        }
    },
    
    sendReceipt: function () {
        var vals = {};
        vals.SMS = this.getSmsFld().getValue();
        vals.Email = this.getEmailFld().getValue();
        if(this.validateForm(vals)){
            this.sendSMS(vals);                       
        }       
    },
    
    sendSMS: function(vals) {
        var number = vals.SMS;
        //alert('sending SMS using Cordova plugin' + phoneNumber);
        var message = 'Test SMS from Reckon Pay';
        var intent = "INTENT"; //leave empty for sending sms using default intent
        var me = this;
        var success = function () { 
            me.setReceiptContent(vals); 
            me.getPaySendReceipt().setActiveItem(1);
            //me.done();
		};
        var error = function (e) { 
            RM.AppMgr.showErrorMsgBox('Message Failed:' + e); 
        };
        sms.send(number, message, intent, success, error);        
    },
    
    /*sendReceiptUsingSmsUri: function() {        
        var vals = {};
        vals.SMS = this.getSmsFld().getValue();
        vals.Email = this.getEmailFld().getValue();
        if(this.validateForm(vals)){
            alert('sending SMS using SMS Uri' + vals.SMS);                    
            window.location.href = "sms:" + vals.SMS + ";body=Test msg using Uri" ; 
            this.setReceiptContent(vals)
            this.getPaySendReceipt().setActiveItem(1);
        }  
        this.done();
    },*/
    
    setReceiptContent: function(vals){
        var msg = '';
        if(vals.SMS && vals.Email) {
            msg = 'SMS and Email sent';
        }
        else if(vals.SMS) {
            msg = 'SMS sent';
        }
        else if(vals.Email) {
            msg = 'Email sent';
        }
        this.getSentCont().setHtml(msg);
    },
    
     validateForm: function(vals){        
        var isValid = true;
        
        if( !vals.SMS && !vals.Email ){
            RM.AppMgr.showErrorMsgBox('Please enter Phone number or Email or both for receipt');            
            isValid = false;
        }
         
        if(vals.SMS && vals.SMS.length < 9) {
            RM.AppMgr.showErrorMsgBox('Please recheck the number you have entered it appears too short');            
            isValid = false;
        }
         
        if (vals.Email !== '' && !RM.AppMgr.validateEmail(vals.Email)) {             
            this.getEmailFld().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidEmailMsg();
            return isValid;
        } 
        
        /*if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }*/
        
        return isValid;
    }
});