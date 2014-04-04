Ext.define('RM.controller.PayPreferencesC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayPreferences',
    config: {
        refs: {
            payPreferences: 'paypreferences',            
            payPreferencesForm: 'paypreferences #preferencesform',
            includeSurcharge: 'paypreferences #includesurcharge',
            surchargeType: 'paypreferences selectfield[name = SurchargeType]',
            surchargeAmount: 'paypreferences textfield[name = SurchargeAmount]',
            surchargePercentage: 'paypreferences textfield[name = SurchargePercentage]',
            email: 'paypreferences textfield[name = Email]',
            nameToShow: 'paypreferences textfield[name = NameToShow]',
            receiptPrefix: 'paypreferences textfield[name = ReceiptPrefix]',
            nextReceiptNumber: 'paypreferences textfield[name = NextReceiptNumber]',
            reckonPayDevice: 'paypreferences #reckonpaydevice'
        }, 
        control: {
            'paypreferences #save':{
                tap: 'onSave'
            },
            'paypreferences #includesurcharge': {
                check: 'onSurchargeCheckBoxToggle'
            },
            'paypreferences selectfield[name = SurchargeType]':{
                change: 'onSurchargeTypeChange'
            }
            /*'paypreferences textfield[name = NextReceiptNumber]':{
                keyup: 'onReceiptNumKeyUp'
            }*/
        }
     },
    
    showView: function () {       
        var view = this.getPayPreference();
        if (!view){
            view = { xtype: 'paypreferences' };
        }       
        RM.ViewMgr.showPanel(view);  
    },     
    
    onSurchargeCheckBoxToggle: function() {
        if(this.getIncludeSurcharge().getValue()){
            this.getSurchargeType().setHidden(false);
            var surchargeType = this.getSurchargeType().getValue();
            if(surchargeType == 'Percentage'){
                this.getSurchargeAmount().setHidden(true);
            	this.getSurchargePercentage().setHidden(false);
            }
            else if(surchargeType == 'Absolute amount'){
                this.getSurchargeAmount().setHidden(false);
            	this.getSurchargePercentage().setHidden(true);
            }
        }
        else{
            this.getSurchargeType().setHidden(true);
            this.getSurchargeAmount().setHidden(true);
            this.getSurchargePercentage().setHidden(true);
        }
    },
    
    onSurchargeTypeChange: function(control){
  	  var surchargeType = control.getValue();
        if(surchargeType == 'Percentage'){
            this.getSurchargeAmount().setHidden(true);
        	this.getSurchargePercentage().setHidden(false);
        }
        else if(surchargeType == 'Absolute amount'){
            this.getSurchargeAmount().setHidden(false);
        	this.getSurchargePercentage().setHidden(true);
        }  
    },
    
    onSave: function(){        
        var data = this.getPayPreferencesForm().getValues();
        data.IncludeSurcharge = this.getIncludeSurcharge().getValue();
        data.ReckonPayDevice = this.getReckonPayDevice().getValue();        
        if(this.validateForm(data)){  
            var prefArray = new Array();           
            Ext.Object.each(data, function(key, value) {
                var prefObj = {};
                prefObj.SettingName = key;
                prefObj.Value = value;
                prefArray.push(prefObj);
            });
            console.log(prefArray);
        }    
    },   
    
    //work around for numberfield - maxLength 6
    /*onReceiptNumKeyUp: function( textfield, e, eOpts ) {
        var value = textfield.getValue()+'';
        var length = value.length;
        if (length > 6){
            textfield.setValue(value.substring(0, 6));
            return false;
        } 
    },*/
    
    validateForm: function(vals){        
        var isValid = true;      
        if(vals.IncludeSurcharge){
            if(vals.SurchargeType == 'Percentage'){
                var surchargePercentage = parseFloat(vals.SurchargePercentage);
                if(!vals.SurchargePercentage){
                    this.getSurchargePercentage().showValidation(false);
            		isValid = false;            
                }
                if(surchargePercentage && surchargePercentage>99){
                    isValid = false;            
            		RM.AppMgr.showErrorMsgBox('Surcharge percentage cannot be greater than 99%');            
            		return isValid;
                }
            }
            else if(vals.SurchargeType == 'Absolute amount'){
                if(!vals.SurchargeAmount){
                    this.getSurchargeAmount().showValidation(false);
            		isValid = false;            
                }
            }  
        }
        
        if (!vals.Email) {             
            this.getEmail().showValidation(false);
            isValid = false;            
        }  
        
        if(!vals.NameToShow){
            this.getNameToShow().showValidation(false);
            isValid = false;            
        }  
        
        if(!vals.ReceiptPrefix ){
            this.getReceiptPrefix().showValidation(false);
            isValid = false; 
        }
        
        if(!vals.NextReceiptNumber){
            this.getNextReceiptNumber().showValidation(false);
            isValid = false;
        }
        
        if (vals.Email !== '' && !RM.AppMgr.validateEmail(vals.Email)) {             
            this.getEmail().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidEmailMsg();
            return isValid;
        }  
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
    }  
        
       
});