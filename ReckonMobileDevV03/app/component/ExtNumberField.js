Ext.define('RM.component.ExtNumberField', {
    extend: 'Ext.field.Number',
    xtype: 'extnumberfield',

    initialize: function () {
        
        this.callParent(arguments);
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }

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

});