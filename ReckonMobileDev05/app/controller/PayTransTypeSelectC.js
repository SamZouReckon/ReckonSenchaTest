Ext.define('RM.controller.PayTransTypeSelectC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayTransTypeSelect'],
    config: {
        refs: {
            payTransTypeSelect: 'paytranstypeselect'
        },
        control: {
            'paytranstypeselect #details': {
                tap: 'onDetailsTap'
            },
            'paytranstypeselect #back': {
                tap: 'back'
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
    },  
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    back: function () {
        RM.ViewMgr.back();
    }
});