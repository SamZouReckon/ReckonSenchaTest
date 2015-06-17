Ext.define('RM.controller.TimeSheetDetailC', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            timeSheetDetail: 'timesheetdetail',
            timeSheetTitle: 'timesheetdetail #title',
            saveBtn: 'timesheetdetail #save',
            timeSheetForm: 'timesheetdetail #timeSheetForm',
            customerId: 'timesheetdetail hiddenfield[name=CustomerId]',
            projectId: 'timesheetdetail hiddenfield[name=ProjectId]',
            billable: 'timesheetdetail checkboxfield',
            description: 'timesheetdetail #description',
            billableCheckbox: 'timesheetdetail rmtogglefield[name=Billable]',
            historyFld: 'timesheetdetail #history',
            itemName: 'timesheetdetail #itemName',
            duration: 'timesheetdetail #duration',
            dateFld: 'timesheetdetail extdatepickerfield[name=Date]'
        },
        control: {
            'timesheetdetail': {
                show: 'onShow',
                hide: 'onHide'
            },
            'timesheetdetail #back': {
                tap: 'back'
            },
            'timesheetdetail #save': {
                tap: 'save'
            },
            'timesheetdetail #timeSheetForm exttextfield': {
                tap: 'onFieldTap'
            }
        }
    },

    init: function () {
        this.serverApiName = 'TimeEntries';
    },

    showView: function (data, cb, cbs) {
        this.isCreate = (data == null);
        this.detailsData = data;
        this.detailsCb = cb;
        this.detailsCbs = cbs;
        
        this.noteText = '';

        this.dataLoaded = false;
        if (this.isCreate)
            this.detailsData = {Date: new Date()}; // { TaxTypeId: '52c59eb2-7dc3-411b-848a-27c4aa7378b7', UserId: '00000000-0000-0000-0000-000000000000', StatusCode: 'b' };

        var view = this.getTimeSheetDetail();
        if (!view){
            view = { xtype: 'timesheetdetail' };
        }           
        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {
        RM.ViewMgr.regFormBackHandler(this.back, this);
        this.getTimeSheetTitle().setHtml(this.isCreate ? 'Add Timesheet' : 'View Timesheet');

        if (!this.dataLoaded) {
            this.getHistoryFld().setHidden(this.isCreate);
            var timesheetForm = this.getTimeSheetForm();
            timesheetForm.reset();
            if (!this.isCreate) {
                RM.AppMgr.getServerRecById(this.serverApiName, this.detailsData.TimeEntryId,
					function (data) {
					    this.detailsData = data;
					    data.Date = new Date(data.Date);
					    //delete data.Notes;
                        //data.SaleTaxCodeId = data.TaxTypeId;					    
                        this.noteText = data.Notes; //Enables preserving of new lines when going from textfield to textarea                        
                        data.Notes = data.Notes ? data.Notes.replace(/(\r\n|\n|\r)/g, ' ') : '';
                        timesheetForm.setValues(data);
                        
					    this.getBillableCheckbox().setValue(data.Billable);
                        this.initialFormValues = timesheetForm.getValues();
					},
					this
				);
            }
            else{
                timesheetForm.reset();
                timesheetForm.setValues(this.detailsData);
                this.initialFormValues = timesheetForm.getValues();
            }
            this.dataLoaded = true;
        }
        //this.getTimeSheetForm().setValues(this.detailsData);
        
    },
    
    onHide: function(){
        RM.ViewMgr.deRegFormBackHandler(this.back);
    },    
    
    isFormDirty: function(){        
        return !RM.AppMgr.isFormValsEqual(this.getTimeSheetForm().getValues(), this.initialFormValues);        
    },    

    onFieldTap: function (tf) {
        if (tf.getName() == 'CustomerName') {
            RM.Selectors.showCustomers(
                this.getProjectId().getValue(),
				function (data) {
				    this.getTimeSheetForm().setValues({ CustomerId: data.ContactId, CustomerName: data.Description });
				},
				this
			);
        }
        else if (tf.getName() == 'ProjectName') {
            RM.Selectors.showProjects(
                this.getCustomerId().getValue(),
                null,
				function (data) {
				    this.getTimeSheetForm().setValues({ ProjectId: data.ProjectId, ProjectName: data.ProjectPath });
				},
				this
			);
        }
        else if (tf.getName() == 'ItemName') {
            RM.Selectors.showItems(
                true,
				this.getProjectId().getValue(),
                false,
				function (data) {
                    var rec = data[0];
				    this.detailsData.TaxTypeId = rec.SaleTaxCodeId;//data[0].TaxCodeId;
				    //this.getTimeSheetForm().setValues({ ItemId: data[0].ItemId, ItemName: data[0].Name, SaleTaxCodeId: data[0].SaleTaxCodeId });
                    this.getTimeSheetForm().setValues({ ItemId: rec.ItemId, ItemName:rec.ItemPath});
				},
				this
			);
        }
        else if (tf.getName() == 'Notes') {
            this.editDescription();
        }
        else if (tf.getItemId() == 'history') {
            RM.Selectors.showHistory('Timesheet', RM.Consts.HistoryTypes.TIME, this.detailsData.TimeEntryId);
        }        

    },
    
    editDescription: function(){
        var isEditable = true; //change this when doing time sheet business rules
        
        RM.Selectors.showNoteText(
            'Description',
            isEditable,
            'OK',
            this.noteText,
            function(noteText){
                RM.ViewMgr.back();
                this.noteText = noteText; //Enables preserving of new lines when going from textfield to textarea
                this.getDescription().setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );
        
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

    save: function () {
        var formVals = this.getTimeSheetForm().getValues();
        //formVals.TaxTypeId = formVals.SaleTaxCodeId;
        formVals.Billable = this.getBillableCheckbox().getValue();
        var vals = Ext.applyIf(formVals, this.detailsData);        
        vals.Notes = this.noteText;
                
        if(this.validateForm(vals)){ 
             RM.AppMgr.saveServerRec(this.serverApiName, this.isCreate, vals,
    			function () { 
                    RM.AppMgr.showSuccessMsgBox('Timesheet saved',function(){
                       RM.AppMgr.itemUpdated('timesheet');
                       this.goBack(); 
                    }, this);                        
    			    RM.AppMgr.itemUpdated('timesheet');
    			},
    			this,
                function(recs, eventMsg){
                    RM.AppMgr.showOkMsgBox(eventMsg);              
                }
		    );
        }        
    },
    
    validateForm: function(vals){        
        var isValid = true;
        
        if(vals.ItemName == ''){            
            this.getItemName().showValidation(false);
            isValid = false;            
        }
        
        if(vals.Duration == '' || vals.Duration == 0){
            this.getDuration().showValidation(false);
            isValid = false;            
        }
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
   }

});