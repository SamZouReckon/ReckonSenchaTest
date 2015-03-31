Ext.define('RM.controller.TimeSheetWeeklyC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.TimeSheetWeekly','RM.component.TimeEntryDayRow'],
    config: {
        refs: {
            timeSheetWeekly: { selector: 'timesheetweekly', xtype: 'timesheetweekly', autoCreate: true },
            saveBtn: 'timesheetweekly #save',
            timeSheetForm: 'timesheetweekly #timeSheetForm',
            customerId: 'timesheetweekly hiddenfield[name=CustomerId]',
            projectId: 'timesheetweekly hiddenfield[name=ProjectId]',
            billableCheckbox: 'timesheetweekly rmtogglefield[name=Billable]',
            itemName: 'timesheetweekly #itemName'
        },
        control: {
            'timesheetweekly': {
                show: 'onShow',
                hide: 'onHide'
            },
            'timesheetweekly #back': {
                tap: 'back'
            },
            'timesheetweekly #save': {
                tap: 'save'
            },
            'timesheetweekly #timeSheetForm exttextfield': {
                tap: 'onFieldTap'
            }
        }
    },

    init: function () {
        this.callParent(arguments);
        this.serverApiName = 'TimeEntries';
    },

    showView: function (weekDaysArray, cb, cbs) {        
        this.weekDaysRowsAdded = false;
        this.weekDaysArray = weekDaysArray;
        this.cb = cb;
        this.cbs = cbs;
        var view = this.getTimeSheetWeekly();
        if (!view) {
            view = { xtype: 'timesheetweekly' };
        }        
        RM.ViewMgr.showPanel(view);        
    },

    addWeekDaysRows: function () {
        var view = this.getTimeSheetWeekly();
        for (var i = 0; i < this.weekDaysArray.length; i++) {
            var row = view.add({ xtype: 'timeentrydayrow', scrollable: null });
            row.setValues({ Date: this.weekDaysArray[i] });
        }
        view.add({ xtype: 'component', cls: 'rm-field-border-top' })
        this.weekDaysRowsAdded = true;
    },

    onShow: function () {
        //RM.ViewMgr.regFormBackHandler(this.back, this);
        if (!this.weekDaysRowsAdded) {
            this.addWeekDaysRows();
            //record initial value of the form to compare later - isFormDirty
            this.initialFormValues = this.getAllFormValues();
        }
    },

    onHide: function () {
        //RM.ViewMgr.deRegFormBackHandler(this.back);
    },

    isFormDirty: function () {
        return !RM.AppMgr.isFormValsEqual(this.getAllFormValues(), this.initialFormValues);
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
				    this.detailsData.TaxTypeId = rec.SaleTaxCodeId;
				    this.getTimeSheetForm().setValues({ ItemId: rec.ItemId, ItemName: rec.ItemPath });
				},
				this
			);
        }        
    },    

    goBack: function () {
        RM.ViewMgr.back();        
    },

    back: function () {
        if (this.isFormDirty()) {
            RM.AppMgr.showUnsavedChangesMsgBox(
                function (btn) {
                    if (btn == 'yes') {
                        this.save();
                    }
                    else {
                        this.goBack();
                    }
                },
                this
            );
        }
        else {
            this.goBack();
        }
    },

    getWeekDaysData: function(){
        var timeSheetWeekly = this.getTimeSheetWeekly();
        var weekDaysRows = timeSheetWeekly.query('timeentrydayrow');
        var weekDaysData = new Array();
        for (var i = 0; i < weekDaysRows.length; i++) {
            weekDaysData.push(weekDaysRows[i].getValues());
        }
        return weekDaysData;
    },

    validateWeekDaysData: function(weekDaysData){
        for (var i = 0; i < weekDaysData.length; i++) {
            if (!weekDaysData[i].Duration) {
                return false;
            }            
        }
        return true;
    },

    getAllFormValues: function(){
        var formVals = this.getTimeSheetForm().getValues();
        formVals.Billable = this.getBillableCheckbox().getValue();
        formVals.WeekDaysData = this.getWeekDaysData();
        return formVals
    },

    save: function () {
        var formVals = this.getAllFormValues();                

        if (this.validateForm(formVals)) {
            RM.AppMgr.saveServerRec(this.serverApiName, this.isCreate, formVals,
               function () {
                   RM.AppMgr.showSuccessMsgBox('Timesheet saved', function () {
                       RM.AppMgr.itemUpdated('timesheet');
                       this.goBack();
                   }, this);
                   RM.AppMgr.itemUpdated('timesheet');
               },
               this,
               function (recs, eventMsg) {
                   RM.AppMgr.showOkMsgBox(eventMsg);
               }
           );
        }        
    },

    validateForm: function (vals) {
        var isValid = true;

        if (!vals.ItemName) {
            this.getItemName().showValidation(false);
            isValid = false;
        }

        if (!this.validateWeekDaysData(vals.WeekDaysData)) {
            RM.AppMgr.showInvalidDurationMsg();
            isValid = false;
            return isValid;
        }

        if (!isValid) {
            RM.AppMgr.showInvalidFormMsg();
        }

        return isValid;
    }

});