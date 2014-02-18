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
    
    showView: function (data, cb, cbs) {
        this.data = data;
        this.selectCb = cb;
        this.selectCbs = cbs;

        var view = this.getPayTransTypeSelect();
        if (!view){
            view = { xtype: 'paytranstypeselect' };
        }
        
        //RM.ViewMgr.clearBackStack();
        RM.ViewMgr.showPanel(view);

    },  
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    back: function () {
        RM.ViewMgr.back();
    }

});