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
            customerOrSupplier: 'contactdetail #customerOrSupplier',
            businessOrIndividual: 'contactdetail #businessOrIndividual',            
            addressHeader: 'contactdetail #addressHeader',
            detailHeader: 'contactdetail #detailHeader',
            businessName: 'contactdetail field[name=BusinessName]',
            branchName: 'contactdetail field[name=BranchName]',  
            abn: 'contactdetail field[name=ABN]',  
            firstName: 'contactdetail field[name=FirstName]',
            surname: 'contactdetail field[name=Surname]',
            phoneContainer: 'contactdetail #phoneContainer',
            faxContainer: 'contactdetail #faxContainer',
            email: 'contactdetail field[name=Email]',
            web: 'contactdetail field[name=Web]',
            notesFld: 'contactdetail field[name=Notes]',
            postalAddress: 'contactdetail #postalAddress',
            businessAddress: 'contactdetail #businessAddress',
            sameAddress: 'contactdetail field[name=SameAddress]'
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
            },
            notesFld: {
                tap: 'showNotes'
            },
            sameAddress: {
                change: 'sameAddressChanged'
            },
            'contactdetail #postalAddress field': {
                change: 'onPostalAddressChanged'
            }
        }

    },
	
	showView: function(isCreate, data, cb, cbs){
        this.isCreate = isCreate;
        this.isEditable = true;
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
        this.getContactTitle().setHtml(this.isCreate ? 'Add contact' : 'View contact');
        
        if (!this.dataLoaded) {
            var contactForm =  this.getContactForm(), businessOrIndividual = this.getBusinessOrIndividual();         
            
            //simply setting the field disabled works in simulator but doesn't display value in iOS
            businessOrIndividual.setReadOnly(!this.isCreate);
            if(!this.isCreate){
                businessOrIndividual.addCls('rm-flatfield-disabled');    
            }                        
            
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
                this.initialFormValues = contactForm.getValues();
                this.dataLoaded = true;
            }            
        }        
        
    },
    
    onHide: function(){
        RM.ViewMgr.deRegFormBackHandler();
    },        
    
    setEditable: function(editable){
        this.isEditable = editable;
        this.getSaveBtn().setHidden(!editable);
        if(!editable) { RM.util.FormUtils.makeAllFieldsReadOnly(this.getContactForm()); }        
    },      
    
    loadFormData: function () {
        RM.AppMgr.getServerRecById('Contacts', this.detailsData.ContactId,
			function (data) {                
                this.formattedNoteValue = data.Notes;
                // Strip newlines and display the notes unformatted in the textbox
                data.Notes = data.Notes ? data.Notes.replace(/(\r\n|\n|\r)/g, ' ') : '';
                
                var contactForm =  this.getContactForm();          
                contactForm.setValues(data);
                this.setNestedPropertyValues(this.getBusinessAddress(), data, 'BusinessAddress');
                this.setNestedPropertyValues(this.getPostalAddress(), data, 'PostalAddress');
                this.loadFieldsData(data);
                this.initialFormValues = contactForm.getValues();
                if(Ext.isDefined(data.SaveSupport) && !data.SaveSupport){
                    this.setEditable(false);
                }
                if(data.ViewNotice){
                    RM.AppMgr.showOkMsgBox(data.ViewNotice);
                }                
                
                this.dataLoaded = true;
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
            this.getBusinessOrIndividual().showValidation(false);
            isValid = false;
        } 
        
        if(vals.IsPerson == true && !vals.FirstNameBranchName){        
            this.getFirstName().showValidation(false);
            isValid = false;
        }
        
        if(vals.IsPerson == true && !vals.SurnameBusinessName){        
            this.getSurname().showValidation(false);
            isValid = false;
        }
        
        if(vals.IsPerson == false && !vals.SurnameBusinessName){        
            this.getBusinessName().showValidation(false);
            isValid = false;
        }
        
        if(!vals.Description){
            this.getDescriptionFld().showValidation(false);
            isValid = false;
        }    
        
        if (vals.Email !== '' && !RM.AppMgr.validateEmail(vals.Email)) {             
            this.getEmail().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidEmailMsg();
            return isValid;
        }
        
        if (vals.Web !== '' && !RM.AppMgr.validateURL(vals.Web)) {             
            this.getWeb().showValidation(false);
            isValid = false;
            RM.AppMgr.showInvalidURLMsg();
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
        if(vals.IsPerson === true){
            vals.FirstNameBranchName = vals.FirstName;
            vals.SurnameBusinessName = vals.Surname;
        }
        else {
            vals.FirstNameBranchName = vals.BranchName;
            vals.SurnameBusinessName = vals.BusinessName;
        }
        delete vals.FirstName;
        delete vals.Surname;
        delete vals.BranchName;
        delete vals.BusinessName;
        
        vals.IsCustomer = this.detailsData.IsCustomer;
        vals.IsSupplier = this.detailsData.IsSupplier;  
        vals.IsActive = true;                             //Set this to field value when contact state field is added back to contact detail form
        
        // Save the fully formatted notes value, not the unformatted one displayed in the textbox
        vals.Notes = this.formattedNoteValue;
        
        // Some fernagling to get the address fields populated properly
        this.unFlattenProperty(vals, 'BusinessAddress');
        this.unFlattenProperty(vals, 'PostalAddress');
            
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
    
    showNotes: function(){
        
        RM.Selectors.showNoteText(
            'Notes',
            this.isEditable && !this.getContactForm().addEditDenied,
            'SAVE',
            this.formattedNoteValue,
            function(noteText){
                RM.ViewMgr.back();
                this.formattedNoteValue = noteText;
                this.getNotesFld().setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );
        
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
              
        if(selection == 'Business'){   
            this.detailsData.IsPerson = false;
            this.getDetailHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">Business details</h3>');
            this.getBusinessName().setHidden(false);
            this.getBranchName().setHidden(false);
            this.getFirstName().setHidden(true);
            this.getSurname().setHidden(true);            
        }
        else{            
            this.detailsData.IsPerson = true;
            this.getDetailHeader().setHtml('<h3 class="rm-m-1 rm-hearderbg">Individual details</h3>');
            this.getBusinessName().setHidden(true);
            this.getBranchName().setHidden(true);
            this.getFirstName().setHidden(false);
            this.getSurname().setHidden(false);            
        }
        
        this.getContactDetail().showDetailsFields();
    },
    
    sameAddressChanged: function(field, sameAddress) {
        var enableFields = true;
        if(sameAddress == 'Yes') {
            // Copy all the postal address fields into the business ones
            this.copyPostalToBusiness();
            enableFields = false;
        }
        
        this.getBusinessAddress().getItems().items.forEach(function(item) {
            if(item.getName && item.getName().indexOf('BusinessAddress.') === 0) {
                item.setReadOnly(!enableFields);
                item.setPlaceHolder(enableFields ? 'enter' : '');                
            }
        });
    },
    
    onPostalAddressChanged: function() {
        if(this.getSameAddress().getValue()) {
            this.copyPostalToBusiness();
        }
    },
    
    copyPostalToBusiness: function() {
        var contactDetail = this.getContactDetail();
        contactDetail.down('field[name=BusinessAddress.Address1]').setValue(this.getContactDetail().down('field[name=PostalAddress.Address1]').getValue());
        contactDetail.down('field[name=BusinessAddress.Address2]').setValue(this.getContactDetail().down('field[name=PostalAddress.Address2]').getValue());
        contactDetail.down('field[name=BusinessAddress.Suburb]').setValue(this.getContactDetail().down('field[name=PostalAddress.Suburb]').getValue());
        contactDetail.down('field[name=BusinessAddress.State]').setValue(this.getContactDetail().down('field[name=PostalAddress.State]').getValue());
        contactDetail.down('field[name=BusinessAddress.PostCode]').setValue(this.getContactDetail().down('field[name=PostalAddress.PostCode]').getValue());
        contactDetail.down('field[name=BusinessAddress.Country]').setValue(this.getContactDetail().down('field[name=PostalAddress.Country]').getValue());
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
            this.getFirstName().setValue(data.FirstNameBranchName);
            this.getSurname().setValue(data.SurnameBusinessName);
        }
        else{
            this.getBusinessOrIndividual().setValue('Business');
            this.getBusinessName().setValue(data.SurnameBusinessName);
            this.getBranchName().setValue(data.FirstNameBranchName);
        }       
               
    },
    
    // Populate all fields in the container that are to be bound to properties of the valuesObject.parentProperty object
    // e.g. parentProperty.Address1, parentProperty.Address2 etc, using the field name as the binding identifier
    setNestedPropertyValues: function(container, valuesObject, parentProperty){        
        var fieldName, childProperty, containerItems;
        var dottedProperty = parentProperty + '.';
        
        containerItems = container.getItems().items;
        containerItems.forEach(function(item) {
            // Make sure this item is a field that has a Name getter
            fieldName = item.getName ? item.getName() : null;
            
            // It also has to be bound to a child property of parentProperty
            if(!fieldName || fieldName.indexOf(dottedProperty) !== 0) return;
            
            // We have a winner, set the field value accordingly
            childProperty = fieldName.replace(dottedProperty, '');
            item.setValue(valuesObject[parentProperty][childProperty]);                     
        });
    },
    
    // Find all properties on the object that start with "propertyName." and hydrate 
    // them into an object literal property of the same name
    unFlattenProperty: function(object, propertyName) {
        var property, dottedName;
        dottedName = propertyName + ".";
        
        object[propertyName] = object[propertyName] || {};        
        for(property in object) {            
            if(property.indexOf(dottedName) === 0) {
                object[propertyName][property.replace(dottedName,'')] = object[property];
                delete object[property];
            }
        }        
        
    }

});
