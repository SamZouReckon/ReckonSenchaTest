Ext.define('RM.controller.InvoiceLineItemC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.InvoiceLineItem'],
    config: {
        refs: {
            itemDetail: 'invoicelineitem',
            addBtn: 'invoicelineitem #add',
			itemForm: 'invoicelineitem #itemForm',
            description: 'invoicelineitem field[name=Description]',
            unitPriceExTax: 'invoicelineitem field[name=UnitPriceExTax]',
            quantity: 'invoicelineitem field[name=Quantity]',
			taxCode: 'invoicelineitem field[name=TaxGroupId]',
            tax: 'invoicelineitem field[name=Tax]',
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
            this.getTaxCode().setHidden(!this.showTaxCode);
            
            this.initShow = true;
        }           
    },
    
    setEditable: function(editable){
        this.getDescription().setReadOnly(!editable);
        this.getUnitPriceExTax().setReadOnly(!editable);
        this.getQuantity().setReadOnly(!editable);
        this.getTaxCode().setReadOnly(!editable);
        this.getTax().setReadOnly(!editable);
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
            UnitPriceExTax: formVals.UnitPriceExTax,
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
        
	}
	
});