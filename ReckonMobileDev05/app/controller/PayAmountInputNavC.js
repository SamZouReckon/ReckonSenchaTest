Ext.define('RM.controller.PayAmountInputNavC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayAmountInputNav'],
    config: {
         refs: {  
            payAmountInputCalcPanel: 'payamountinputnav #payamountinputcalcpanel',           
            toolbarTitle: 'payamountinputnav #toolbarTitle',    
        }        
    },
    
    showView: function(data, cb, cbs){               
        this.getPayAmountInputCalcPanel().loadData(data, cb, cbs);
        this.getToolbarTitle().setHtml('Joe Plumber');
    }    
    
});