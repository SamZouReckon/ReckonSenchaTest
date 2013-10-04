Ext.define('RM.component.ExtDatePickerField', {
    extend: 'Ext.field.DatePicker',
    xtype: 'extdatepickerfield',
    
    initialize: function () {
        
        this.callParent(arguments);        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        
    },    

    applyValue: function(){
        //console.log(this.getName() + ' ' + value);
        var value = this.callParent(arguments);
        var iconCls = (this.getName() + '-icon').toLowerCase();
        
        if (value) {
            this.removeCls(iconCls);
        }
        else {
            this.addCls(iconCls);
        }
        
        return value;
    },
    
    resetPicker: function(){
        var that = this;
        this.setPicker({
			slotOrder: ['day', 'month',  'year'],
			//useTitles: true,            //Removed titles as per requirement of UX designer
			value: {
				day: new Date().getDate(),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear()
			},
            yearFrom: new Date().getFullYear() - 2,
            yearTo: (new Date().getFullYear()) + 10,
            listeners: {
                show: function(picker){                    
                    if(!this.config.rmmandatory){
                        //add clear button in toolbar
                        this.addClearButton(picker);
                        this.clearButton.setHidden(!that.getValue());
                    }                    
                    RM.ViewMgr.regBackHandler(picker.hide, picker);
                },
                hide: function(){
                    RM.ViewMgr.deRegBackHandler();    
                },
                scope: this
            }
		});        
    },
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    },    
    
    getValue: function(){        
        this.showValidation(true);
        return this.callParent(arguments);      
    },
    
    addClearButton: function(picker) {
        if (this.clearButtonAdded) {
            return;
        }
        var toolbar = picker.getToolbar();        
        var clearButton = {
            xtype: 'button',
            handler: function(button, event) {
                var picker = button.up('datepicker');
                picker.fireEvent('change', picker, null);
                picker.hide();
            },            
            text: 'Clear'
        };        
        this.clearButton = toolbar.add(clearButton);
        this.clearButtonAdded = true;
    }

});