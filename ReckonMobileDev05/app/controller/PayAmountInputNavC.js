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
    
    showView: function(data, cb, cbs){               
        this.getPayAmountInputCalcPanel().loadData(data, cb, cbs);
        this.getToolbarTitle().setHtml('Joe Plumber');
    },
    
    onDetails: function(){
        this.getPayAmountInputCalcPanel().onDetails();
    }
    
});