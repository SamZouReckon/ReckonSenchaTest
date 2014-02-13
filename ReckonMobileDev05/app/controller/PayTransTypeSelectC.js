Ext.define('RM.controller.PayTransTypeSelectC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayTransTypeSelect'],
    config: {
        refs: {
            
        },
        control: {
            'paytranstypeselect #details': {
                tap: 'onDetailsTap'
            },
            'pattranstypeselect #back': {
                tap: 'back'
            }
        }
    },
    
    onDetailsTap: function(){
        alert('Details');
    },
    
    back: function () {
        RM.ViewMgr.back();
    }

});