Ext.define('RM.controller.ContactDetailC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.ContactDetail'],
    config: {
        refs: {
            contactDetail: 'contactdetail',
            contactTitle: 'contactdetail #title',
            saveBtn: 'contactdetail #save',
            contactForm: 'contactdetail #contactForm',
            descriptionFld: 'contactdetail textfield[name=Description]',
            nameFld: 'contactdetail textfield[name=SurnameBusinessName]',
            customerOrSupplier: 'contactdetail #customerOrSupplier',
            businessOrIndividual: 'contactdetail #businessOrIndividual',            
            addressHeader: 'contactdetail #addressHeader',
            detailHeader: 'contactdetail #detailHeader',
            branchName: 'contactdetail textfield[name=FirstNameBranchName]',
            businessName: 'contactdetail textfield[name=SurnameBusinessName]',            
            phoneContainer: 'contactdetail #phoneContainer',
            faxContainer: 'contactdetail #faxContainer',
            email: 'contactdetail textfield[name=Email]',
            address1: 'contactdetail textfield[name=Address1]',
            address2: 'contactdetail textfield[name=Address2]',
            suburb: 'contactdetail textfield[name=Suburb]',
            state: 'contactdetail textfield[name=State]',
            postcode: 'contactdetail textfield[name=PostCode]',
            country: 'contactdetail textfield[name=Country]'
            
        },
        control: {
            'contactdetail': {
                show: 'onShow',
                hide: 'onHide'
            },            
            'contactdetail #back': {
                tap: 'back'
            },            
            'contactdetail #save': {
                tap: 'save'
            },
            'contactdetail #customerOrSupplier': {
                change: 'onCustomerOrSupplierSelect'
            },
            'contactdetail #businessOrIndividual': {
                change: 'onBusinessOrIndividualSelect'
            }
        }

    },
	
	showView: function(isCreate, data, cb, cbs){
        this.isCreate = isCreate;
        this.detailsData = data ? data : {};
        this.detailsCb = cb;
        this.detailsCbs = cbs;
        
        this.dataLoaded = false;
        
		var view = this.getContactDetail();
		if(!view){
			view = {xtype:'contactdetail'};
        }
        
		RM.ViewMgr.showPanel(view);		
	},
    
    isFormDirty: function(){        
        return !RM.AppMgr.isFormValsEqual( this.getContactForm().getValues(), this.initialFormValues);        
    },  
    
    onShow: function(){
        RM.ViewMgr.regFormBackHandler(this.back, this);
        this.getContactTitle().setHtml(this.isCreate ? 'Add Contact' : 'View Contact');
        this.getSaveBtn().setText(this.isCreate ? 'ADD' : 'SAVE');
        
        if (!this.dataLoaded) {
            var contactForm =  this.getContactForm(); 
            //contactForm.reset();   
            if (!this.isCreate) {
                this.loadFormData();
            }
            else {
                               
                var data = {};                             
                contactForm.setValues(data);
                this.getCustomerOrSupplier().setValue(null);
                this.getBusinessOrIndividual().setValue(null);
                this.detailsData.IsPerson = null;
                this.detailsData.IsCustomer = null;
                this.detailsData.IsSupplier = null;
                this.hideFields(true);
                this.initialFormValues = contactForm.getValues();
            }

            this.dataLoaded = true;
        }        
        
    },
    
    onHide: function(){
        RM.ViewMgr.deRegFormBackHandler();
    },        
    
    setEditable: function(editable){
        this.getSaveBtn().setHidden(!editable);
        if(!editable) { RM.util.FormUtils.makeAllFieldsReadOnly(this.getContactForm()); }        
    },      
    
    loadFormData: function () {
        RM.AppMgr.getServerRecById('Contacts', this.detailsData.ContactId,
			function (data) {
                var contactForm =  this.getContactForm();                
                contactForm.setValues(data);
                this.loadFieldsData(data);
                this.initialFormValues = contactForm.getValues();
                if(Ext.isDefined(data.SaveSupport) && !data.SaveSupport){
                    this.setEditable(false);
                }
                if(data.ViewNotice){
                    RM.AppMgr.showOkMsgBox(data.ViewNotice);
                }                
			},
			this,
            function(eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
                this.goBack();
            }
		);
    },

    validateForm: function(vals){        
        var isValid = true;        
        if(vals.IsCustomer == null || vals.IsSupplier == null){
            //this.getCustomerOrSupplier().setLabelCls('rm-manfld-notset-lbl');
            this.getCustomerOrSupplier().showValidation(false);
            isValid = false;
        } 
        
        if(vals.IsPerson == null ){
            //this.getBusinessOrIndividual().setLabelCls('rm-manfld-notset-lbl');
            this.getBusinessOrIndividual().showValidation(false);
            isValid = false;
        } 
        
        if(vals.IsPerson == true && vals.FirstNameBranchName == ''){
            this.getBranchName().showValidation(false);
            isValid = false;
        }
        
        if(!vals.Description){
            this.getDescriptionFld().showValidation(false);
            isValid = false;
        }         
        
        if(vals.SurnameBusinessName == ''){
            this.getNameFld().showValidation(false);
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
    },    
    
    save: function(){
        
        var vals = this.getContactForm().getValues();        
        vals.IsPerson = this.detailsData.IsPerson;
        vals.IsCustomer = this.detailsData.IsCustomer;
        vals.IsSupplier = this.detailsData.IsSupplier;  
        vals.IsActive = true;                             //Set this to field value when contact state field is added back to contact detail form
        
        if(this.validateForm(vals)){ 
            delete vals.CustomerOrSupplier;
            delete vals.BusinessOrIndividual;
                          
            RM.AppMgr.saveServerRec('Contacts', this.isCreate, vals,
    			function () {
                    RM.AppMgr.itemUpdated('contact');
                    RM.ViewMgr.back();
    			},
    			this,
                function(recs, eventMsg){
                    RM.AppMgr.showOkMsgBox(eventMsg);
                }
    		); 
        }           
    },
    
    goBack: function(){
        this.detailsCb.call(this.detailsCbs, 'back');
        RM.ViewMgr.back();        
        this.dataLoaded = false; 
    },

    back: function () {
        
         if(this.isFormDirty()){
            RM.AppMgr.showUnsavedChangesMsgBox(
                function(btn){
                    if(btn == 'yes'){
                        this.save();
                    }
                    else{
                        this.goBack();
                    }
                },
                this
            );
        }
        else{
            this.goBack();
        }    
    },
    
    onCustomerOrSupplierSelect: function() {
        
        var selection = this.getCustomerOrSupplier().getValue();
        
        if(selection == 'CustomerSuppliers'){
            this.detailsData.IsCustomer = true;
            this.detailsData.IsSupplier = true;
        }
        else if(selection == 'Customers'){
            this.detailsData.IsCustomer = true;
            this.detailsData.IsSupplier = false;
        }
        else if(selection == 'Suppliers'){
            this.detailsData.IsCustomer = false;
            this.detailsData.IsSupplier = true;
        }        
    },
    
    onBusinessOrIndividualSelect: function() {
        var selection = this.getBusinessOrIndividual().getValue();
        
        this.hideFields(false);
        
        if(selection == 'Business'){   
            this.detailsData.IsPerson = false;
            this.getDetailHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">BUSINESS DETAILS</h3>');
            this.getAddressHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">BUSINESS ADDRESS</h3>');
            this.getBranchName().setLabel('Branch name');
            this.getBranchName().showValidation(true);
            this.getBusinessName().setLabel('Business name <span style="color: #F00">*</span>');
        }
        else{            
            this.detailsData.IsPerson = true;
            this.getDetailHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">INDIVIDUAL DETAILS</h3>');
            this.getAddressHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">BUSINESS ADDRESS</h3>');
            this.getBranchName().setLabel('First name <span style="color: #F00">*</span>'); 
            console.log(this.getBranchName().getValue());
            this.getBranchName().showValidation(this.getBranchName().getValue()); 
            this.getBusinessName().setLabel('Surname <span style="color: #F00">*</span>');
        }
    },
    
    loadFieldsData: function(data){
        
        if(data.IsCustomer == true && data.IsSupplier == true){
            this.getCustomerOrSupplier().setValue('CustomerSuppliers');
        }
        else if(data.IsCustomer == true && data.IsSupplier == false){
            this.getCustomerOrSupplier().setValue('Customers');
        }
        else if(data.IsCustomer == false && data.IsSupplier == true){
            this.getCustomerOrSupplier().setValue('Suppliers');
        }
        
        if(data.IsPerson == true){
            this.getBusinessOrIndividual().setValue('Individual');
        }
        else{
            this.getBusinessOrIndividual().setValue('Business');
        }
        
    },
    
    hideFields: function(val){        
        
        this.getDetailHeader().setHidden(val);
        this.getAddressHeader().setHidden(val);
        this.getBranchName().setHidden(val);
        this.getBusinessName().setHidden(val);
        this.getPhoneContainer().setHidden(val);
        this.getFaxContainer().setHidden(val);
        this.getEmail().setHidden(val);
        this.getAddress1().setHidden(val);
        this.getAddress2().setHidden(val);
        this.getSuburb().setHidden(val);
        this.getState().setHidden(val);
        this.getPostcode().setHidden(val);
        this.getCountry().setHidden(val);
        
    }    

});
