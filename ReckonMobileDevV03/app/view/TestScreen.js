Ext.define('RM.view.TestScreen', {
	extend: 'Ext.Panel',
    requires: ['RM.component.RMAmountField2','RM.component.RMAmountField','RM.component.RMPhoneField2','RM.component.RMPhoneField3'],
	xtype: 'testscreen',
    
	config: {		
		layout: 'fit',        
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
                    {
						xtype: 'component',						
						cls: 'rm-topbartitle',
						html: 'Test Screen'
					},{
						xtype: 'spacer'
					},{
                        xtype: 'button',
						text: 'SAVE',
						itemId: 'save',	                        
						ui: 'rm_topbarbuttonright'
					}
				]
			},{
             xtype: 'formpanel',
             itemId: 'testScreenForm',
             defaults: {cls: 'rm-flatfield', clearIcon: false},
             items: [{
                     xtype:'textfield',
                     label: 'Test1',
                     name: 'Test1'
                 
                 },{
                     xtype:'textfield',
                     label: 'Test2',
                     name: 'Test2',
                     placeHolder: 'enter'
                 
                 },{
                     xtype:'textfield',
                     label: 'Test3',
                     name: 'Test3'
                 
                 },{
                     xtype:'rmamountfield',
                     label: 'Quantity',
                     name: 'Quantity',
                     labelWidth: 120,
                     rmmandatory: true,
                     readOnly: false,                     
                     decimalPlaces: 4,                     
                     currencyMode:false,
                     listeners: {
                         change: function(fld, newValue, oldValue){
                             console.log('rmamountfield2 change newValue=' + newValue + ', oldValue=' + oldValue);                             
                         }
                         
                     }
                 },{
                     xtype:'rmamountfield',
                     label: 'Item Price',
                     clearIcon: true,
                     name: 'ItemPrice',
                     labelWidth: 120,
                     placeHolder: 'enter',                     
                     rmmandatory: true,
                     readOnly: false,
                     decimalPlaces: 8,
                     listeners: {
                         change: function(fld, newValue, oldValue){
                             console.log('rmamountfield2 change newValue=' + newValue + ', oldValue=' + oldValue);                             
                         }
                         
                     }
                 },{
                     xtype:'textfield',
                     label: 'Test5',
                     name: 'Test5'
                 
                 },{
                     xtype:'rmphonefield2',
                     label: 'Bus Phone',
                     labelWidth: 120,
                     //value: '09272387878',
                     name: 'BusPhone',
                     placeHolder: 'enter',
                     rmmandatory: true,
                     readOnly: false,
                     listeners: {
                         change: function(fld, newValue, oldValue){
                             console.log('rmphonefield change newValue=' + newValue + ', oldValue=' + oldValue);                             
                         }
                         
                     }
                 },{
                     xtype:'textfield',
                     label: 'Test6',
                     name: 'Test6'
                 
                 }]
        }        
		]
	}
});