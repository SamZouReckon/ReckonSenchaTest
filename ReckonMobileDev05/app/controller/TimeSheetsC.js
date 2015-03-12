Ext.define('RM.controller.TimeSheetsC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            timesheets: 'timesheets',
            timeSheetsList: 'timesheets list',
            timeSheetsCal: 'timesheets rmcalendar',
            sortSearchBar: 'timesheets sortsearchbar'
        },
        control: {
            'timesheets': {
                show: 'onShow'                
            },
            'timesheets sortsearchbar': {
                sort: 'onSort',
                search: 'onSearch',
                searchclear: 'onSearchClear'
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
        var sortOptions = this.getSortSearchBar().config.sortfields;
        if (sortOptions.length > 0) {
            this.loadListHeaderAndItemTpl(sortOptions[0].value);
        }        
    },

    loadListHeaderAndItemTpl: function (val) {
        this.sortVal = val;
        this.getTimeSheetsList().getStore().setGrouper({
            sortProperty: val,
            groupFn: function (item) {
                if (val === 'Date') {
                    return Ext.Date.format(item.get('Date'), 'j M Y');
                }
                else {
                    return !item.get(val) ? 'None' : item.get(val);
                }
            }
        });

        if (val !== 'Date') {
            this.getTimeSheetsList().setItemTpl(new Ext.XTemplate(
                                    '<tpl>',
                                        '<div class = "rm-colorgrey">',
                                        '{[this.formatDate(values.Date)]}',
                                        '<span class = "rm-colorlightgrey rm-ml5">({[RM.AppMgr.minsToTime(values.Duration)]})</span>',
                                        '</div>',
                                        '<div class = "rm-fontsize70">',
                                        '{[this.showStatus(values.StatusCode)]}',
                                        '</div>',
                                    '</tpl>',
                                    {
                                        formatDate: function (val) {
                                            return Ext.Date.format(val, 'j M Y');
                                        },
                                        showStatus: function (val) {
                                            return RM.TimeSheetsMgr.getTimeSheetStatusText(val);
                                        }
                                    }
                                ));
        }
        else {
            this.getTimeSheetsList().setItemTpl(new Ext.XTemplate(
                                    '<tpl>',
                                        '<div class = "rm-colorgrey">',
                                        '{[this.handleCustomerName(values.CustomerName)]}',
                                        '<span class = "rm-colorlightgrey rm-ml5">({[RM.AppMgr.minsToTime(values.Duration)]})</span>',
                                        '</div>',
                                        '<div class = "rm-fontsize70">',
                                        '{[this.showStatus(values.StatusCode)]}',
                                        '</div>',
                                    '</tpl>',
                                    {
                                        handleCustomerName: function (val) {
                                            return val ? val : 'No Customer';
                                        },
                                        showStatus: function(val){
                                            return RM.TimeSheetsMgr.getTimeSheetStatusText(val);
                                        }
                                    }
                                ));
        }
    },

    onSort: function(val){
        this.loadListHeaderAndItemTpl(val);
    },

    onSearch: function(val){
        this.searchFilter = val;
        this.setLoadTimer();
    },

    onSearchClear: function(){
        delete this.searchFilter;
        this.loadList();
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
        RM.AppMgr.showCustomiseButtonMsgBox("Select timesheet entry method",'', 'WEEKLY', 'DAILY','CANCEL',
                                 function (result) {
                                     if (result === 'yes') {
                                         return;
                                     }
                                     else if (result === 'no')
                                     {
                                         return;
                                     }
                                     else {
                                         //Cancel
                                         return;
                                     }
                                 }, this);
        //RM.TimeSheetsMgr.showTimeSheetDetail(null,
		//	function (closeType, data) {			    
		//	    if (closeType == 'save')
		//	        this.loadList();			    
		//	},
		//	this
		//);
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