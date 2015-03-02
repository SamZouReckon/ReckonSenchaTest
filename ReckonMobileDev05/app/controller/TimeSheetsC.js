Ext.define('RM.controller.TimeSheetsC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            timesheets: 'timesheets',
            timeSheetsList: 'timesheets list',
            timeSheetsCal: 'timesheets rmcalendar'
        },
        control: {
            'timesheets': {
                show: 'onShow'                
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
            'timesheets list': {
                select: 'onItemSelect'                
            },
            'timesheets #add': {
                tap: 'add'
            },
            'timesheets rmcalendar': {
                weekChange: 'onWeekChange',
                monthChange: 'onMonthChange'
            },
            'timesheets tabpanel': {
                activeitemchange: 'onActiveItemChange'
            }
        }
    },

    init: function () {
        this.getApplication().addListener('itemupdated', 'onItemUpdated', this);
    },   

    onShow: function () {
        var store = this.getTimeSheetsList().getStore();
        store.getProxy().setUrl(RM.AppMgr.getApiUrl(store.getStoreId()));        
        this.listLoaded = false;
    },

    onActiveItemChange: function (tabpanel, value, oldValue, eOpts) {        
        if (value.config.title === 'List') {
            this.loadList();
        }
        if (value.config.title === 'Calendar') {
            this.getTimeSheetsCal().refreshCalendarData();
        }
    },

    onWeekChange: function (weekDaysArray) {
        this.startDateFilter = weekDaysArray[0];
        this.endDateFilter = weekDaysArray[6];

        if (!this.listLoaded) {
            this.loadList();
            this.listLoaded = true;
        }
    },

    onMonthChange: function (start, end){        
    },

    onItemUpdated: function (itemType) {
        if (itemType == 'timesheet' && this.getTimesheets()) {            
            this.loadList();
        }
    },

    onItemSelect: function (list, rec) {        
        // Delay the selection clear so get a flash of the selection
        setTimeout(function () { list.deselect(rec); }, 500);
        RM.TimeSheetsMgr.showTimeSheetDetail(rec.data,
		    function (closeType, data) {
			    if (closeType == 'save')
				    this.loadList();
		    },
		    this
	    );        
    }, 

    add: function () {
        RM.TimeSheetsMgr.showTimeSheetDetail(null,
			function (closeType, data) {			    
			    if (closeType == 'save')
			        this.loadList();			    
			},
			this
		);
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
        if (this.endDateFilter) {
            store.filter('endDate', this.endDateFilter);
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