Ext.define('RM.component.ExtDatePickerField', {
    extend: 'Ext.field.DatePicker',
    xtype: 'extdatepickerfield',
    
    initialize: function () {
        
        this.callParent(arguments);        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }        
    },    

    onClearIconTap: function() {        
        this.callParent(arguments); 
        
        // This is a workaround for the DatePicker>Select>TextInput>Input default behaviour of (for android) focusing in on the field
        // immediately after clearing it, which is undesirable for this control.
        if(Ext.os.is.Android) {
            var me = this;
            me.clearing = true;
            setTimeout(function() { 
                me.clearing = false; 
                me.blur();
            }, 50);
        }
    },
    
    onFocus: function() {
        if(!this.clearing) {            
            this.callParent(arguments);
            
            /* Parked for now, workaround to delay the picker display if another input element is in focus because of the slow keyboard dismissal on android in Sencha 2.3
            var inputActive = document.activeElement && (document.activeElement.nodeName || '').toLowerCase() === 'input';           
            if(Ext.os.is.Android && !this.focusDelayed && inputActive) {
                this.focusDelayed = true;
                var that = this;
                var args = arguments;
                setTimeout(function() {
                    that.onFocus.apply(that, args);
                    that.focusDelayed = false;
                }, 600);
            }
            else {
                this.callParent(arguments);
            }
            */            
        }
    },
    
    applyValue: function(){
        var value = this.callParent(arguments);
        var iconCls = (this.getName() + '-icon').toLowerCase();
        
        if (value) {
            this.removeCls(iconCls);
        }
        else {
            this.addCls(iconCls);
        }
        
        //Ext.field.DatePicker updateValue() method does not have calls to show clear icon, so took code from Ext.field.Text updateValue() method
        this[value ? 'showClearIcon' : 'hideClearIcon']();
        
        return value;
    },
    
    //showClearIcon() in  Ext.field.Text will not show clear icon if value is null so added here and allowed null to showClearIcon
    showClearIcon: function() {
        var me = this;
        if (me.getClearIcon() && !me.getDisabled() && !me.getReadOnly() ) {
            me.element.addCls(Ext.baseCSSPrefix + 'field-clearable');
        }

        return me;
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
    
    updateValue: function(newValue) {
        this.callParent(arguments);
        if(newValue == null){
            this.resetPicker(); //show picker next time starting with today's date
        }
        //this[valueValid && this.isDirty() ? 'showClearIcon' : 'hideClearIcon']();
        //this.syncEmptyCls();
        //this[this.isDirty() ? 'showClearIcon' : 'hideClearIcon']();
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
