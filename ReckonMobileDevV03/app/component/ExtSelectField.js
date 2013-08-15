Ext.define('RM.component.ExtSelectField', {
    extend:'Ext.field.Select',
    xtype: 'extselectfield',
    
    initialize: function () {
        
        this.callParent(arguments);
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }

    },
    
    onPickerChange : function() {
        this.callParent(arguments);
        //add a new event to fire when an item was actually selected
        this.fireEvent('itemselected', this);
    },
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    },
    
    setValue: function(){
        this.callParent(arguments);
        this.showValidation(true);
    },
    
    reset: function(){
        this.callParent(arguments);
        this.setLabelCls('');
    }   
    

})