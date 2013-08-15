Ext.define('RM.controller.ForgotPasswordC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.ForgotPassword'],
    config: {
        refs: {
            forgotPassword: 'forgotpassword',
            email: 'forgotpassword #email',
            successMsg: 'forgotpassword #successMsg',
            failMsg: 'forgotpassword #failMsg'
        },
        control: {
            'forgotpassword #back': {
                tap: 'back'
            },
            'forgotpassword #send': {
                tap: 'onSend'
            },
            'forgotpassword #continue': {
                tap: 'onContinue'
            },
            'forgotpassword #ok': {
                tap: 'onOk'
            }
        }

    },

    showView: function () {
        
        var view = this.getForgotPassword();
        if (view) {
            view.setActiveItem(0);
        }
        else {
            view = { xtype: 'forgotpassword' };
        }
        RM.ViewMgr.showPanel(view);
        this.getEmail().reset();
    },
    
    validateForm: function(val){     
         var isValid = true;
        
        if(val == ''){
             this.getEmail().showValidation(false);
             isValid = false;
         }
         
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
         
        return isValid;
    },

    onSend: function () {
        var emailAddress = this.getEmail().getValue();
        if(this.validateForm(emailAddress)){
            RM.AppMgr.saveServerRec('LoginMessages', true, { MsgType: 'resetpassword', UserName: this.getEmail().getValue() },
            function (recs) {
                this.showSuccess();
            },
            this,
            function (recs, errMsg) {
                this.showFail(errMsg);
            }
        );   
        }
             
        
        /*
        Ext.Ajax.request({
            url: RM.AppMgr.getApiUrl('LoginMessages'),
            method: 'POST',
            jsonData: { MsgType: 'resetpassword', UserName: this.getEmail().getValue() },
            success: function (response) {
                Ext.Viewport.setMasked(false);
                var resp = Ext.decode(response.responseText);

                if (resp.success) {
                    this.showSuccess();
                }
                else {
                    this.showFail(resp.msg);
                }
            },
            scope: this
        });
        */


    },

    showSuccess: function () {
        this.getSuccessMsg().setHtml('An email has been sent to your inbox with details on how to reset your password.');
        this.getForgotPassword().setActiveItem(1);
    },

    showFail: function (errorMsg) {
        this.getFailMsg().setHtml(errorMsg);
        this.getForgotPassword().setActiveItem(2);
    },

    onContinue: function () {
        RM.ViewMgr.back();
    },

    onOk: function () {
        RM.ViewMgr.back();
    },

    back: function () {
        RM.ViewMgr.back();
    }

});