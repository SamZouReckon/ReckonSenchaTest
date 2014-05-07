Ext.define('RM.controller.PayAmountInputNavC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayAmountInputNav'],
    config: {
         refs: {  
            payAmountInputCalcPanel: 'payamountinputnav #payamountinputcalcpanel',           
            toolbarTitle: 'payamountinputnav #toolbarTitle',    
        },
        control: {
            'payamountinputnav #details': {
                tap: 'onDetails'
            }
        }
    },
    
    showView: function(data){ 
        var me = this;
        this.getPayAmountInputCalcPanel().loadData(data, function(){
            me.clearFields();
            RM.ViewMgr.backTo('slidenavigationview');
        }, this);
        this.getToolbarTitle().setHtml('Joe Plumber');
    },
    
    clearFields: function(){
        this.getPayAmountInputCalcPanel().clearInputFieldAndHistory();
        this.getPayAmountInputCalcPanel().getDiscount().setValue('None'); 
   	 this.getPayAmountInputCalcPanel().getDescriptionFld().setValue('');
    },
    
    onDetails: function(){
        this.getPayAmountInputCalcPanel().onDetails();
    }
    
});