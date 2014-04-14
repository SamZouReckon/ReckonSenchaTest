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
                    {text: 'Date',  value: 'TransactionDate'}                    
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
                    '<td valign="top" width="50"><img src="resources/images/icons/'+
                    '<tpl if="PaymentMethodId == 1">'+
                        'rm-cash'+                                            
                    '</tpl>'+ 
                    '<tpl if="PaymentMethodId == 2">'+
                        'rm-cheque'+                                            
                    '</tpl>'+ 
                   '<tpl if="PaymentMethodId == 3">'+
                        'rm-credit'+                                            
                    '</tpl>'+
                    '.svg" style= "width: 28px; height: 18px;"></td>' +
                    '<td valign="top" width="200">' +
                    '<div class="rm-orgnametext">{[this.formatCurrency(values)]}</div>' +
                    //'<div class="rm-booknametext rm-mr5">{Description}</div>' +
                    '</td>' +
                    '<td valign="top" width="80"><div class="rm-booknametext rm-alignr">{[this.formatDate(values)]}</div></td>' +
                    '<td>' +
                    '</tr>' +
                    '</table>',
                    {
                        formatCurrency: function(values) {
                            var amountToPay = typeof values == "undefined" ? 0 : parseFloat(values.Amount);
                            return RM.AppMgr.formatCurrency(amountToPay, 0);
                        },
                        formatDate: function(values) {
                            return Ext.Date.format(values.TransactionDate, 'd/m/y');
                        }
                })				
            }
        ] 
    }
});