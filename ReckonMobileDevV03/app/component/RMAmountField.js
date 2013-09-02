Ext.define('RM.component.RMAmountField', {
    extend: 'Ext.field.Number',
    xtype: 'rmamountfield',
    
    constructor: function (config) {        
        config.clearIcon = false;                    //Not required for this control 
        this.decimalPlaces = config.decimalPlaces;   //Number of decimal places
        this.prefix = config.prefix;                //currency prefix e.g.$ 
        this.callParent(arguments); 
        
    },   
    
    initialize: function () {              
        this.callParent();   
        this.on('keyup',this.valChange);       
    },
    
    valChange: function(){
        var val = this.getValue(); 
        
        if(val === null || val === undefined ) {            
            console.log(val);
            return;
        }   
        
        var valStr = val.toString(); 
        var valStrLen = valStr.length;
        
        if(this.decimalPlaces && valStr.indexOf('.') != -1){
            if( valStrLen-1 > ( valStr.indexOf('.') + this.decimalPlaces ) ){
                this.setValue(valStr.substring(0,valStrLen-1));
            }
        } 
        console.log(this.getValue());
    }    
    
        
});