Ext.define('RM.core.Selectors', {
    alternateClassName: 'RM.Selectors',
    singleton: true,

	requires: ['RM.view.CashBooks', 'RM.view.Projects', 'RM.view.Suppliers', 'RM.view.ItemsAmounts', 'RM.view.ItemDetail'],

    init: function (application) {
		this.app = application;	
		
    },
	
	showCashBooks: function(cb, cbs){
		var cashBooksC = RM.AppMgr.getAppControllerInstance('RM.controller.CashBooksC');
		cashBooksC.showView(cb, cbs);	
	},		
	
	showCustomers: function(projectId, cb, cbs){
		var customersC = RM.AppMgr.getAppControllerInstance('RM.controller.CustomersC');
		customersC.showView(projectId, cb, cbs);
	},	
	
	showProjects: function(customerId, supplierId, cb, cbs){
		var projectsC = RM.AppMgr.getAppControllerInstance('RM.controller.ProjectsC');
		projectsC.showView(customerId, supplierId, cb, cbs);
	},	
	
	showSuppliers: function(cb, cbs){
		var suppliersC = RM.AppMgr.getAppControllerInstance('RM.controller.SuppliersC');
		suppliersC.showView(cb, cbs);
	},
	
	showItems: function(showItemTax, projectId, selectDetails, cb, cbs){
	    //var itemsC = RM.AppMgr.getAppControllerInstance('RM.controller.ItemsC');
	    var itemsC = RM.AppMgr.getAppControllerInstance('RM.controller.ItemsAmountsC');
		itemsC.showView(showItemTax, projectId, selectDetails, cb, cbs);
	},
    
    showAccounts: function(selectDetails, cb, cbs){
        RM.ViewMgr.showLoadingMask(); //to prevent double tap on accounts field
        var accountsC = RM.AppMgr.getAppControllerInstance('RM.controller.AccountsC');
		accountsC.showView(selectDetails, cb, cbs);
        setTimeout(function () { RM.ViewMgr.hideLoadingMask(); }, 500);
    },

	showItemDetail: function(showTaxCode, item, cb, cbs){
	    var itemDetailC = RM.AppMgr.getAppControllerInstance('RM.controller.ItemDetailC');
		itemDetailC.showView(showTaxCode, item, cb, cbs);
    },
    
    showReceiptPhotoPreview: function(takePhoto, imgData, cb, cbs){        
        var receiptPhotoPreviewC = RM.AppMgr.getAppControllerInstance('RM.controller.ReceiptPhotoPreviewC');        
		receiptPhotoPreviewC.showView(takePhoto, imgData, cb, cbs); 
    },    

	showHistory: function(historyTitle, historyType, historyItemId){
		var history = RM.AppMgr.getAppControllerInstance('RM.controller.HistoryC');
		history.showView(historyTitle, historyType, historyItemId);
	},
	
	addNote: function(historyType, historyItemId, cb, cbs){
		var addNoteC = RM.AppMgr.getAppControllerInstance('RM.controller.AddNoteC');
		addNoteC.showView(
            'Add a note',
            true,
            'SAVE',
            '',
			function(noteText){
				RM.AppMgr.saveServerRec('HistoryNotes', true, {HistoryType: historyType, HistoryItemId: historyItemId, Text: noteText},
					function(){
                        if(cb)
                            cb.call(cbs, noteText);
						RM.ViewMgr.back();
					},
					this
				);
				
			},
			this
		);	
	},
    
    showNoteText: function(title, isEditable, saveText, text, cb, cbs){
        var addNoteC = RM.AppMgr.getAppControllerInstance('RM.controller.AddNoteC');
		addNoteC.showView(title, isEditable, saveText, text, cb, cbs);        
     }
    
});