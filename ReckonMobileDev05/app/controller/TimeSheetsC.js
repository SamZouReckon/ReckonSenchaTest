Ext.define('RM.controller.TimeSheetsC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            timesheets: 'timesheets',
            tabPanel: 'timesheets tabpanel',
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
                monthChange: 'onMonthChange',
                weekSelect: 'onWeekSelected'
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

    onWeekSelected: function () {
        this.getTabPanel().setActiveItem(0);
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

        this.getTimeSheetsList().setItemTpl(new Ext.XTemplate(
                                        '<div class = "rm-colorgrey rm-nextgrayarrow">',
                                        '<tpl if = "this.isSortByDate()">',
                                        '{[this.handleCustomerName(values.CustomerName)]}',
                                        '<tpl else>',
                                        '{[this.formatDate(values.Date)]}',
                                        '</tpl>',
                                        '<span class = "rm-colorlightgrey rm-ml5">({[RM.AppMgr.minsToTime(values.Duration)]})</span>',
                                        '</div>',
                                        '<div class = "rm-fontsize70">',
                                        '{[this.showStatus(values.Status)]}',
                                        '</div>',
                                        {
                                            isSortByDate: function () {
                                                return val === 'Date';
                                            },
                                            formatDate: function (valDate) {
                                                return Ext.Date.format(valDate, 'j M Y');
                                            },
                                            handleCustomerName: function (valName) {
                                                return valName ? valName : 'No Customer';
                                            },
                                            showStatus: function (valStatus) {
                                                return RM.TimeSheetsMgr.getTimeSheetStatusText(valStatus);
                                            }
                                        }
                                ));


    },

    onSort: function (val) {
        this.loadListHeaderAndItemTpl(val);
    },

    onSearch: function (val) {
        this.searchFilter = val;
        this.setLoadTimer();
    },

    onSearchClear: function () {
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
        //Week start Monday and end Sunday
        this.startDateFilter = weekDaysArray[0];
        this.endDateFilter = weekDaysArray[6];

        if (!this.listLoaded) {
            this.loadList();
            this.listLoaded = true;
        }
    },

    onMonthChange: function (start, end) {
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
        if (this.searchFilter) {
            store.filter('search', this.searchFilter);
        }
        if (this.startDateFilter) {
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