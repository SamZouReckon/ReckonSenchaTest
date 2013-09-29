Ext.define('RM.controller.AppStopC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AppStop'],

    config: {
        refs: {
            appStop: 'appstop'
        },
        control: {
            'appstop': {
                show: 'onShow'
            }
        }

    },

    showView: function (errCode, errMsg) {
        this.errMsg = errMsg;
        RM.ViewMgr.showPanel2({xtype:'appstop'});
    },
    
    onShow: function(){
        this.getAppStop().add({xtype:'component', padding: 10, html: this.errMsg});
        
    }

});