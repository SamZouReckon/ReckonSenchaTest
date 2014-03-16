Ext.define('RM.controller.PayRecvManualCardC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvManualCard',
     config: {
        refs: {
            payRecvManualCard: 'payrecvmanualcard',
            payRecvManualCardTitle: 'payrecvmanualcard #title',
            payRecvManualCardForm: 'payrecvmanualcard #payrecvmanualcardform',
            cardTypeFld: 'payrecvmanualcard textfield[name=CardType]',
            dateFld: 'payrecvmanualcard textfield[name=Date]'
        },
        control: {
            'payrecvmanualcard #back': {
                tap: 'back'
            },
            'payrecvmanualcard #details': {
                tap: 'onDetailsTap'
            },
            'payrecvmanualcard #recordtransaction': {
                tap: 'recordTransaction'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvManualCard();
        if (!view){
            view = { xtype: 'payrecvmanualcard' };
        }       
        RM.ViewMgr.showPanel(view);
        this.getPayRecvManualCardTitle().setHtml('$'+data.Total);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    recordTransaction: function() {
        
        var vals = this.getPayRecvManualCardForm().getValues();
        
        this.data.PaymentMethodId = 3;
        
        if(this.validateForm(vals)){
        	RM.PayMgr.createTransaction(this.data, function(){
            
                RM.PayMgr.showScreen('PaySendReceipt', this.data);      
            },this);            
        }
    },
    
    back: function () {
        RM.ViewMgr.back();
    },   
    
    validateForm: function(vals){        
        var isValid = true;
        
        if( vals.CardType === undefined || vals.CardType === null || vals.CardType === ''){
            //RM.AppMgr.showErrorMsgBox('Please choose credit card type');
            this.getCardTypeFld().showValidation(false);
            isValid = false;
        }       
        
        if( vals.Date === undefined || vals.Date === ''){
            //RM.AppMgr.showErrorMsgBox('Please enter a date for transaction');
            this.getDateFld().showValidation(false);
            isValid = false;
        } 
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
    }
});