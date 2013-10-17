Ext.define('RM.view.ExpenseDetail', {
	extend: 'RM.component.SecurePanel',
	xtype: 'expensedetail',
    requires: ['RM.component.DataEntryKeypad','RM.component.RMAmountField'],
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
						icon: 'resources/images/icons/rm-back.svg',
                        iconCls: 'rm-backbtniconcls',
                        width: '2.6em'
						
					},{
						xtype: 'component',
						html: 'Expense Detail',
						cls: 'rm-topbartitle',
						itemId: 'title'
					},{
						xtype: 'spacer'
					},{
						text: 'SAVE',
						itemId: 'save',	                        
						ui: 'rm_topbarbuttonright'	
					}
				]
			},{
				xtype: 'container',
				layout: 'vbox',
                
				items: [
					{		
					
						xtype: 'button',
						text: 'Photograph the receipt',
						cls: 'rm-actionbtn rm-arrowimgbtn',						
						icon: 'resources/images/icons/rm-photo.svg',
                        iconCls: 'rm-btniconsize',
						iconAlign: 'left',
						itemId: 'photo'
					},{
						xtype: 'secureformpanel',
						itemId: 'expenseForm',
						flex: 1,
						padding: 0,
                        
						items: [
							{
								xtype: 'hiddenfield',
								name: 'ExpenseId'			
							},{
								xtype: 'hiddenfield',
								name: 'CustomerId'			
							},{
								xtype: 'exttextfield',
								name: 'CustomerName',
								label: 'Customer',
								clearIcon: false,
								cls: 'rm-flatfield',
								placeHolder: 'select (optional)',
								readOnly: true
							},{
								xtype: 'hiddenfield',
								name: 'ProjectId'			
							},{
								xtype: 'exttextfield',
								name: 'ProjectName',
								label: 'Project',
								cls: 'rm-flatfield',								
								placeHolder: 'select (optional)',
								readOnly: true
							},{
								xtype: 'extdatepickerfield',
								name : 'Date',
								label : 'Date',
                                rmmandatory: true,
								dateFormat : 'jS M Y',
								cls: 'Date-icon rm-flatfield',
								ui: 'plain',
								placeHolder: 'select'
                                
							},{
                                xtype: 'rmamountfield',                                   
								name: 'Amount',
								label: 'Amount',                                
                                rmmandatory: true,                                                                
								cls: 'rm-flatfield rm-cursor-blinkbg',                                    
								placeHolder: 'enter',
								clearIcon: false,   
                                decimalPlaces: 2,
                                prefix: '$'                                
							},{
								xtype: 'hiddenfield',
								name: 'ItemId'			
							},{
								xtype: 'exttextfield',
								name: 'ItemName',
								label: 'Item',
                                rmmandatory: true,
								cls: 'rm-flatfield',
								placeHolder: 'select',
								readOnly: true
							},{
								xtype: 'hiddenfield',
								name: 'SupplierId'			
							},{
								xtype: 'exttextfield',
								name: 'SupplierName',
                                rmmandatory: true,
								label: 'Supplier',
								cls: 'rm-flatfield',
								placeHolder: 'select',
								readOnly: true
							},{
								xtype: 'exttextfield',
								name: 'Notes',
								label: 'Description',
                                itemId: 'description',
                                labelWidth: 110,
								placeHolder: 'enter (optional)',
								cls: 'rm-flatfield',
                                readOnly: true							
							},{
								xtype: 'exttextfield',
								label: 'History',
								itemId: 'history',
								cls: 'rm-flatfield',
								clearIcon: false,
								placeHolder: 'view',
								readOnly: true,                                
							},{
								xtype: 'rmtogglefield',
								name: 'Billable',
								onText: 'Yes',
								offText: 'No',
								toggleState: false,
								label: 'Billable to customer',                        
								labelWidth: '10em',                        
								border: '1 0 1 0',
								style: 'border-color: #DBDBDB; border-style: solid;'
							}/*,{
								xtype: 'rmcheckbox',
								name: 'Billable',
								text: 'This expense is billable to customer',
								labelCls: 'rm-checkbox-smalltext',								
								cls: 'rm-checkbox-rightalign',						
								border: '1 0 0 0',
								style: 'border-color: #DBDBDB; border-style: solid;'
							}*/
						]
					}
			
				]
			}
		]
	}
});