Ext.define('RM.controller.MainC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.core.AppMgr'],	

    init: function () {
        RM.AppMgr = RM.core.AppMgr;
        RM.AppMgr.init(this.getApplication());
    }

});