Ext.define('RM.controller.InvoiceDetailC', {
    extend: 'Ext.app.Controller',

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
                show: 'onShow'
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
                itemselected: 'onAmountTaxStatusSelected'
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
            }
        }
    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },

    showView: function (isCreate, data, cb, cbs) {
        this.isCreate = isCreate;
        this.detailsData = data ? data : {};
        this.detailsCb = cb;
        this.detailsCbs = cbs;

        this.noteText = '';
        
        if (isCreate) {
            this.detailsData = Ext.applyIf(this.detailsData, { Status: RM.Consts.InvoiceStatus.DRAFT, AmountTaxStatus: RM.Consts.TaxStatus.INCLUSIVE });
        }

        this.isEditable = RM.InvoicesMgr.isInvoiceEditable(this.detailsData.Status);
        
        var view = this.getInvoiceDetail();
        if (!view){
            view = { xtype: 'invoicedetail' };
        }           
        RM.ViewMgr.showPanel(view);
    },

    onShow: function () {        
        
        this.getInvoiceTitle().setHtml(this.isCreate ? 'Add Invoice' : 'View Invoice');
        this.getSaveBtn().setText(this.isCreate ? 'ADD' : 'SAVE');
        this.getInvStatus().setHtml(RM.InvoicesMgr.getInvoiceStatusText(this.detailsData.Status));
        this.lineItemsDirty = false;
        
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
                
                var data = { Date: new Date(), Discount: 'None', Status: RM.Consts.InvoiceStatus.DRAFT, AmountTaxStatus: RM.Consts.TaxStatus.INCLUSIVE };
                if (this.detailsData && this.detailsData.CustomerId) {
                    data.CustomerId = this.detailsData.CustomerId;
                    data.CustomerName = this.detailsData.CustomerName;
                    this.getLineItems().setCustomerId(data.CustomerId);
                }
                invoiceForm.reset();
                invoiceForm.setValues(data);
                this.previousAmountTaxStatus = data.AmountTaxStatus;
                this.getBalanceDue().setHtml('');
                this.initialFormValues = invoiceForm.getValues();
                this.getLineItems().setCustomerId(null);
            }

            this.dataLoaded = true;

        }

    },

    onItemUpdated: function (itemType) {
        if (itemType == 'invoice' && !this.isCreate) {
            this.loadFormData();
        }
    },
    
    setEditable: function(editable){
        this.getSaveBtn().setHidden(!editable);

        this.getDueDateFld().setReadOnly(!editable);
        this.getDateFld().setReadOnly(!editable);        
        this.getRefNrFld().setReadOnly(!editable);
        this.getAmountsFld().setReadOnly(!editable);
        
        this.getLineItems().setIsEditable(editable);
    },    

    loadFormData: function () {
        RM.AppMgr.getServerRecById('Invoices', this.detailsData.InvoiceId,
			function (data) {
			    //{"InvoiceId":"cedb2be2-07a6-422a-8fc5-a1b613ed5014","CustomerId":"09cb09ce-2e06-48b9-a9de-72790de0befe","CustomerName":"Applie","InvCode":"INV0000000068","Date":"2013-03-05T00:00:00","DueDate":"2013-03-10T00:00:00","SentDt":"2013-03-05T00:00:00","DueDays":-2,"DiscountPerc":null,"DiscountAmount":null,"Amount":47.8400,"Ref":null,"AmountTaxStatus":1,"Status":1,"LineItems":[{"InvoiceItemId":"bd15d832-7416-44e9-a020-0f1eea58659c","InvoiceId":"cedb2be2-07a6-422a-8fc5-a1b613ed5014","Quantity":16.0000,"Name":"Granny Smith Apples","Amount":47.8400,"ItemType":1,"ItemId":"71ed70da-63f3-4409-8ceb-52d5197a23a4","Description":"Granny Smith Apples","DiscountAmount":null,"DiscountPerc":null,"TaxRate":0.0000,"TaxCodeId":"7654913f-9486-419c-9752-8c0c2ec91e85","UnitPrice":2.9900}],"TemplateID":"cc09848f-db2a-4471-99d9-3c682c34efdb","Tax":0.0000,"SubTotal":47.8400,"Paid":0.0,"BalanceDue":47.8400}
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
                
                //data.Notes = data.Notes ? data.Notes.replace(/(\r\n|\n|\r)/g, ' ') : '';
                invoiceForm.setValues(data);
                this.previousAmountTaxStatus = data.AmountTaxStatus;
                
                var lineItemsPanel = this.getLineItems();
			    lineItemsPanel.addLineItems(data.LineItems);
                lineItemsPanel.setShowItemTax((data.AmountTaxStatus == RM.Consts.TaxStatus.INCLUSIVE) || (data.AmountTaxStatus == RM.Consts.TaxStatus.EXCLUSIVE));
                lineItemsPanel.setCustomerId(data.CustomerId);
                
			    this.displayBalanceDue();
                this.initialFormValues = invoiceForm.getValues();

			},
			this,
            function(eventMsg){
                alert(eventMsg);                
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
                alert(eventMsg);                
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
    
    onAmountTaxStatusSelected: function(amountTaxStatusFld){
        this.calculateBreakdown();
        this.previousAmountTaxStatus = amountTaxStatusFld.getValue();
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
        
        var formVals = this.getInvoiceForm().getValues(), lineItems = this.getLineItems().getViewData()
        var vals = {InvoiceDate: formVals.Date, AmountTaxStatus: formVals.AmountTaxStatus, PreviousAmountTaxStatus: this.previousAmountTaxStatus, LineItems:[]};
        

        if (formVals.Discount.indexOf('%') > -1) {
            vals.DiscountPercentage = formVals.Discount.replace('%', '');
        }
        else if (formVals.Discount.indexOf('$') > -1) {
            vals.DiscountAmount = formVals.Discount.replace('$', '');
        }
      
        for (var i = 0; i < lineItems.length; i++) {
            var lineItemVals = {ItemType: lineItems[i].ItemType, ItemID: lineItems[i].ItemId, Quantity: lineItems[i].Quantity, UnitPriceExTax: lineItems[i].UnitPriceExTax, TaxGroupID: lineItems[i].TaxGroupId};
            
            if(lineItems[i].DiscountPerc){
                lineItemVals.DiscountPercentage = lineItems[i].DiscountPerc;
            }
            if(lineItems[i].DiscountAmount){
                lineItemVals.DiscountAmount = lineItems[i].DiscountAmount;
            }            

            vals.LineItems.push(lineItemVals);
        }        
        
        //console.log(Ext.encode(vals));
        //return;
        
        RM.AppMgr.saveServerRec('InvoiceCalc', true, vals,
			function response(respRecs) {
                var respRec = respRecs[0];
                //{"Items":[{"InvoiceLineItemID":"00000000-0000-0000-0000-000000000000","Tax":null,"TaxExclusiveAmount":null,"DiscountedTaxExclusiveAmount":null,"DiscountedTaxAmount":null,"Amount":5.50,"LineText":"4 x Line Desc"},{"InvoiceLineItemID":"00000000-0000-0000-0000-000000000000","Tax":null,"TaxExclusiveAmount":null,"DiscountedTaxExclusiveAmount":null,"DiscountedTaxAmount":null,"Amount":5.50,"LineText":"2 x Line Desc"},{"InvoiceLineItemID":"00000000-0000-0000-0000-000000000000","Tax":null,"TaxExclusiveAmount":null,"DiscountedTaxExclusiveAmount":null,"DiscountedTaxAmount":null,"Amount":5.50,"LineText":"1 x Line Desc"},{"InvoiceLineItemID":"00000000-0000-0000-0000-000000000000","Tax":null,"TaxExclusiveAmount":null,"DiscountedTaxExclusiveAmount":null,"DiscountedTaxAmount":null,"Amount":5.50,"LineText":"1 x Line Desc"}],"InvoiceAmount":65.60,"InvoiceDiscount":6.60,"InvoiceTax":7.25,"Subtotal":59.50,"AlreadyPaid":10.50,"BalanceDue":55.10}
                //InvoiceAmount":65.60,"InvoiceDiscount":6.60,"InvoiceTax":7.25,"Subtotal":59.50,"AlreadyPaid":10.50,"BalanceDue":55.10
                
                var data = this.detailsData;
                data.Amount = respRec.InvoiceAmount;
                data.Tax = respRec.InvoiceTax ? respRec.InvoiceTax : 0;
                data.Subtotal = respRec.Subtotal;
                data.DiscountTotal = respRec.Discount ? respRec.Discount : 0;
                data.Paid = respRec.AmountPaid;
                data.BalanceDue = respRec.BalanceDue;
                
                var lineItemsPanel = this.getLineItems();
                lineItemsPanel.removeAllItems();
                
                for (var i = 0; i < lineItems.length; i++) {
                    lineItems[i].Amount = respRec.Items[i].Amount;
                    if(respRec.Items[i].DiscountAmount){
                        lineItems[i].DiscountAmount = respRec.Items[i].DiscountAmount;
                    }
                }
                
                lineItemsPanel.setShowItemTax((vals.AmountTaxStatus == RM.Consts.TaxStatus.INCLUSIVE) || (vals.AmountTaxStatus == RM.Consts.TaxStatus.EXCLUSIVE));
                lineItemsPanel.addLineItems(lineItems);
                
                this.displayBalanceDue();
                
			},
			this,
            function(eventMsg){
                alert(eventMsg);                
            },
            'Loading...'
		);         

    },

    displayBalanceDue: function () {
        //alert(Ext.encode(this.detailsData));
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
        //this.validateForm();
        
        //alert(this.getLineItems());
        var formVals = this.getInvoiceForm().getValues();
        //var lineItemData = this.getLineItems().getViewData();
        //alert(Ext.encode(lineItemData));
        //alert(Ext.encode(this.detailsData));
        formVals.LineItems = this.getLineItems().getViewData();
        
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
                        alert(eventMsg);                
                    }
        		);            
            }
            else{            
                RM.AppMgr.showErrorMsgBox('No items have been added to this invoice.');
            }                
        }


    }

});