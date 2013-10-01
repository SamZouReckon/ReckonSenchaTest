Ext.define('RM.component.ExtTextField', {
    extend: 'Ext.field.Text',
    xtype: 'exttextfield',

    initialize: function () {
        
        this.callParent(arguments);
        
        if(this.config.rmmandatory){
            this.setLabel(this.getLabel() + ' <span style="color: #F00">*</span>');    
        }
        
        this.element.on('tap', function () { this.fireEvent('tap', this); }, this);
        if(this.config.cursorSimulate){
            this.on('focus', this.onMyFocus, this);
            this.on('blur', this.onMyBlur, this);
        }
        
    },

    onMyFocus: function(tf){
        if(this.config.cursorSimulate){
            this.cursorTimer = window.setInterval(
                function(){ 
                    if(this.myCursorOff){
                        tf.setPlaceHolder('|'); 
                    }
                    else{ 
                        tf.setPlaceHolder(''); 
                    }
                    this.myCursorOff = !this.myCursorOff 
                }
            ,500);            
        }

    },
    
    onMyBlur: function(tf){
        if(this.cursorTimer){
             window.clearInterval(this.cursorTimer);
        }
    },    
    
    syncEmptyCls: function () {

        this.callParent(arguments);
        /*var iconCls = (this.getName() + '-icon').toLowerCase();

        if (this._value) {
            this.removeCls(iconCls);
            this.showValidation(true);
        }
        else {
            this.addCls(iconCls);
        }*/
    },
    /*
    setValue: function(){
        this.callParent(arguments);
        this.showValidation(true);
    },    
    
    reset: function(){
        this.callParent(arguments);
        this.setLabelCls('');
    },
    */
    
    showValidation: function(valid){        
         this.setLabelCls(valid ? '' : 'rm-manfld-notset-lbl');
    },    
    
    getValue: function(){        
        this.showValidation(true);
        return this.callParent(arguments);      
    }    

});