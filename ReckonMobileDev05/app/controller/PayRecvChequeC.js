Ext.define('RM.controller.PayRecvChequeC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayRecvCheque',
     config: {
        refs: {
            payRecvCheque: 'payrecvcheque',
            payRecvChequeTitle: 'payrecvcheque #title',
            payRecvChequeForm: 'payrecvcheque #payrecvchequeform',
            drawerFld: 'payrecvcheque textfield[name=Drawer]',
            dateFld : 'payrecvcheque textfield[name=Date]'
        },
        control: {
            'payrecvcheque #back': {
                tap: 'back'
            },
            'payrecvcheque #details': {
                tap: 'onDetailsTap'
            },
            'payrecvcheque #charge': {
                tap: 'charge'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayRecvCheque();
        if (!view){
            view = { xtype: 'payrecvcheque' };
        }       
        RM.ViewMgr.showPanel(view);
        this.getPayRecvChequeTitle().setHtml('$'+data.Total);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    charge: function(){
       var vals = this.getPayRecvChequeForm().getValues(); 
       //RM.PayMgr.createTransaction(this.data, function(){
        if(this.validateForm(vals))
            RM.PayMgr.showScreen('PaySendReceipt', this.data);  
        //},this);   
    },
    
    validateForm: function(vals){        
        var isValid = true;
        
        if( !vals.Drawer){
            //RM.AppMgr.showErrorMsgBox('Drawer cananot be blank');
            this.getDrawerFld().showValidation(false);
            isValid = false;
        }       
        
        if( vals.Date === undefined || vals.Date === null || vals.Date === ''){
            //RM.AppMgr.showErrorMsgBox('Please enter a date for transaction');
            this.getDateFld().showValidation(false);
            isValid = false;
        }
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
    },
    
    back: function () {
        RM.ViewMgr.back();
    }    
});