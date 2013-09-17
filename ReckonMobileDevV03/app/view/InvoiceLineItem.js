Ext.define('RM.view.InvoiceLineItem', {
    extend: 'Ext.Panel',
    xtype: 'invoicelineitem',
    requires: ['RM.component.SecureFormPanel', 'RM.component.ExtNumberField', 'Ext.field.Select'],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{					
					itemId: 'back',
					ui: 'rm_topbarbuttonleft',
                    width: '2.6em',
					icon: 'resources/images/icons/rm-back.png'					
				},{
					xtype: 'component',
					html: 'Item details',
					cls: 'rm-topbartitle',
					itemId: 'title'
				},{
					xtype: 'spacer'
				},{
					text: 'ADD',
					itemId: 'add',                    
					ui: 'rm_topbarbuttonright'	
				}
                ]
        },{
			xtype: 'secureformpanel',
            permissionFor: 'Invoices',
			itemId: 'itemForm',
			padding: 0,
            defaults: {clearIcon: false},
			items: [{
					xtype: 'hiddenfield',
					name: 'ProjectID'			
				},{	
                    xtype: 'hiddenfield',
					name: 'ItemId'			
				},{
					xtype: 'hiddenfield',
					name: 'ItemPath'			
				},{
					xtype: 'exttextfield',
					name: 'ProjectName',
					label: 'Project',
					cls: 'rm-flatfield',					
                    placeHolder: 'select (optional)',
                    permissionFor: {action:'Select',name:'Projects'},
				},{
					xtype: 'exttextfield',
					name: 'ItemName',
					label: 'Item',
                    rmmandatory: true,
					cls: 'rm-flatfield',
					placeHolder: 'select'
				},{
					xtype: 'exttextfield',
					name: 'Description',
                    itemId:'descriptionField',
					label: 'Description',
                    labelWidth: 105,
					cls: ['rm-flatfield', 'rm-flatfield-last'],
					placeHolder: 'enter'
				},{
                    xtype: 'panel',
                    itemId: 'detailsFields',
                    defaults: {clearIcon: false},
                    hidden:true,
                    items: [
                    {                        
    					xtype: 'extnumberfield',
    					name: 'UnitPrice',
    					label: 'Item Price',
                        rmmandatory: true,
                        labelWidth: 135,
    					cls: 'rm-flatfield',
    					placeHolder: 'enter'
    				},{
    					xtype: 'extnumberfield',
    					name: 'Quantity',
    					label: 'Quantity',
    					value: 1,
    					cls: 'rm-flatfield'
    				},{
                        xtype: 'exttextfield',
    					name: 'Discount',
    					label: 'Discount',
    					value: 0,
    					cls: ['rm-flatfield']                   
    				},{
    					xtype: 'extnumberfield',
    					name: 'Amount',
    					label: 'Amount',
    					value: 0,
                        readOnly: true,
    					cls: 'rm-flatfield'
    				},{
                        xtype: 'extselectfield',
                        label: 'Tax code',
                        rmmandatory: true,
                        labelWidth: '6em',
    					usePicker: true,
    					name: 'TaxGroupId',
    					store: 'GSTCodes',
    					displayField: 'GSTCode',
    					valueField: 'GSTCodeID',
    					cls: 'rm-flatfield',
                        ui:'plain'
                    },{
    					xtype: 'extnumberfield',
    					name: 'Tax',
    					label: 'Tax',
    					cls: ['rm-flatfield', 'rm-flatfield-last']
    				}]
                }            
			]
		}
        ]
    },
    
    showDetailsFields: function() {
        this.down('#descriptionField').removeCls(['rm-flatfield-last'])
        this.down('#detailsFields').setHidden(false);        
    },
    
    hideDetailsFields: function() {
        this.down('#descriptionField').addCls('rm-flatfield-last')
        this.down('#detailsFields').setHidden(true);        
    }
});