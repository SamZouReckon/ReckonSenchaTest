Ext.define('RM.controller.AppStopC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AppStop'],

    config: {
        refs: {
            appStop: 'appstop'
        },
        control: {            
            'appstop #update':{
                tap: 'onUpdate'
            }
        }
    },

    showView: function (errCode, errMsg) {
        this.errMsg = errMsg;
        RM.ViewMgr.showPanel2({xtype:'appstop'});
    },    
    
    onUpdate: function() {         
        if (Ext.os.is.Android) {
            //window.open("market://details?id=com.google.android.apps.maps","_system");
            window.open(RM.HomeSettingsMgr.getSetting('AndroidUpgradeUrl'),'_system');
        }
        if(Ext.os.is.iOS){
            //window.open("itms://itunes.apple.com/app/google-maps/id585027354");
            window.open(RM.HomeSettingsMgr.getSetting('iOSUpgradeUrl'));            
        }
    }
});