Ext.define('RM.controller.AboutC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.About'],
    config: {
        refs: {
            about: 'about'
        }
    },
	
	showView: function(){

		var view = this.getAbout();
		if(!view){
			view = {xtype:'about'};
        }
		RM.ViewMgr.showPanel(view);		
		
	}

});