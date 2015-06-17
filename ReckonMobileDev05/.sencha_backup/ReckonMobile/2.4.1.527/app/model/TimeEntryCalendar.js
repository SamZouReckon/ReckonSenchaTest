Ext.define('RM.model.TimeEntryCalendar', {
    extend: 'Ext.data.Model',	
    config: {
        fields: [{name:'Start', type:'date', dateFormat: 'c'}, {name:'End', type:'date', dateFormat: 'c'}]
    }
});	