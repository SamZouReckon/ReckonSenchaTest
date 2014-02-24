Ext.define('RM.controller.PayPreferencesC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayPreferences',
    config: {
        refs: {
            payPreferences: 'paypreferences'
        },
        control: {              
            'paypreferences #back': {
                tap: 'back'
            }
        }
     },
    
    showView: function () {
       
        var view = this.getPayPreference();
        if (!view){
            view = { xtype: 'paypreferences' };
        }       
        RM.ViewMgr.showPanel(view);
    },   
        
    back: function () {
        RM.ViewMgr.back();
    }     
});