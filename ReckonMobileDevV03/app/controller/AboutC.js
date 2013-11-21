Ext.define('RM.controller.AboutC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.About'],
    config: {
        refs: {
            about: 'about',
            version: 'about #version',
            apiVersion: 'about #apiVersion'
        },
        control: {
            about: { show: 'onShow'}
        }
    },
	
	showView: function(){

		var view = this.getAbout();
		if(!view){
			view = {xtype:'about'};
        }
		RM.ViewMgr.showPanel(view);		
		
	},
    
    onShow: function() {
        var that = this;
        try {
            cordova.AppVersion.getAppVersion(function (version) {
                that.getVersion().setHtml('Version:' + version);
            });
        }
        catch(e) {
            this.getVersion().setHtml('Failed to read version info.');
        }
        
        this.getApiVersion().setHtml('Api Version: ' + RM.HomeSettingsMgr.getSetting('ApiVersion'));
    }

});