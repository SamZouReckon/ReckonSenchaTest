Ext.define('RM.controller.InvoiceLineItemC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.InvoiceLineItem'],
    config: {
        refs: {
            itemDetail: 'invoicelineitem',
            addBtn: 'invoicelineitem #add',
			itemForm: 'invoicelineitem #itemForm',
            description: 'invoicelineitem exttextfield[name=Description]',
            unitPriceExTax: 'invoicelineitem extnumberfield[name=UnitPriceExTax]',
            quantity: 'invoicelineitem extnumberfield[name=Quantity]',
			taxCode: 'invoicelineitem selectfield[name=TaxGroupId]',
            itemNameFld: 'invoicelineitem exttextfield[name=ItemName]',
            projectId: 'invoicelineitem hiddenfield[name=ProjectID]'
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
            }
		}
    },
	
    showView: function (editable, customerId, showTaxCode, detailsData, cb, cbs) {
        
       console.log(Ext.encode(detailsData));
        this.isEditable = editable;
        this.customerId = customerId;
        this.showTaxCode = showTaxCode;        
        this.detailsCb = cb;
        this.detailsCbs = cbs;

        if(detailsData){
    	    detailsData.Discount = (detailsData.DiscountPerc && detailsData.DiscountPerc != 0) ? detailsData.DiscountPerc + '%' : 'None';
    	    detailsData.Discount = (detailsData.DiscountAmount && detailsData.DiscountAmount != 0) ? '$' + Ext.Number.toFixed(detailsData.DiscountAmount, 2) : detailsData.Discount;
            this.detailsData = detailsData;
        }
        else{
            this.detailsData = {Quantity: 1};
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
            //var data = this.detailsData;
            //data.Discount = 'None';            
    		//itemForm.setValues(Ext.applyIf(this.detailsData, {Quantity: 2}));
		    this.detailsData.Discount = (this.detailsData.DiscountPerc && this.detailsData.DiscountPerc != 0) ? this.detailsData.DiscountPerc + '%' : 'None';
		    this.detailsData.Discount = (this.detailsData.DiscountAmount && this.detailsData.DiscountAmount != 0) ? '$' + Ext.Number.toFixed(this.detailsData.DiscountAmount, 2) : this.detailsData.Discount;            
            //this.detailsData.SaleTaxCodeID = this.detailsData.TaxGroupId;
            itemForm.setValues(this.detailsData);
            /*if(!this.detailsData.SaleTaxCodeID){
                this.getTaxCode().setValue(null);   
            }*/
            this.getTaxCode().setHidden(!this.showTaxCode);
    		//itemForm.getComponent(3).setValue(this.detailsData.SaleTaxCodeID);
            
            this.initShow = true;
        }           
    },
    
    setEditable: function(editable){
        this.getDescription().setReadOnly(!editable);
        this.getUnitPriceExTax().setReadOnly(!editable);
        this.getQuantity().setReadOnly(!editable);
        this.getTaxCode().setReadOnly(!editable);
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
                        var rec = data[0];
                        //alert(Ext.encode(rec));
    				    //this.detailsData.TaxTypeID = rec.SaleTaxCodeID;//data[0].TaxCodeId;
    				    //this.getTimeSheetForm().setValues({ ItemId: data[0].ItemId, ItemName: data[0].Name, SaleTaxCodeID: data[0].SaleTaxCodeID });
                        this.detailsData.ItemName = rec.Name;
                        
                        this.getItemForm().setValues({ ItemId: rec.ItemId, ItemName:rec.ItemPath, TaxGroupId:rec.SaleTaxCodeID, UnitPriceExTax:rec.UnitPriceExTax, Description: rec.SalesDescription});
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
        
        if(vals.UnitPriceExTax == null || vals.UnitPriceExTax == ''){
            this.getUnitPriceExTax().showValidation(false);
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
		//alert(Ext.encode(formVals));
		//formVals.SaleTaxCodeID = '7654913F-9486-419C-9752-8C0C2EC91E85';
		//var taxRec = this.getTaxCode().getRecord();
		//var amount = formVals.Quantity * this.detailsData.SalePrice;

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
		    //Amount: amount,
		    //TaxGroupId: taxRec ? taxRec.get('GSTCodeID') : null, //formVals.SaleTaxCodeID,
            TaxGroupId: formVals.TaxGroupId,
			//TaxRate: taxRec.get('Rate') / 100 * amount,
            UnitPriceExTax: formVals.UnitPriceExTax,
            Description: formVals.Description
        };

        if (formVals.Discount.indexOf('%') > -1) {
            //item.DiscountAmount = 0;
            item.DiscountPerc = parseFloat(formVals.Discount.replace('%', '')); //formVals.Discount.replace('%', '');
        }
        else if (formVals.Discount.indexOf('$') > -1) {
            item.DiscountAmount = parseFloat(formVals.Discount.replace('$', '')); //formVals.Discount.replace('$', '');
            //item.DiscountPerc = 0;
        }

        //alert(Ext.encode(item));
        if(this.validateForm(item)){		
		    this.detailsCb.call(this.detailsCbs, [item]);
            RM.ViewMgr.back();
        }
        
	}
	
});