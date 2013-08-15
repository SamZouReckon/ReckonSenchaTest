Ext.define('RM.core.TimeSheetsMgr', {

    singleton: true,
	
	requires: ['RM.view.TimeSheetDetail', 'RM.component.PopupNotes'],

    init: function (application) {
        
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