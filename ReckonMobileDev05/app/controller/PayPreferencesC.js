Ext.define('RM.controller.PayPreferencesC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayPreferences',
    config: {
        refs: {
            payPreferences: 'paypreferences'
        },        
     },
    
    showView: function () {
       
        var view = this.getPayPreference();
        if (!view){
            view = { xtype: 'paypreferences' };
        }       
        RM.ViewMgr.showPanel(view);
    } 
        
       
});