Ext.define('RM.view.TimeSheetDetail', {
	extend: 'RM.component.SecurePanel',
	xtype: 'timesheetdetail',
	requires: ['RM.component.RMCheckbox','RM.component.DurationField', 'RM.component.ExtDatePickerField'],
	config: {
		
        style: 'background: #FFF',
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
					}, {
						xtype: 'component',
						html: 'Time Sheet Detail',
						itemId: 'title',
						cls: 'rm-topbartitle'
					}, {
						xtype: 'spacer'
					}, {
						text: 'Save',
						itemId: 'save',                        
						ui: 'rm_topbarbuttonright'
					}
				]
			}, {
				xtype: 'secureformpanel',
				itemId: 'timeSheetForm',
                style: 'background: #FFF',
				padding: 0,
				items: [
					{
						xtype: 'hiddenfield',
						name: 'TimeEntryId'
					}, {
						xtype: 'hiddenfield',
						name: 'CustomerId'
					}, {
						xtype: 'exttextfield',
						name: 'CustomerName',
						cls: 'rm-flatfield',
						label: 'Customer',
						clearIcon: false,
						readOnly: true,
                        placeHolder: 'select (optional)'
					}, {
						xtype: 'hiddenfield',
						name: 'ProjectId'
					}, {
						xtype: 'exttextfield',
						name: 'ProjectName',
						label: 'Project',
						cls: 'rm-flatfield',						
						readOnly: true,
                        placeHolder: 'select (optional)'
					}, {
						xtype: 'extdatepickerfield',
						name: 'Date',
						label: 'Date',
						dateFormat : 'jS M Y',
						cls: 'rm-flatfield',
						ui: 'plain',
						placeHolder: 'select'
					}, {
						xtype: 'hiddenfield',
						name: 'ItemId'
					}, {
						xtype: 'exttextfield',
						name: 'ItemName',
						label: 'Item',
                        itemId: 'itemName',
						cls: 'rm-flatfield',
						placeHolder: 'select',
                        rmmandatory: true,
						readOnly: true
					},/*{
                        xtype: 'selectfield',
                        label: 'Tax code',
                        labelWidth: '6em',
    					usePicker: true,
    					name: 'SaleTaxCodeId',
    					store: 'GSTCodes',
    					displayField: 'GSTCode',
    					valueField: 'GSTCodeId',
    					cls: 'rm-flatfield',
                        ui:'plain'
                    },*/ {
						xtype: 'durationfield',
						name: 'Duration',
                        itemId: 'duration',
						label: 'Duration <span style="color: #F00">*</span>',
                        labelWidth: '8em',
						cls: 'rm-flatfield',                
						placeHolder: 'select',
                        
					},{
						xtype: 'exttextfield',
						name: 'Notes',
						label: 'Description',
                        itemId: 'description',
                        labelWidth: 110,
						cls: 'rm-flatfield',
						clearIcon: false,
						placeHolder: 'enter (optional)',
                        readOnly: true
					},{
						xtype: 'exttextfield',
						label: 'History',
                        itemId: 'history',
						cls: 'rm-flatfield',
						clearIcon: false,
						placeHolder: 'view',
                        readOnly: true
                        
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
					}/*, {
						xtype: 'rmcheckbox',
						name: 'Billable',
						text: 'This time is billable to the customer',  
                        labelCls: 'rm-checkbox-smalltext',
                        cls: 'rm-checkbox-rightalign',						
                        border: '1 0 0 0',
                        style: 'border-color: #DBDBDB; border-style: solid;'
					}*/
                
				]
			}
		]
	}
});