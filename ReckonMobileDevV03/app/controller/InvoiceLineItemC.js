Ext.define('RM.controller.InvoiceLineItemC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.InvoiceLineItem','RM.util.FormUtils'],
    config: {
        refs: {
            itemDetail: 'invoicelineitem',
            addBtn: 'invoicelineitem #add',
			itemForm: 'invoicelineitem #itemForm',
            description: 'invoicelineitem field[name=Description]',
            unitPrice: 'invoicelineitem field[name=UnitPrice]',
            quantity: 'invoicelineitem field[name=Quantity]',
			taxCode: 'invoicelineitem field[name=TaxGroupId]',
            tax: 'invoicelineitem field[name=Tax]',
            amount: 'invoicelineitem field[name=Amount]',
            itemNameFld: 'invoicelineitem field[name=ItemName]',
            projectId: 'invoicelineitem field[name=ProjectID]'
        },
        control: {
            'invoicelineitem': {
                show: 'onShow'
            },
            'invoicelineitem #itemForm exttextfield': {
                tap: 'onFieldTap'
            },			
            'invoicelineitem #back': {
                tap: 'back'
            },		
            'invoicelineitem #add': {
                tap: 'add'
            },
            unitPrice: {
                change: 'unitPriceChanged'
            },
            tax: {
                change: 'taxAmountChanged'
            },
            quantity: {
                change: 'quantityChanged'
            }
		}
    },
	
    isTaxInclusive: function() {
        return this.taxStatusCode === RM.Consts.TaxStatus.INCLUSIVE;
    },
    
    showView: function (editable, customerId, options, detailsData, cb, cbs) {
        
       console.log(Ext.encode(detailsData));
        this.isEditable = editable;
        this.customerId = customerId;
        this.taxStatusCode = options.taxStatus; 
        this.invoiceDate = options.invoiceDate;
        this.detailsCb = cb;
        this.detailsCbs = cbs;

        if(detailsData){
    	    detailsData.Discount = (detailsData.DiscountPerc && detailsData.DiscountPerc != 0) ? detailsData.DiscountPerc + '%' : 'None';
    	    detailsData.Discount = (detailsData.DiscountAmount && detailsData.DiscountAmount != 0) ? '$' + Ext.Number.toFixed(detailsData.DiscountAmount, 2) : detailsData.Discount;
            this.detailsData = detailsData;        
        }
        else{
            this.detailsData = {Quantity: 1, TaxIsModified: false};
        }        
        
        var view = this.getItemDetail();
        
        this.initShow = false;
        
        if (!view){
            view = { xtype: 'invoicelineitem' };
        }
                     
        RM.ViewMgr.showPanel(view);
    },
	
    onShow: function () {
        var itemForm = this.getItemForm();
        
        this.getAddBtn().setHidden(!this.isEditable);
        this.setEditable(this.isEditable);
        
        if(!this.initShow){
            itemForm.reset();

		    this.detailsData.Discount = (this.detailsData.DiscountPerc && this.detailsData.DiscountPerc != 0) ? this.detailsData.DiscountPerc + '%' : 'None';
		    this.detailsData.Discount = (this.detailsData.DiscountAmount && this.detailsData.DiscountAmount != 0) ? '$' + Ext.Number.toFixed(this.detailsData.DiscountAmount, 2) : this.detailsData.Discount;            
            
            itemForm.setValues(this.detailsData);            
            if(!this.isTaxInclusive()) {
                this.getUnitPrice.setValue(this.detailsData.UnitPriceExTax);
            }
            
            this.getTaxCode().setHidden(this.taxStatusCode === RM.Consts.TaxStatus.NON_TAXED);
            
            if(this.detailsData.ItemId) { this.getItemDetail().showDetailsFields(); }
            
            this.initShow = true;
        }           
    },
    
    setEditable: function(editable){
        if(!editable) { RM.util.FormUtils.makeAllFieldsReadOnly(this.getItemForm()); }    
    },

    onFieldTap: function (tf) {
        if(this.isEditable){
    		if (tf.getName() == 'Discount') {
                var discVal = tf.getValue();
    		    RM.InvoicesMgr.showChooseDiscountPopup(
                    discVal == 'None' ? 0 : discVal,
    				function (disc) {
    				    tf.setValue(disc == 0 ? 'None' : disc);                    
    				},
    				this
    			);
            }
            else if (tf.getName() == 'ProjectName') {
                RM.Selectors.showProjects(
                    this.customerId,
                    null,
    				function (data) {
    				    this.getItemForm().setValues({ ProjectID: data.ProjectId, ProjectName: data.ProjectPath });
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
                        this.itemChanged(data[0])                        
    				},
    				this
    			);
            }
        }           

    },	
	
    
    back: function () {
        RM.ViewMgr.back();
    },

    
    validateForm: function(vals){        
        var isValid = true;
        
        if(!vals.ItemId){
            this.getItemNameFld().showValidation(false);
            isValid = false;
        }        

        if(!vals.TaxGroupId){
            this.getTaxCode().showValidation(false);
            isValid = false;
        }
        
        if(!vals.UnitPriceExTax){
            this.getUnitPrice().showValidation(false);
            isValid = false;
        }        
        
        if(!isValid){            
            RM.AppMgr.showInvalidFormMsg();
        }
        
        return isValid;
    },       
    
	add: function(){
		var ITEM_TYPE_CHARGEABLE_ITEM = 1;
		
		var formVals = this.getItemForm().getValues();

		var item = { //fields corresponding to InvoiceLineItemDto
		    //InvoiceItemId: null, //is assigned at server
            //InvoiceId: null, //can be determined at server as line item is already inside the InvoiceDto
		    ItemType: ITEM_TYPE_CHARGEABLE_ITEM,
		    ItemId: formVals.ItemId,
		    ItemName: formVals.ItemName,
            ItemPath: formVals.ItemPath,
            ProjectID: formVals.ProjectID,
            ProjectName: formVals.ProjectName,
		    Quantity: formVals.Quantity,
            TaxGroupId: formVals.TaxGroupId,
			Tax: formVals.Tax,
            TaxIsModified: this.detailsData.TaxIsModified,
            UnitPriceExTax: this.detailsData.UnitPriceExTax,
            Description: formVals.Description
        };

        if (formVals.Discount.indexOf('%') > -1) {
            item.DiscountPerc = parseFloat(formVals.Discount.replace('%', ''));
        }
        else if (formVals.Discount.indexOf('$') > -1) {
            item.DiscountAmount = parseFloat(formVals.Discount.replace('$', ''));
        }

        //alert(Ext.encode(item));
        if(this.validateForm(item)){		
		    this.detailsCb.call(this.detailsCbs, [item]);
            RM.ViewMgr.back();
        }
        
	},
    
    itemChanged: function(newItem) {
        // An item has been selected from the list:
        // Reset item fields
        this.detailsData.ItemName = newItem.Name;
        this.detailsData.UnitPriceExTax = newItem.UnitPriceExTax;
        this.detailsData.TaxIsModified = false;
        
        this.ignoreEvents = true;
        this.getItemForm().setValues({ 
            ItemId: newItem.ItemId, 
            ItemName:newItem.ItemPath, 
            TaxGroupId:newItem.SaleTaxCodeID,         
            Description: newItem.SalesDescription,
            UnitPrice: newItem.UnitPriceExTax
        });
        this.ignoreEvents = false;
        this.getServerCalculatedValues();
    },
    
    unitPriceChanged: function(field, newValue, oldValue) {
        // Only respond to changes triggered by the user, not events triggered during page loading
        if(!this.initShow || this.ignoreEvents) return;
        if(newValue === oldValue) return;
        
        if (this.isTaxInclusive())
        {
            //editing a tax incl price overrides any previously set tax amount
            this.detailsData.TaxIsModified = false;
            this.getServerCalculatedValues(newValue);
        }
        else
        {
            this.getServerCalculatedValues();
        }
   },
    
    taxAmountChanged: function(field, newValue, oldValue) {
        // Only respond to changes triggered by the user, not events triggered during page loading
        if(!this.initShow || this.ignoreEvents) return;
        
        this.detailsData.TaxIsModified = true;        
        this.getServerCalculatedValues();
    },
    
    projectChanged: function() {
        //If an item is already selected, determine the affect on that item (if there are project overrides for the unit price)
    },

    quantityChanged: function() {
        // Only respond to changes triggered by the user, not events triggered during page loading
        if(!this.initShow || this.ignoreEvents) return;
        
        this.getServerCalculatedValues();
    },
    
    getServerCalculatedValues: function(newUnitPrice) {
        // build a dummy invoice
        var invoice = { 
            AmountTaxStatus: this.taxStatusCode, 
            PreviousAmountTaxStatus: this.taxStatusCode, 
            CustomerId: this.customerId,
            InvoiceDate : this.invoiceDate,
            LineItems:[]
        };
        
        // set a single line item using current details
        var formVals = this.getItemForm().getValues();
        var lineItem = {
            ItemId: formVals.ItemId,
            Quantity: formVals.Quantity,
            TaxGroupID: formVals.TaxGroupId,
            Tax: formVals.Tax,
            Amount: formVals.Amount,
            TaxIsModified: this.detailsData.TaxIsModified,
            UnitPriceExTax: this.detailsData.UnitPriceExTax
        };
        
        if (formVals.Discount.indexOf('%') > -1) {
            lineItem.DiscountPerc = parseFloat(formVals.Discount.replace('%', ''));
        }
        else if (formVals.Discount.indexOf('$') > -1) {
            lineItem.DiscountAmount = parseFloat(formVals.Discount.replace('$', ''));
        }
                
        if(newUnitPrice) {            
            lineItem.UnitPrice = newUnitPrice;
        }
        
        invoice.LineItems.push(lineItem);
        
        // call the invoice calculation method
        RM.AppMgr.saveServerRec('InvoiceCalc', true, invoice,
			function response(responseRecords) {
                var calculated = responseRecords[0].Items[0];
                
                // record the calculated values as necessary
                this.detailsData.UnitPriceExTax = calculated.UnitPriceExTax;
                
                // update the form with the results
                this.ignoreEvents = true;                                
                this.getItemForm().setValues({
                    UnitPrice: this.isTaxInclusive() ? calculated.UnitPrice : calculated.UnitPriceExTax,
                    Amount: calculated.Amount,
                    Tax: calculated.Tax                
                });
                this.getItemDetail().showDetailsFields();
                this.ignoreEvents = false;
			},
			this,
            function(eventMsg){
                alert(eventMsg);                
            },
            'Working...'
		);  
    }
	
});