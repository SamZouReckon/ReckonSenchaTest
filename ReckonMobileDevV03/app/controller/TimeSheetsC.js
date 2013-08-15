Ext.define('RM.controller.TimeSheetsC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            timesheets: 'timesheets',
            timeSheetsList: 'timesheets list',
            timeSheetsCal: 'timesheets timesheetscalendar'
        },
        control: {
            'timesheets': {
                show: 'onShow',
                calshow: 'onCalShow',
                calhide: 'onCalHide'
            },
            'timesheets sortsearchbar': {
                search: function (val) {
                    this.searchFilter = val;
                    this.setLoadTimer();
                },

                searchclear: function () {
                    delete this.searchFilter;
                    this.loadList();
                }
            },	            
            'timesheetscalendar': {
                monthselect: 'onMonthSelect',
                dateselect: 'onDateSelect'

            },
            'timesheets list': {
                select: 'onItemSelect'
            },
            'timesheets #add': {
                tap: 'add'
            }
        }

    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },

    onShow: function () {
        var store = Ext.data.StoreManager.lookup('TimeEntries');
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('TimeEntries'));
        //store.load();
        //this.loadList();
    },
    
    onCalShow: function(){
        this.getTimeSheetsCal().getComponent(0).refresh();
    },
    
    onCalHide: function(){
        
    },    

    onItemUpdated: function (itemType) {
        if (itemType == 'timesheet' && this.getTimesheets()) {
            this.loadCalendar();
            this.loadList();
        }
    },

    onItemSelect: function (list, rec) {

        if (rec.data.TimeEntryId == '00000000-0000-0000-0000-000000000000') {
            this.add();
            setTimeout(function () { list.deselect(rec); }, 50);
        }
        else {
            // Delay the selection clear so get a flash of the selection
            setTimeout(function () { list.deselect(rec); }, 500);
            RM.TimeSheetsMgr.showTimeSheetDetail(rec.data,
				function (closeType, data) {
				    if (closeType == 'save')
				        this.loadList();
				},
				this
			);
        }
    },

    onMonthSelect: function (date) {
        this.onDateSelect(date);
    },

    onDateSelect: function (date) {
        //var store = Ext.data.StoreManager.lookup('TimeEntries');
        //this.getTimeSheetsList().getStore().filter('startDate', date);
        this.startDateFilter = date;
        this.loadList();
    },

    add: function () {
        RM.TimeSheetsMgr.showTimeSheetDetail(null,
			function (closeType, data) {
			    //if(closeType == 'save')
			    //	Ext.Msg.alert('Save', Ext.encode(data), Ext.emptyFn);
			    if (closeType == 'save')
			        this.loadList();
			    //return null;
			},
			this
		);
    },

    loadCalendar: function(){
        //Ext.getStore('TimeEntriesCalendar').load();
        RM.AppMgr.loadStore(Ext.getStore('TimeEntriesCalendar'));
    },
    
    
    loadList: function () {
        var store = this.getTimeSheetsList().getStore();
        store.clearFilter();
        if(this.searchFilter){
            store.filter('search', this.searchFilter);            
        }
        if(this.startDateFilter){
            store.filter('startDate', this.startDateFilter);            
        }        
        
        RM.AppMgr.loadStore(store);
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }

});