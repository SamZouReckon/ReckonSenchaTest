Ext.define('RM.view.InvoiceDetail', {
    extend: 'Ext.Panel',
    xtype: 'invoicedetail',
	requires: ['RM.component.InvoiceLineItems', 'RM.component.ExtTextField', 'RM.component.ExtSelectField', 'Ext.field.Hidden', 'RM.component.ExtDatePickerField'],
    config: {
        
        layout: 'fit',
        
        items: [{
            xtype: 'toolbar',			
            docked: 'top',
            items: [{
					ui: 'rm_topbarbuttonleft',
					iconCls: 'rm-back',
					iconMask: 'true',
					itemId: 'back'				
				},{
					xtype: 'component',
					html: 'Invoice Detail',
					itemId: 'title',
                    cls: 'rm-topbartitle'
				},{
					xtype: 'spacer'
				},{
					//text: 'O',
					itemId: 'options',	
					iconCls: 'rm-settings',
					iconMask: 'true',
					ui: 'rm_topbarbuttonright',
                    width: '2.6em'
				},{
					text: 'SAVE',
					itemId: 'save',                    
					ui: 'rm_topbarbuttonright'                    
				}
                ]
        },{
            xtype: 'formpanel',
			itemId: 'invoiceForm',
			padding: 0,             
			items: [{
                    xtype: 'component',
                    itemId: 'invoiceStatus',
                    cls: 'rm-hearderbg'
                },{
					xtype: 'hiddenfield',
					name: 'InvoiceId'			
				},{
					xtype: 'hiddenfield',
					name: 'CustomerId'			
				},{
					xtype: 'exttextfield',
					name: 'CustomerName',
					label: 'Customer',
                    placeHolder: 'select',
					cls: 'rm-flatfield',
                    readOnly: true,
                    clearIcon: false,
                    labelWidth: '6em',
                    rmmandatory: true
				},{
					xtype: 'extdatepickerfield',
					name : 'DueDate',
					dateFormat : 'jS M Y',
					placeHolder: 'select',
					label : 'Due Date',
                    cls: 'rm-flatfield ',
                    labelWidth: '5em',
                    ui : 'plain'
                    
				},{
					xtype: 'extdatepickerfield',
					name : 'Date',
					dateFormat : 'jS M Y',        //'D, d F Y',
					placeHolder: 'select',
					label : 'Date',
                    cls: 'rm-flatfield',
                    ui : 'plain',
                    rmmandatory: true
				},{
					xtype: 'exttextfield',
					name: 'InvCode',
                    readOnly: true,
					labelWidth: 135,
					label: 'Invoice number',
					cls: 'rm-flatfield',
                    clearIcon: false,
                    placeHolder: 'Auto-generated',
                    labelWidth: '7.5em'
				},{
					xtype: 'exttextfield',
					name: 'Ref',
					labelWidth: 160,
					label: 'Reference',
					placeHolder: 'enter',
					cls: 'rm-flatfield',
                    clearIcon: false,
                    labelWidth: '8.5em'
				},{
					xtype: 'extselectfield',
					label: 'Amounts',
					usePicker: true,
					name: 'AmountTaxStatus',
					store: 'TaxStatuses',
					displayField: 'Name',
					valueField: 'TaxStatusID',
                    autoSelect: false,
                    value: null,
                    placeHolder: 'select',
					cls: 'rm-flatfield',
                    ui: 'plain',
                    rmmandatory: true
				},{
				    xtype: 'exttextfield',
					name: 'Discount',
                    readOnly: true,
					label: 'Discount',
					cls: 'rm-flatfield',
                    clearIcon: false,
                    labelWidth: '6em'
                    
				},{
					xtype: 'exttextfield',
					name: 'Notes',
					label: 'Notes',
                    labelWidth: 110,
					placeHolder: 'enter (optional)',
					cls: 'rm-flatfield',
                    clearIcon: false,
                    readOnly: true,
                    border: '1 0 1 0',
                    style: 'border-color: #DBDBDB; border-style: solid;'							
				},{
					xtype: 'invoicelineitems',
					padding: 5
				}
			]
        }
        ]
    },
    
	initialize: function() {        

		this.callParent(arguments);
        
        
		this.add({
            xtype : 'container',
            docked:'bottom',
			padding: '2 0 0 0',            
            draggable:{
                direction:'vertical',
                initialOffset: {
                    x: 0, 
                    y: 0 
                },
                constraint: {
                    min: {
                        x: 0, 
                        y: 0
                    },
                    max: {
                        x: 0, 
                        y: 132
                    }
                },
                listeners: {                   
                    dragend: function( draggable, evt, offsetX, offsetY, eOpts ) {                        
                        if(offsetY > 60) {   
                            this.collapseOptions();
                            draggable.setInitialOffset({
                                x: 0, 
                                y: 0
                            })
                        }
                        else {
                            draggable.setInitialOffset({
                                x: 0, 
                                y: 0
                            })
                            this.expandOptions();
                        }                                              
                    },
                    scope: this
                }
            },
            id : 'invSwipePanelId',
            cls : 'rm-swipecontainer',
			defaults:{
				cls: 'rm-swipecontainer'
			},
            items : [
				{
					xtype : 'component',					
					//cls : 'tipBG',
					//id: 'swipeTip',
					html: '<div style="margin: 8px;"></div><div align="center" class="rm-swipebar"></div><div align="center" class="rm-swipebar"></div><div align="center" class="rm-swipebar"></div>'
					
				},
				{
					xtype : 'panel',
					layout: 'hbox',
					items:[
							{
								xtype: 'component',
								html: 'BALANCE DUE',
                                padding: '0 10 10 10'
							},
							{xtype:'spacer'},
							{
								xtype: 'component',
                                itemId: 'balanceDue',
                                padding: '0 10 10 10'
							}
					]
				},{
					xtype: 'button',
					text: 'Breakdown of balance',
					itemId: 'balBreakdown',					
					ui:'rm_btnaslistrow'
					
				},{
					xtype: 'button',
					text: 'Invoice actions',
					itemId: 'invActions',				
					ui: 'rm_btnaslistrow'
				}
            ],
            listeners: {
                painted: function() {         
                    this.collapseOptions();
                },
                scope: this
            }
        });
        
	},    
    
    getOptionsPanelEle: function(){
        return  document.getElementById('invSwipePanelId');
    },
    
    expandOptions: function(){
        this.getOptionsPanelEle().style.height = (this.actionsHidden ? '100px' : '148px');        
    },
    
    collapseOptions: function(){
        this.getOptionsPanelEle().style.height = '48px';
    },
    
    isOptionsCollapsed: function(){
        return (this.getOptionsPanelEle().style.height == '48px');
    },
	
    setActionsHidden: function(hidden){
        this.actionsHidden = hidden;
        this.down('#invActions').setHidden(hidden);
    },
    
	toggleOptions: function(){
        if(this.isOptionsCollapsed()){            
            this.expandOptions();
        }
        else{
            this.collapseOptions();
        }
	}
});
