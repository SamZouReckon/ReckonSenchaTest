Ext.define('RM.model.BudgetLineItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['AcctCatName', {name:'Forecast', type:'float'}, {name:'Actual', type:'float'}]
    }
});
