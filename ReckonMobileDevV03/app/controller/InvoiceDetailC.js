Ext.define('RM.controller.InvoiceDetailC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.util.FormUtils'],

    config: {
        refs: {
            invoiceDetail: 'invoicedetail',
            invoiceTitle: 'invoicedetail #title',
            saveBtn: 'invoicedetail #save',
            lineItems: 'invoicedetail invoicelineitems',
            invoiceForm: 'invoicedetail #invoiceForm',
            balanceDue: 'invoicedetail #balanceDue',
            invCodeFld: 'invoicedetail textfield[name=InvCode]',
            notesFld: 'invoicedetail textfield[name=Notes]',
            customerFld: 'invoicedetail textfield[name=CustomerName]',
            dueDateFld: 'invoicedetail extdatepickerfield[name=DueDate]',
            dateFld: 'invoicedetail extdatepickerfield[name=Date]',
            refNrFld: 'invoicedetail textfield[name=Ref]',
            amountsFld: 'invoicedetail extselectfield[name=AmountTaxStatus]',
            invStatus: 'invoicedetail #invoiceStatus'
        },
        control: {
            'invoicedetail': {
                show: 'onShow',
                hide: 'onHide'
            },
            'invoicedetail #back': {
                tap: 'back'
            },
            'invoicedetail #save': {
                tap: 'save'
            },
            'invoicedetail #options': {
                tap: 'onOptions'
            },
            'invoicedetail #invoiceForm textfield': {
                tap: 'onFieldTap'
            },
            'invoicedetail extselectfield[name=AmountTaxStatus]':{
                change: 'onAmountTaxStatusSelected'
            },
            'invoicedetail #addItem': {
                tap: 'onAddItem'
            },
            'invoicedetail invoicelineitems': {
                addlineitem: 'onAddLineItem',
                editlineitem: 'onEditLineItem',
                deletelineitem: 'onDeleteLineItem'
            },
            'invoicedetail #balBreakdown': {
                tap: 'onBalanceBreakdown'
            },
            'invoicedetail #invActions': {
                tap: 'onInvoiceActions'
            },
            dateFld : {
                change: 'onInvoiceDateChanged'
            }
        }
    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },

    showView: function (isCreate, data, cb, cbs) {
        this.lineItemsDirty = false;
        this.isCreate = isCreate;
        this.detailsData = data ? data : {};
        this.detailsCb = cb;
        this.detailsCbs = cbs;

        this.noteText = '';
        this.dataLoaded = false;
        
        if (isCreate) {
            this.detailsData = Ext.applyIf(this.detailsData, { 
                Status: RM.InvoicesMgr.getInitialInvoiceStatus(), 
                AmountTaxStatus: RM.CashbookMgr.getTaxPreferences().SalesFigures, 
                Date: new Date(), 
                Discount: 'None',
                Amount: 0,
                DiscountTotal: 0,
                Tax: 0,
                Subtotal: 0, 
                Paid: 0,
                BalanceDue: 0
            });
        }
        
        //Amount, DiscountTotal, Tax, Subtotal, Paid, BalanceDue

        this.isEditable = RM.InvoicesMgr.isInvoiceEditable(this.detailsData.Status) && RM.PermissionsMgr.canAddEdit('Invoices');
        
        var view = this.getInvoiceDetail();
        if (!view){
            view = { xtype: 'invoicedetail' };
        }           
        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {        
        
        RM.ViewMgr.regFormBackHandler(this.back, this);
        this.getInvoiceTitle().setHtml(this.isCreate ? 'Add Invoice' : 'View Invoice');
        this.getSaveBtn().setText(this.isCreate ? 'ADD' : 'SAVE');                
        
        this.setEditable(this.isEditable);
        
        this.getInvoiceDetail().setActionsHidden(this.isCreate);                 
        this.getDueDateFld().resetPicker();
        this.getDateFld().resetPicker();
        
        if (!this.dataLoaded) {
            if (!this.isCreate) {                
                this.loadFormData();
            }
            else {
                this.loadNewInvCode();
                var invoiceForm =  this.getInvoiceForm();
                
                var data = this.detailsData;
                if (data.CustomerId) {                    
                    this.getLineItems().setCustomerId(data.CustomerId);
                }
                invoiceForm.reset();
                invoiceForm.setValues(data);
                this.applyTaxRules();
                this.previousAmountTaxStatus = data.AmountTaxStatus;
                this.getBalanceDue().setHtml('');
                this.initialFormValues = invoiceForm.getValues();
                this.getLineItems().setCustomerId(null);
                this.getLineItems().setInvoiceDate(this.getDateFld().getValue());
                this.getLineItems().setTaxStatus(data.AmountTaxStatus);
                this.getInvStatus().setHtml(RM.InvoicesMgr.getInvoiceStatusText(data.Status));
                this.dataLoaded = true;
            }           
        }

    },

    onHide: function(){
        RM.ViewMgr.deRegFormBackHandler();
    },
    
    onItemUpdated: function (itemType) {
        if (itemType == 'invoice' && !this.isCreate) {
            this.loadFormData();
        }
    },
    
    setEditable: function(editable){
        this.getSaveBtn().setHidden(!editable);
        if(!editable) { RM.util.FormUtils.makeAllFieldsReadOnly(this.getInvoiceForm()); }        
        this.getLineItems().setIsEditable(editable);
    },    
    
    applyTaxRules: function() {
        var amounts = this.getAmountsFld();
        var taxPrefs = RM.CashbookMgr.getTaxPreferences();
        amounts.setReadOnly(!this.isEditable || !taxPrefs.AllowTaxEdit);
        
        if(this.isCreate) {
            // New invoice behaviour
            if (taxPrefs.IsTaxTracking) {
                amounts.setHidden(false);
                amounts.setValue(taxPrefs.SalesFigures);
            }
            else
            {
                amounts.setHidden(true);
                amounts.setValue(RM.Consts.TaxStatus.NON_TAXED);
            }
        }
        else {
            // Existing invoice behaviour
            var showAmounts = taxPrefs.IsTaxTracking || amounts.getValue() !== RM.Consts.TaxStatus.NON_TAXED;
            amounts.setHidden(!showAmounts);
        }        
    },

    loadFormData: function () {
        RM.AppMgr.getServerRecById('Invoices', this.detailsData.InvoiceId,
			function (data) {
			    
                this.getInvStatus().setHtml(RM.InvoicesMgr.getInvoiceStatusText(data.Status));
                var invoiceForm =  this.getInvoiceForm();
			    this.getLineItems().removeAllItems();
			    this.detailsData = data;
                if(data.DueDate != null){
                   data.DueDate = new Date(data.DueDate);             
                }
			    data.Date = new Date(data.Date);
			    data.Discount = (data.DiscountPerc && data.DiscountPerc != 0) ? data.DiscountPerc + '%' : 'None';
			    data.Discount = (data.DiscountAmount && data.DiscountAmount != 0) ? '$' + Ext.Number.toFixed(data.DiscountAmount, 2) : data.Discount;			    
                this.noteText = data.Notes; //Enables preserving of new lines when going from textfield to textarea
                
                data.Notes = data.Notes ? data.Notes.replace(/(\r\n|\n|\r)/g, ' ') : ''; //ensures new lines will be shown as spaces as Notes on form is previewed in one line. newlines entered in mobile seem to use \n where as entered in web app seem to use \r
                invoiceForm.setValues(data);
                this.applyTaxRules();
                this.previousAmountTaxStatus = data.AmountTaxStatus;

                if((Ext.isDefined(data.SaveSupport) && !data.SaveSupport) || this.detailsData.Paid > 0) {
                    this.isEditable = false;
                    this.setEditable(false); //needs to be called before adding line items below so that line items can have delete x hidden if necessary
                }                
                
                var lineItemsPanel = this.getLineItems();
			    lineItemsPanel.addLineItems(data.LineItems);                
                lineItemsPanel.setCustomerId(data.CustomerId);
                lineItemsPanel.setTaxStatus(data.AmountTaxStatus);
                lineItemsPanel.setInvoiceDate(data.Date);
                
			    this.displayBalanceDue();
                this.initialFormValues = invoiceForm.getValues();
                this.getInvoiceDetail().setActionsHidden(false);                         

                this.dataLoaded = true;
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
    
    loadNewInvCode: function(){
        
        RM.AppMgr.saveServerRec('InvoiceCreate', true, null,
			function (recs) {
                this.getInvCodeFld().setValue(recs[0].InvCode);
			},
			this,
            function(recs, eventMsg){
                this.goBack();
                RM.AppMgr.showOkMsgBox(eventMsg);
            },
            'Loading...'
		);
    },
    
    isFormDirty: function(){        
        return this.lineItemsDirty || !RM.AppMgr.isFormValsEqual( this.getInvoiceForm().getValues(), this.initialFormValues);        
    },      

    onFieldTap: function (tf) {
        var fldName = tf.getName();
        
        if (fldName == 'Notes') {
            this.showNotes();
        }          
        else if(this.isEditable){
            if (fldName == 'CustomerName') {
                RM.Selectors.showCustomers(
                    null,
    				function (data) {
    				    //tf.setValue(data.Name);
    				    this.getInvoiceForm().setValues({ CustomerId: data.ContactId, CustomerName: data.Description });
                        this.getLineItems().setCustomerId(data.ContactId);
                        this.calculateBreakdown();
            		},
    				this
    			);
            }
            else if (fldName == 'Discount') {
                var oldVal = tf.getValue();
    
                RM.InvoicesMgr.showChooseDiscountPopup(
                    oldVal == 'None' ? 0 : oldVal,
    				function (disc) {
                        var newVal = (disc == 0 ? 'None' : disc);
                        if(newVal != oldVal){                        
        				    tf.setValue(newVal);
                            oldVal = newVal;
                            this.calculateBreakdown(); 
                        }
    				},
    				this
    			);
            }
        }
      

    },
    
    onAmountTaxStatusSelected: function(amountTaxStatusFld, newValue, oldValue){ 
        if(!this.dataLoaded) return;
        this.detailsData.AmountTaxStatus = newValue;
        this.previousAmountTaxStatus = oldValue;
        this.calculateBreakdown();          
        this.getLineItems().setTaxStatus(newValue);
    },

    onInvoiceDateChanged: function(dateField, newValue, oldValue) {
        if(!this.dataLoaded) return;
        //  Recalculate the invoice tax amounts, since tax rates are date dependent
        this.calculateBreakdown();
        this.getLineItems().setInvoiceDate(newValue);
    },
    
    showNotes: function(){
        
        RM.Selectors.showNoteText(
            'Notes',
            this.isEditable,
            'OK',
            this.noteText,
            function(noteText){
                RM.ViewMgr.back();
                this.noteText = noteText;
                this.getNotesFld().setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );
        
    },      
    
    onAddLineItem: function () {
        this.lineItemsDirty = true;
        this.calculateBreakdown();     
    },

    onDeleteLineItem: function () {
        this.lineItemsDirty = true;
        this.calculateBreakdown();
    },

    onEditLineItem: function(){
        this.lineItemsDirty = true;
        this.calculateBreakdown();
    },    
    
    calculateBreakdown: function () {
        
        var formVals = this.getInvoiceForm().getValues();
        var lineItems = this.getLineItems().getViewData();
        var vals = {
            CustomerId: formVals.CustomerId,
            InvoiceDate: formVals.Date, 
            AmountTaxStatus: formVals.AmountTaxStatus, 
            PreviousAmountTaxStatus: 
            this.previousAmountTaxStatus, 
            LineItems:[]
        };
        
        if (formVals.Discount.indexOf('%') > -1) {
            vals.DiscountPercentage = formVals.Discount.replace('%', '');
        }
        else if (formVals.Discount.indexOf('$') > -1) {
            vals.DiscountAmount = formVals.Discount.replace('$', '');
        }
      
        // House keeping. The calcs api doesn't handle removing things like the tax group and tax amounts when 
        // switching to NON-TAXED so we remove them first.
        if(vals.AmountTaxStatus === RM.Consts.TaxStatus.NON_TAXED) {
            lineItems = lineItems.map(function(item) {
                item.TaxGroupId = null;
                item.Tax = null;
                return item;
            });
        }
        
        // Send only the fields required by the calculation contract for line items
        vals.LineItems = lineItems.map(function(item) {
            return {
                InvoiceLineItemId: item.InvoiceLineItemId,
                ItemType: item.ItemType, 
                ItemID: item.ItemId, 
                ProjectID: item.ProjectID,
                Quantity: item.Quantity, 
                UnitPriceExTax: item.UnitPriceExTax, 
                DiscountAmount: item.DiscountAmount,
                DiscountAmountExTax: item.DiscountAmountExTax,
                DiscountPercentage: item.DiscountPercentage,
                TaxGroupID: item.TaxGroupId, 
                Tax: item.Tax, 
                TaxIsModified: item.TaxIsModified
            };            
        });         
                
        RM.AppMgr.saveServerRec('InvoiceCalc', true, vals,
			function response(respRecs) {
                var respRec = respRecs[0];                
                
                var data = this.detailsData;
                data.Amount = respRec.TotalIncludingTax;
                data.AmountExTax = respRec.TotalExcludingTax;
                data.Tax = respRec.Tax;
                data.Subtotal = respRec.Subtotal;
                data.DiscountTotal = respRec.Discount || 0;
                data.Paid = respRec.AmountPaid;
                data.BalanceDue = respRec.BalanceDue;
                
                var lineItemsPanel = this.getLineItems();
                lineItemsPanel.removeAllItems();
                
                for (var i = 0; i < lineItems.length; i++) {
                    var currentLine = lineItems[i];
                    
                    // find the result for the line
                    var resultLine = null;                    
                    Ext.Array.some(respRec.Items, function(item) {
                        if(item.InvoiceLineItemId === currentLine.InvoiceLineItemId) {
                            resultLine = item;
                            return true;
                        }
                    });
                    
                    // If the item isn't in the response, it must be removed (project/customer filtering is potentially applied server-side)
                    if(!resultLine) {
                        lineItems[i] = null;
                    }
                    else {
                        // Map the calculated values across
                        Ext.apply(currentLine, resultLine);
                    }                    
                }
                
                // Clean out any deleted items
                lineItems = Ext.Array.clean(lineItems);
                
                lineItemsPanel.setTaxStatus(vals.AmountTaxStatus);
                lineItemsPanel.addLineItems(lineItems);
                
                this.displayBalanceDue();
                
			},
			this,
            function(eventMsg){
                RM.AppMgr.showOkMsgBox(eventMsg);
                this.goBack();
            },
            'Loading...'
		);         

    },

    displayBalanceDue: function () {        
        this.getBalanceDue().setHtml('$' + RM.AppMgr.numberWithCommas(Ext.Number.toFixed(this.detailsData.BalanceDue, 2)));
    },

    onBalanceBreakdown: function () {
        RM.InvoicesMgr.showBalanceBreakdown(this.detailsData);
    },

    onInvoiceActions: function () {
        if(this.isCreate){
            RM.AppMgr.showOkMsgBox('Invoice Actions are only available after saving new invoices.');            
        }
        else{
            RM.InvoicesMgr.showActions(this.detailsData);    
        }        
    },

    goBack: function(){
        this.detailsCb.call(this.detailsCbs, 'back');
        RM.ViewMgr.back();
        this.getLineItems().removeAllItems();
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

    onOptions: function () {
        this.getInvoiceDetail().toggleOptions();
    },

    validateForm: function(vals){        
        var isValid = true;
        
        if(!vals.CustomerId){
            this.getCustomerFld().showValidation(false);
            isValid = false;
        } 
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
    },
    
    save: function () {
        var formVals = this.getInvoiceForm().getValues();        
        formVals.LineItems = this.getLineItems().getViewData();
        
        // Set the line numbers, to handle new or deleted items
        var lineNumber = 1;
        formVals.LineItems.forEach(function(item) {
            item.lineNo = lineNumber;
            
            // Remove the temporary Id for any new items, since the server is way too trusting
            if(item.IsNew) {
                delete item.InvoiceLineItemId;                
            }
            
            lineNumber += 1;
        });        
        
        var vals = Ext.applyIf(formVals, this.detailsData);
        delete vals.DiscountPerc;
        delete vals.DiscountAmount;

        if (vals.Discount.indexOf('%') > -1) {
            vals.DiscountPerc = vals.Discount.replace('%', '');
        }
        else if (vals.Discount.indexOf('$') > -1) {
            vals.DiscountAmount = vals.Discount.replace('$', '');
        }
        delete vals.Discount;
        
        vals.Notes = this.noteText;
        
        if(this.validateForm(vals)){
            if(formVals.LineItems.length > 0){
                //alert(Ext.encode(vals));
                this.detailsCb.call(this.detailsCbs, 'save', vals);
        
                RM.AppMgr.saveServerRec('Invoices', this.isCreate, vals,
        			function () {
        			    //RM.ViewMgr.back({ type: 'slide', direction: 'left' });
        			    //this.dataLoaded = false;
                        this.goBack();
        			    this.getLineItems().removeAllItems();
        			    RM.AppMgr.itemUpdated('invoice');
        			},
        			this,
                    function(recs, eventMsg){
                        RM.AppMgr.showOkMsgBox(eventMsg);                
                    }
        		);            
            }
            else{            
                RM.AppMgr.showErrorMsgBox('No items have been added to this invoice.');
            }                
        }


    }

});
