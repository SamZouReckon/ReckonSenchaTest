Ext.define('RM.controller.AcceptPaymentC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AcceptPayment', 'RM.view.AcceptPaymentType', 'RM.view.AcceptPaymentMsg'],
    config: {
        refs: {
            acceptPayment: 'acceptpayment',
            title: 'acceptpayment #title',
            paymentAmount: 'acceptpayment #paymentAmount',
            dataEntryKeypad: 'dataentrykeypad',
            acceptPaymentType: 'acceptpaymenttype',
            acceptPaymentMsg: 'acceptpaymentmsg',
            msgCont: 'acceptpaymentmsg #msgcont'
        },
        control: {
            'acceptpayment': {
                show: 'onShow',
                edit: 'onEdit',
                keytap: 'onKeyTap'
            },
            'acceptpayment #back': {
                tap: 'onBack'
            },
            'acceptpayment #next': {
                tap: 'onNext'
            },
            'acceptpaymenttype #back': {
                tap: 'onBack'
            },
            'acceptpaymenttype button': {
                tap: 'onSelectPayType'
            },
            'acceptpaymentmsg': {
                show: 'onMsgShow'
            },
            'acceptpaymentmsg #continue': {
                tap: 'onContinue'
            }
        }

    },

    showView: function (invoiceId, amount) {
        this.invoiceId = invoiceId;
        this.dueAmount = amount;
        this.amountPaid = amount;

        var view = this.getAcceptPayment();
        if (!view) {
            view = { xtype: 'acceptpayment' };
        }

        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {
        this.getDataEntryKeypad().hide(); //make keypad hide if already hiding from previous accept payment
        var amountStr = '$' + RM.AppMgr.numberWithCommas(Ext.Number.toFixed(this.dueAmount, 2));
        this.getTitle().setHtml('Due: ' + amountStr);
        this.getPaymentAmount().setValue(amountStr);
    },

    onEdit: function () {
        var keyPad = this.getDataEntryKeypad();
        if (keyPad.isHidden()){
            keyPad.show({ type: 'slide', direction: 'up' });
            this.amountPaid = '';
            this.getPaymentAmount().setValue('$');
        }            
        else
            keyPad.hide();
    },

    onKeyTap: function (key) {
        var amountStr = this.getPaymentAmount().getValue();
        
        if (key == 'back') {
            if (amountStr.length > 1) {
                amountStr = amountStr.slice(0, -1)
            }
        }        
        else if ((key != '.' && (amountStr.length < amountStr.indexOf('.') + 3)) || amountStr.indexOf('.') < 0) {    
            if(amountStr == '$0' && key != '.') amountStr = '$';
            amountStr += key;            
        }        
        this.amountPaid = parseFloat(amountStr.substr(1));          
        this.getPaymentAmount().setValue(amountStr);      
    },
    
    validateForm: function(){
        var isValid = true;
        console.log(this.amountPaid);
        if(this.amountPaid == ''){
             this.getPaymentAmount().showValidation(false);
             isValid = false;
         }
        
        if (!(Ext.isNumber(this.amountPaid) && this.amountPaid > 0)) {
            isValid = false;
            Ext.Msg.alert('Accept Payment', 'Please enter a valid payment amount.', Ext.emptyFn);
            return isValid;
        }
         
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
         
        return isValid;
    },

    onNext: function () {
        
        if(this.validateForm()){
            var view = this.getAcceptPaymentType();
            if (!view) {
                view = { xtype: 'acceptpaymenttype' };
            }
            RM.ViewMgr.showPanel(view);
        }
        /*if (Ext.isNumber(this.amountPaid) && this.amountPaid > 0) {
            var view = this.getAcceptPaymentType();
            if (!view) {
                view = { xtype: 'acceptpaymenttype' };
            }
            RM.ViewMgr.showPanel(view);
        }
        else {
            Ext.Msg.alert('Accept Payment', 'Please enter a valid payment amount.', Ext.emptyFn);
        }*/
    },

    onSelectPayType: function (btn) {

        var payMethodType = btn.config.paymentType;
        if (payMethodType) {
            
            RM.AppMgr.saveServerRec('AcceptPayment', true, { InvoiceId: this.invoiceId, PaymentMethodType: payMethodType, AmountPaid: this.amountPaid },
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

    showMsg: function () {
        var view = this.getAcceptPaymentMsg();
        if (!view) {
            view = { xtype: 'acceptpaymentmsg' };
        }
        RM.ViewMgr.showPanel(view);
    },

    onMsgShow: function () {        
        this.getMsgCont().setHtml('$' + RM.AppMgr.numberWithCommas(Ext.Number.toFixed(this.amountPaid, 2)) + ' accepted.');
    },

    onContinue: function () {
        RM.ViewMgr.backTo('invoicedetail');
    },

    onBack: function () {
        RM.ViewMgr.back();
    }

});