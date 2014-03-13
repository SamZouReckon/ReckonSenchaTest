Ext.define('RM.controller.PayRecvCashC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvCash',
     config: {
        refs: {
            payRecvCash: 'payrecvcash',
            payRecvCashTitle: 'payrecvcash #title',
            cashFld: 'payrecvcash #cashfld',
            changeFld: 'payrecvcash #changefld'
        },
        control: {
            'payrecvcash #back': {
                tap: 'back'
            },
            'payrecvcash #details': {
                tap: 'onDetailsTap'
            },
            'payrecvcash #cashfld': {
                change: 'onCashFldChange'  
            },
            'payrecvcash #tendercash': {
                tap: 'tenderCash'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvCash();
        if (!view){
            view = { xtype: 'payrecvcash' };
        }       
        RM.ViewMgr.showPanel(view);
        this.getPayRecvCashTitle().setHtml('$'+data.Total);
        this.getCashFld().setValue('');
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    onCashFldChange: function() {
        if(this.getCashFld().getValue()){
           this.validateForm();       
        }
        else{
            this.getChangeFld().setValue('');                      
        }
    },
    
    validateForm: function(){
        var isValid = true;
        
        var cashFldVal = this.getCashFld().getValue();
        var cash = parseFloat(cashFldVal); 
        var total = parseFloat(this.data.Amount);
        var change = cash - total;
        if (Ext.isNumber(cash)) {
            if(change < 0){
                 RM.AppMgr.showErrorMsgBox('Cash received cannot be less than the total amount');   
                 isValid = false;                
            }
            else {
                this.getChangeFld().setValue(change);
            }            
        }
        else if(!cashFldVal){
            RM.AppMgr.showErrorMsgBox('Please enter cash received'); 
            isValid = false;
        }        
        return isValid;
    },
    
    tenderCash: function(){
        //RM.PayMgr.createTransaction(this.data, function(){
            if(this.validateForm()){                
                RM.PayMgr.showScreen('PaySendReceipt', this.data);      
            }            
        //},this);
    },
        
    back: function () {
        RM.ViewMgr.back();
    }    
});