Ext.define('RM.controller.CashBooksC', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            cashBooks: 'cashbooks',
            cashBooksList: 'cashbooks list'
        },
        control: {
            'cashbooks sortsearchbar': {
                sort: 'onSort',

                search: function (val) {
                    var store = this.getCashBooksList().getStore();
                    store.clearFilter();
                    store.filter('search', val);
                    this.setLoadTimer();
                },

                searchclear: function () {
                    this.getCashBooksList().getStore().clearFilter();
                    this.loadList();
                }
            },
            'cashbooks list': {
                itemtap: 'onItemTap'
            }
        }

    },

    showView: function (cb, cbs) {
        this.selectCb = cb;
        this.selectCbs = cbs;
        var view = this.getCashBooks();
        if (!view){
            view = { xtype: 'cashbooks' };
        }
        
        //RM.ViewMgr.clearBackStack(); //don't clear it as may have come from select cashbook in slide nav
        RM.ViewMgr.showPanel(view);

        var store = this.getCashBooksList().getStore();
        store.getProxy().setUrl(RM.AppMgr.getApiUrl('CashBooks'));
        this.loadList();

    },

    onSort: function (val) {
        this.getCashBooksList().getStore().sort(val);
        this.loadList();
    },

    onItemTap: function (list, index, target, rec) {
        setTimeout(function () { list.deselect(rec); }, 500);
        this.selectCb.call(this.selectCbs, rec.data);
    },

    loadList: function () {
        RM.AppMgr.loadStore(
            this.getCashBooksList().getStore(),
            function(recs){
                if(recs.length == 0){
                    RM.AppMgr.showOkMsgBox('You do not have any books to select.', RM.AppMgr.lock, RM.AppMgr);
                }
            },
            this
        
        );
    },

    setLoadTimer: function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
        this.loadTimer = Ext.defer(this.loadList, 1000, this);
    }

});