Ext.define('RM.view.CreateItem', {
	extend: 'Ext.Panel',
	xtype: 'createitem',
    requires: 'RM.component.RMToggleField',
	config: {
		layout: 'fit',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [
					{
						itemId: 'back',
						ui: 'rm_topbarbuttonleft',
						width: '2.6em',
						iconCls: 'rm-back',
						iconMask: 'true'
					}, {
						xtype: 'component',
						itemId: 'title',
						html: 'Create a new item',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
						text: 'SAVE',
						itemId: 'save',                        
						ui: 'rm_topbarbuttonright'
					}
				]
			},{
				xtype: 'formpanel',			
				flex: 1,
				padding: 0,
				defaults: {xtype: 'textfield', cls: 'rm-flatfield', clearIcon: false},
				items: [
					{
						xtype: 'selectfield',
						label: 'Item type',
						usePicker: true,
						name: 'ItemType',
						store: 'ItemTypes',
						displayField: 'Name',
						valueField: 'ItemType',
                        rmmandatory: true,
						ui:'plain',
                        placeHolder: 'select'
					},{
						label: 'Item name',
                        rmmandatory: true,
                        name: 'Name',
                        placeHolder: 'enter',
                        value: ''
					},{
                        xtype: 'rmtogglefield',                        
                        onText: 'Active',
                        offText: 'Inactive',
						label: 'Item state',
                        name: 'ActiveStatus',
                        toggleState: true                     
					},{
                        xtype: 'rmtogglefield',
                        onText: 'Include',
                        offText: 'Exclude',
						label: 'Amounts include tax',
                        name: 'TaxInclusive',
                        labelWidth: '10em',                        
                        toggleState: false
					},{
						xtype: 'component',						
						html: '<h3 class="rm-m-1 rm-hearderbg">ITEM WILL BE SOLD FOR</h3>'                        
					},{
                        xtype: 'numberfield',
						label: 'Price',
                        name: 'SalePrice',
                        placeHolder: 'enter',
                        value: '',
                        border: '0 0 0 0'                        
					},{
						xtype: 'selectfield',
						label: 'Accounting category',
                        labelWidth: '10em',
						usePicker: true,
						name: 'SaleCategoryID',
						store: 'AccountingCategories',
						displayField: 'Name',
						valueField: 'AccountingCategoryID',
                        autoSelect: false,
                        rmmandatory: true,
                        value: null,                        
						ui:'plain',
                        placeHolder: 'select'
					},{
						xtype: 'selectfield',
						label: 'Tax code',
						usePicker: true,
						name: 'SaleTaxCodeID',
						store: 'GSTCodes',
						displayField: 'GSTCode',
						valueField: 'GSTCodeID',
                        autoSelect: false,
                        rmmandatory: true,
                        value: null,                         
						ui:'plain',
                        placeHolder: 'select',
                        border: '1 0 1 0',
                        style: 'border-color: #DBDBDB; border-style: solid;'
					}  
				]
			}
		]
	}
});