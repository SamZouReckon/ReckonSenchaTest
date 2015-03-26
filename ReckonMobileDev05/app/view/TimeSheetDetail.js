Ext.define('RM.view.TimeSheetDetail', {
	extend: 'RM.component.SecurePanel',
	xtype: 'timesheetdetail',
	requires: ['RM.component.RMCheckbox','RM.component.DurationField', 'RM.component.ExtDatePickerField'],
	config: {		
	    cls: 'rm-whitebg',
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
						html: '',
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
				cls: 'rm-whitebg',
				padding: 0,
				items: [
					{
						xtype: 'hiddenfield',
						name: 'TimeEntryId'
					}, {
						xtype: 'hiddenfield',
						name: 'CustomerId'
					}, {
					    xtype: 'durationfield',
					    name: 'Duration',
					    itemId: 'duration',
					    clearIcon: false,
					    cls: ['rm-flatfield', 'rm-timerfield'],
					    placeHolder: '00:00',                        
                        maxHours: 23
					}, {
					    xtype: 'extdatepickerfield',
					    name: 'Date',
					    label: 'Date',
					    dateFormat: 'jS M Y',
					    cls: 'rm-flatfield',
					    ui: 'plain',
					    placeHolder: 'select'
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
					}, {
                        xtype: 'rmtogglefield',
                        name: 'Billable',
                        onText: 'Yes',
                        offText: 'No',
                        toggleState: false,
						label: 'Billable',                        
                        labelWidth: '10em',                 
                    }, {
                        xtype: 'exttextfield',
                        name: 'Notes',
                        label: 'Notes',
                        itemId: 'description',
                        labelWidth: 110,
                        cls: 'rm-flatfield rm-flatfield-last',
                        clearIcon: false,
                        placeHolder: 'enter (optional)',
                        readOnly: true
                    }
                
				]
			}
		]
	}
});