Ext.define('RM.component.ExtEmailField', {
    extend:'Ext.field.Email',
    xtype: 'extemailfield',  
    
    initialize: function () {
        
        this.callParent(arguments);
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }
    },    
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    },
    
    reset: function(){
        this.callParent(arguments);
        this.setLabelCls('');
    },
    
    getValue: function(){        
        this.showValidation(true);
        return this.callParent(arguments);      
    } 
    

})