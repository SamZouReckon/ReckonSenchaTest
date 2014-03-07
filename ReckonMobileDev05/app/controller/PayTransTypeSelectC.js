Ext.define('RM.controller.PayTransTypeSelectC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayTransTypeSelect'],
    config: {
        refs: {
            payTransTypeSelect: 'paytranstypeselect',
            payTransTypeSelectTitle: 'paytranstypeselect #title'
        },
        control: {
            'paytranstypeselect #details': {
                tap: 'onDetailsTap'
            },
            'paytranstypeselect #back': {
                tap: 'back'
            },
            'paytranstypeselect #creditcard':{
                tap: 'onCreditCardTap'
            },
            'paytranstypeselect #cash':{
                tap: 'onCashTap'
            },
            'paytranstypeselect #cheque':{
                tap: 'onChequeTap'
            },
            'paytranstypeselect #other':{
                tap: 'onOtherTap'
            }
        }
    },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransTypeSelect();
        if (!view){
            view = { xtype: 'paytranstypeselect' };
        }       
        RM.ViewMgr.showPanel(view);
        this.getPayTransTypeSelectTitle().setHtml('$'+data.Amount);
    },  
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    onCreditCardTap: function(){
        RM.PayMgr.showScreen('PayTransTerminal', this.data);
    },
    
    onCashTap: function(){
        RM.PayMgr.showScreen('PayRecvCash', this.data);
    },
    
    onChequeTap: function(){
        RM.PayMgr.showScreen('PayRecvCheque', this.data);
    },
    
    onOtherTap: function(){
        RM.PayMgr.showScreen('PayRecvManualCard', this.data);
    },
    
    back: function () {
        RM.ViewMgr.back();
    }
});