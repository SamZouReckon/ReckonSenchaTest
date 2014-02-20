Ext.define('RM.view.PaySalesHistory', {
    extend: 'Ext.Panel',
    xtype: 'paysaleshistory',
    requires: 'RM.component.RMList',
    config: {
        layout: 'fit',
        items:[
            {
                xtype: 'toolbar',                
                docked: 'top',
                items: [
                    {
                        xtype: 'component',
                        html: 'Sales History',
                        cls: 'rm-topbartitle',
                    }
                ]
            },{
                xtype: 'sortsearchbar',				
                docked: 'top',
                sortfields: [
                    {text: 'Date',  value: 'TransactionDate'},
                    {text: 'Payer Name', value: 'PayerName'}
                ]
            },{
                xtype: 'rmlist',
                store: 'Transactions',
                loadingText: null,  
                emptyText: 'No transactions found.',
                grouped: true,				
                itemTpl: new Ext.XTemplate(
                    '<table width="100%">' +
                    '<tr>' +
                    '<td valign="top" width="30"><div class="rm-list-readonly"></div></td>' +
                    '<td>' +
                    '<div class="rm-orgnametext rm-pt5">{[this.formatCurrency(values)]}</div>' +
                    '<div class="rm-booknametext rm-mr5">{Description}</div>' +
                    '</td>' +
                    '<td valign="top"><div class="rm-list-readonly">{TransactionDate}</div></td>' +
                    '<td>' +
                    '</tr>' +
                    '</table>',
                    {
                    formatCurrency: function(values) {
                        var amountToPay = typeof values == "undefined" ? 0 : parseFloat(values.Amount);
                        return RM.AppMgr.formatCurrency(amountToPay, 0);
                    }
                })				
            }
        ] 
    }
});