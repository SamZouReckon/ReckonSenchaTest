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
            'paysendreceipt #dontsendreceiptbtn': {
                tap: 'done'
            },
            'paysendreceipt #done': {
                tap: 'done'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPaySendReceipt();
        if (!view){
            view = { xtype: 'paysendreceipt' };
        }       
        RM.ViewMgr.showPanel(view);
        this.getPaySendReceipt().setActiveItem(0);
        this.getPaySendReceiptTitle().setHtml('$' + data.Amount + ' charged');
    },   
    
    done: function() {       
       RM.ViewMgr.showPay();
    },
    
    sendReceipt: function () {
        var vals = {};
        vals.SMS = this.getSmsFld().getValue();
        vals.Email = this.getEmailFld().getValue();
        if(this.validateForm(vals)){
            this.setReceiptContent(vals)
            this.getPaySendReceipt().setActiveItem(1);
        }
        
    },
    
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