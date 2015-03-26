Ext.define('RM.view.TimeSheetWeekly', {
    extend: 'RM.component.SecurePanel',
    xtype: 'timesheetweekly',
    requires: ['RM.component.RMCheckbox', 'RM.component.DurationField', 'RM.component.ExtDatePickerField', 'RM.component.TimeEntryDayRow'],
    config: {        
        layout: 'vbox',
        cls: 'rm-whitebg',
        scrollable : {
            direction     : 'vertical',
            directionLock : true
        },
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
					    html: 'Add entry',
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
			    scrollable: null,
			    itemId: 'timeSheetForm',                
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
					    labelWidth: '10em'
					}
			    ]
			}
        ]
    }
});