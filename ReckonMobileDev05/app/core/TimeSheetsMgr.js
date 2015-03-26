Ext.define('RM.core.TimeSheetsMgr', {
    alternateClassName: 'RM.TimeSheetsMgr',
    singleton: true,
	
	requires: ['RM.view.TimeSheetDetail', 'RM.component.PopupNotes'],

    init: function (application) {
        
    },
	
    showSelectWeekScreen: function (cb, cbs) {
        var selectWeekC = RM.AppMgr.getAppControllerInstance('RM.controller.SelectWeekC');
        selectWeekC.showView(cb, cbs);
    },

    showTimeSheetWeekly: function(data, cb,cbs){
        var timeSheetWeeklyC = RM.AppMgr.getAppControllerInstance('RM.controller.TimeSheetWeeklyC');
        timeSheetWeeklyC.showView(data, cb, cbs);
    },

	showTimeSheetDetail: function(data, cb, cbs){
		var timeSheetDetailC = RM.AppMgr.getAppControllerInstance('RM.controller.TimeSheetDetailC');
		timeSheetDetailC.showView(data, cb, cbs);
	},
	
    showTimeSheetsCal: function(){
        var timeSheetsCalC = RM.AppMgr.getAppControllerInstance('RM.controller.TimeSheetsCalendarC');
        timeSheetsCalC.showView();
    },

	addNote: function(invoiceId, cb, cbs){
		var addNote = RM.AppMgr.getAppControllerInstance('RM.controller.AddNoteC');
		addNote.showView(
			function(noteText){
				RM.AppMgr.saveServerRec('TimeEntryNotes', true, {InvoiceId: invoiceId, Text: noteText},
					function(){
						RM.ViewMgr.back();
					},
					this
				);
				
			},
			this
		);	
	},

	getTimeSheetStatusText: function (status) {
	    switch (status) {	        
	        case RM.Consts.TimeSheetStatus.NON_BILLABLE:
	            return 'Non-billable';
	        case RM.Consts.TimeSheetStatus.UNBILLED:
	            return 'Unbilled';
	        case RM.Consts.TimeSheetStatus.INVOICED:
	            return 'Invoiced';
	        case RM.Consts.TimeSheetStatus.BILLED:
	            return 'Billed';	        
	    }
	    return 'Unknown';
	}

    /*
    showTimeSheetNotes: function () {
        var notesPopup = Ext.create('RM.component.PopupNotes');
        notesPopup.show(
			function () {

			},
			this
		);

    },
    	
	getTimeEntriesStore: function(){
	
	
	}*/
	
});