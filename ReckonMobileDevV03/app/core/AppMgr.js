RM.Consts = {
    App: {VERSION: 0.001, CORDOVA_CONTAINER: 1, WEB_CONTAINER: 2},
    Api: {TIME_OUT: 12000, STORE_LOAD_TIME_OUT: 7000},
    Log: {UPLOAD_KEY: 'rmey467rt'},
    Events: {OP: 5, ERROR_GEN: 1000, ERROR_COMMS: 2000},
    //ItemTypes: {CHARGEABLE_ITEM: 1, EXPENSE: 3, TIME: 6 },
    ItemTypes: {CHARGEABLE_ITEM: 1, TIME: 2, EXPENSE: 3 },
    HistoryTypes: {INVOICE: 1, TIME: 6, EXPENSE: 7},
    HistoryItemTypes: {NOTE: 5},
    ItemStatus: {UNKNOWN: 0, ACTIVE: 1, INACTIVE: 2},
    //HistoryAdded = 1,  HistoryDeleted=2,  HistoryEdited=3, HistoryStatusChanged=4, Note = 5
    PaymentMethodTypes: { CASH: 0, CHEQUE: 1, CREDIT_CARD: 2 },
    TaxStatus: {UNKNOWN: 0, NON_TAXED: 1, INCLUSIVE: 2, EXCLUSIVE: 3},
    InvoiceStatus: {UNKNOWN: 0, DRAFT: 1, APPROVED: 2, PARTIALLY_PAID: 3, PAID: 4},
    TimeSheetStatus: {UNKNOWN: 0, NON_BILLABLE: 1, UNBILLED: 2, INVOICED: 3, BILLED: 4},
    DocTemplates: {INVOICE: 1, ESTIMATE: 2, CREDIT_NOTE: 3},
    NoAccessMsg: 'No access rights'    
};

Ext.define('RM.core.AppMgr', {

    singleton: true,  //or could create a globally shared instance the way that Ext.MessageBox does

    requires: ['RM.core.PermissionsMgr', 'RM.core.EventMgr', 'RM.core.ViewMgr', 'RM.core.Selectors', 'RM.core.ContactsMgr', 'RM.core.TimeSheetsMgr', 'RM.core.ExpensesMgr', 'RM.core.InvoicesMgr'],

    init: function (application) {
        this.application = application;
        this.cashBookId = null;
        this.isUserLoggedIn = false;
        
        RM.EventMgr = RM.core.EventMgr;
        
        this.appTypeId = (Ext.typeOf(navigator.connection) != 'undefined') ? RM.Consts.App.CORDOVA_CONTAINER : RM.Consts.App.WEB_CONTAINER;
        
        RM.EventMgr.logEvent(RM.Consts.Events.OP, 1, 'am.i.1', 'Test', {MyVar:'My Data'});
        
        this.setupBaseApi();
        
        Ext.data.StoreManager.lookup('ItemTypes').setData([{ItemTypeID: '1', Name:'Product'}, {ItemTypeID: '2', Name:'Service'}]);
        Ext.data.StoreManager.lookup('TaxStatuses').setData([{TaxStatusID: RM.Consts.TaxStatus.NON_TAXED, Name:'Non Taxed'}, {TaxStatusID: RM.Consts.TaxStatus.INCLUSIVE, Name:'Inclusive'}, {TaxStatusID: RM.Consts.TaxStatus.EXCLUSIVE, Name:'Exclusive'}]);
        
        RM.PermissionsMgr = RM.core.PermissionsMgr;
        RM.PermissionsMgr.init(application);        
        
        RM.ViewMgr = RM.core.ViewMgr;
        RM.ViewMgr.init(application);
        RM.Selectors = RM.core.Selectors;
        RM.Selectors.init(application);

        RM.ContactsMgr = RM.core.ContactsMgr;
        RM.ContactsMgr.init(application);        
        
        RM.TimeSheetsMgr = RM.core.TimeSheetsMgr;
        RM.TimeSheetsMgr.init(application);

        RM.ExpensesMgr = RM.core.ExpensesMgr;
        RM.ExpensesMgr.init(application);

        RM.InvoicesMgr = RM.core.InvoicesMgr;
        RM.InvoicesMgr.init(application);

        this.addDeviceListeners();
        
        //this.startUpTest(); return;
                
        this.login();        

    },
    
    addDeviceListeners: function(){
        
        if(this.appTypeId == RM.Consts.App.CORDOVA_CONTAINER){
            var me = this;
            
            document.addEventListener('pause', function(){me.appPause.call(me)}, false);
            document.addEventListener('resume',  function(){me.appResume.call(me)}, false);
        }
        
        if (Ext.os.is('Android')) {
            document.addEventListener('backbutton', function(e){ e.preventDefault(); RM.ViewMgr.onDeviceBack(); }, false); 
        }           
        
    },
    
    appPause: function(){
        RM.ViewMgr.appPause();
        this.login();
    },
    
    appResume: function(){
        
    },
    
    isLoggedIn: function(){
        return this.isUserLoggedIn;
    },
    
    login: function () {
        var hasMobilePin = (localStorage.getItem('RmHasMobilePin') == 'true');

        if (hasMobilePin) {
            RM.ViewMgr.showEnterPin(
                localStorage.getItem('RmUserName'),
                localStorage.getItem('RmDisplayName'),
				function (userId, logLevel) {
                    this.userId = userId;
                    this.isUserLoggedIn = true;
                    RM.EventMgr.setUserLogLevel(logLevel);
                    if(this.cashBookId){
                        this.setCashbook(this.cashBookId, this.cashbookName,
                            function(){
                                RM.ViewMgr.back();
                            },
                            this
                        );
                    }
                    else{
                        //this.selectModule();
                        this.selectCashBook();
                    }
				},
				this,
                function(){
                    this.logout();
                }
			);
        }
        else {
            this.loginUserName();
        }
    },    
    
    selectModule: function(){
        RM.ViewMgr.showModules(
            function(moduleData){
                if(moduleData.ModuleCode == 'reckonone'){                    
                    this.selectCashBook();                    
                }
            },
            this
        
        );     
    },    

    selectCashBook: function () {

        RM.Selectors.showCashBooks(
			function (data) {
                this.cashBookId = data.CashBookId;
			    //RM.ViewMgr.setAppTitle(data.BookName);
                RM.EventMgr.logEvent(RM.Consts.Events.OP, 2, 'am.sc.1', 'CashBook=' + data.CashBookId);
                this.setCashbook(data.CashBookId, data.BookName,
                    function(){
                        RM.ViewMgr.showMainNavContainer(localStorage.getItem('RmDisplayName'), data.BookName);
                        var dashboardC = RM.AppMgr.getAppControllerInstance('RM.controller.DashboardC');
                        dashboardC.showView(this.dashboardData);
        	            RM.ViewMgr.showDashboard();                        
                    },
                    this
                );
			},
			this
		);
        
    },    
    
    setCashbook: function(cashbookId, bookName, cb, cbs){
	    this.saveServerRec('CashBookSelect', false, { CashBookId: cashbookId },
	        function (recs) {
	            Ext.data.StoreManager.lookup('GSTCodes').setData(recs[0].GSTCodes);
                Ext.data.StoreManager.lookup('AccountingCategories').setData(recs[0].AccountingCategories);
                Ext.data.StoreManager.lookup('ItemTypes').setData(recs[0].ItemTypes);
                
                RM.PermissionsMgr.setPermissions(recs[0].Permissions);
                
                this.dashboardData = recs[0].Dashboard;
                this.cashBookId = cashbookId;
                this.cashbookName = bookName;
                if(cb){
                    cb.call(cbs);
                }
	        },
            this,
            null,
            'Loading book...'
	    );        
    },
    
    /*getDashboardData: function(){
        return this.dashboardData;
    },*/

    loginUserName: function () {
        RM.ViewMgr.showEnterUsername(
			function (userId, logLevel) {
                this.userId = userId;
                this.isUserLoggedIn = true;
                RM.EventMgr.setUserLogLevel(logLevel);
			    RM.ViewMgr.showCreatePin(
                    function () {                           
                        //this.selectModule();
                        this.selectCashBook();
                    },
                    this
                );
			},
			this
		);
    },

    lock: function(){        
        this.logoutFromServer();       
    },
    
    logout: function () {
        
        localStorage.removeItem('RmDisplayName');
        localStorage.removeItem('RmHasMobilePin');
        localStorage.removeItem('RmUserName');
        
        this.logoutFromServer();
    },

    logoutFromServer: function(){
        /*RM.AppMgr.saveServerRec('Login', false, { ReqCode: 'LO' },
            function (recs) {

            },
            this
        );*/
        
        //RM.ViewMgr.showLoadingMask(msg ? msg : 'Saving...');
        Ext.Ajax.request({
            url: this.getApiUrl('Login'),
            method: 'Put',
            timeout: RM.Consts.Api.TIME_OUT,
            jsonData: { ReqCode: 'LO' }
        });        
        
        this.login();      
    },
    
    getUserName: function () {
        return localStorage.getItem('RmUserName');
    },

    getAppControllerInstance: function (name) {
        return this.application.getController(name);
    },
    
    getCashBookId: function(){
        return this.cashBookId;
    },

    getServerRecById: function (serverApiName, recId, cb, cbs, cbFail, msg) {

        this.setLoadingTimer();
        
        Ext.Ajax.request({
            url: this.getApiUrl(serverApiName) + '/' + recId,
            method: 'Get',
            timeout: RM.Consts.Api.TIME_OUT,
            success: function (response) {
                this.clearLoadingTimer();
                RM.ViewMgr.hideLoadingMask();
                var resp = Ext.decode(response.responseText);
                if (resp.success && cb){
                    cb.call(cbs, resp.recs[0]);
                }
                else if (!resp.success && cbFail){
                    cbFail.call(cbs, resp.eventMsg);
                }                
            },
            failure: function (resp) {
                window.clearInterval(this.loadingTimer);
                RM.ViewMgr.hideLoadingMask();
                RM.AppMgr.handleServerCallFailure(resp);
            },
            scope: this
        });
    },

    
    getServerRec: function (serverApiName, params, cb, cbs, cbFail, msg) {

        this.setLoadingTimer();
        
        Ext.Ajax.request({
            url: this.getApiUrl(serverApiName),
            method: 'Get',
            params: params,
            timeout: RM.Consts.Api.TIME_OUT,
            success: function (response) {
                this.clearLoadingTimer();
                RM.ViewMgr.hideLoadingMask();
                var resp = Ext.decode(response.responseText);
                if (resp.success && cb){
                    cb.call(cbs, resp.recs[0]);
                }
                else if (!resp.success && cbFail){
                    cbFail.call(cbs, resp.eventMsg);
                }                
            },
            failure: function (resp) {
                window.clearInterval(this.loadingTimer);
                RM.ViewMgr.hideLoadingMask();
                RM.AppMgr.handleServerCallFailure(resp);
            },
            scope: this
        });
    },    
    
    
    saveServerRec: function (serverApiName, isCreate, dataDto, cb, cbs, cbFail, msg, cbNetFail) {

        this.clearLoadingTimer();
        
        RM.ViewMgr.showLoadingMask(msg ? msg : 'Saving...');
        Ext.Ajax.request({
            url: this.getApiUrl(serverApiName),
            method: isCreate ? 'Post' : 'Put',
            timeout: RM.Consts.Api.TIME_OUT,
            jsonData: dataDto,
            success: function (response) {
                RM.ViewMgr.hideLoadingMask();
                var resp = Ext.decode(response.responseText);
                if (resp.success && cb) {
                    cb.call(cbs, resp.recs, resp.eventMsg, resp.eventSubId, resp.eventTypeId);
                }
                else if (!resp.success && cbFail){
                    //alert('Error Saving ' + resp.msg);
                    cbFail.call(cbs, resp.recs, resp.eventMsg);
                }
                
            },
            failure: function (resp) {
                RM.ViewMgr.hideLoadingMask();
                if(cbNetFail){ //put in initially for EnterPinC
                    cbNetFail.call(cbs, resp);
                }
                RM.AppMgr.handleServerCallFailure(resp);
            }
        });

    },
    
    setLoadingTimer: function(){
        this.clearLoadingTimer();
        RM.ViewMgr.showLoadingMask(); 
        return;
        
        this.loadingTimer = window.setInterval(
            function(){ 
                RM.ViewMgr.showLoadingMask();
            }
            ,3000);         
    },
    
    clearLoadingTimer: function(){
        if(this.loadingTimer){
            window.clearInterval(this.loadingTimer);
        }
    },
    
    loadStore: function(store, cb, cbs){
        this.setLoadingTimer();
        
        store.loadPage(1, {
            callback: function (recs, operation, success) {
               if(!success){
                    store.loadPage(1, {
                        callback: function (recs, operation, success) {
                           this.clearLoadingTimer();
                           RM.ViewMgr.hideLoadingMask();
                           if(cb){
                               cb.call(cbs, recs, operation, success);
                           }
                        },
                        scope: this
                    });
                    return;
               }
               this.clearLoadingTimer();
               RM.ViewMgr.hideLoadingMask();
               if(cb){
                   cb.call(cbs, recs, operation, success);
               }
            },
            scope: this
        });
        
    },
    
    onDataProxyException: function (proxy, resp, operation, eOpts) {
        //alert('Data Proxy Exception.  Http Response ' + response.status);
        //is called from RmBaseStore        
        this.handleServerCallFailure(resp);
        if(this.loadingTimer){
            window.clearInterval(this.loadingTimer);    
        }        
        RM.ViewMgr.hideLoadingMask();
    },    
    
    handleServerCallFailure: function(resp){
        if(resp.status == 401){
            this.login();
        }
        else if(resp.status != 0){
            alert('Request Failed with Http Response ' + resp.status);    
        }
    },
    
    setupBaseApi: function(){
        var apiLocation = localStorage.getItem('RmApiLocation'), apiType = localStorage.getItem('RmApiType');
        if(!apiLocation){
            apiLocation = 'demoserver';
            //apiLocation = 'devserver';
        }
        
        this.apiLocation = apiLocation;
        
        if(apiLocation == 'roadshowserver'){            
            this.baseApiUrl = 'http://mobilers.reckonone.com/api';
        }
        else
        if(apiLocation == 'demoserver'){            
            this.baseApiUrl = 'http://r1mobiledemo.reckon.com.au/api';
        }
        else if(apiLocation == 'devserver'){
            this.baseApiUrl = 'http://r1mobiledev.reckon.com.au/api';            
        }
        else if(apiLocation == 'devlocal'){
            this.baseApiUrl = 'http://localhost:53122/api';
        }
        else if(apiLocation == 'devlocaliis'){
            this.baseApiUrl = 'http://localhost:/Reckon.Host.ReckonOneMobile/api';
        }        
        else if(apiLocation == 'devmb'){
            this.baseApiUrl = 'http://10.64.1.151/Reckon.Host.ReckonOneMobile/api';
        }
        else if(apiLocation == 'demolaptop'){
            this.baseApiUrl = 'http://dlm.reckonone.com/api';
        }           
        else if(apiLocation == 'demolaptopip'){
            this.baseApiUrl = 'http://192.168.62.10/api';
        }           
        else if(apiLocation == 'demolaptopas'){
            this.baseApiUrl = 'http://r1m1.aliveserve.com/api';
        }           
        
        if(apiType == 'test'){
           this.apiType = 'test';
        }
        else{
            this.apiType = 'normal';
        }        
        
    },

    getApiUrl: function (apiName) {
        return this.baseApiUrl + '/' + apiName + (this.apiType == 'normal' ? '' : 'test'); 
    },
    
    getBaseApiUrl: function () {
        return this.baseApiUrl;        
    },
    
    setBaseApi: function(apiVals){
        localStorage.setItem('RmApiLocation', apiVals.ApiLocation);
        localStorage.setItem('RmApiType', apiVals.ApiType);
        this.setupBaseApi();
    },
    
    getBaseApi: function(){
        return {ApiLocation: this.apiLocation, ApiType: this.apiType};
    },

    getUserId: function(){
      return this.userId;
    },
    
    getAppInfo: function(){
        
        var appInfo = {RmDeviceId:'0', AppTypeId: this.appTypeId, AppVersion: RM.Consts.App.VERSION};
        if(this.appTypeId == RM.Consts.App.CORDOVA_CONTAINER){
            appInfo.DeviceName = device.name;
            appInfo.DevicePlatform = device.platform;
            appInfo.DevicePlatformVers = device.version;
            appInfo.DeviceUuid = device.uuid;
        }
        return appInfo;        
    },

    getTaxCode: function (taxCode) {
        var rec = Ext.data.StoreManager.lookup('GSTCodes').findRecord('GSTCodeID', taxCode);
        return rec ? rec.data : null;
    },

    itemUpdated: function (itemType) {
        this.application.fireEvent('itemupdated', itemType);
    },

    getModuleData: function(){
        return [
			{ModuleCode: 'reckonone', Activated: true, ShortName: 'ONE', FullName: 'Reckon One', Description: 'Our customised cloud accounting software.<br/>Designed by you to fit your needs', Image: 'reckonone'},
			{ModuleCode: 'reckonpay', Activated: false, ShortName: 'PAY', FullName: 'Reckon Pay', Description: 'Accept credit card payments on the go.<br/>Only available to Australian customers.',  Image: 'reckonpay'}
		];    
    },    
    
    showInvalidFormMsg: function(){
        //Ext.Msg.alert('Save', 'Please complete all mandatory fields.<br/>These have now been selected in <span style="color:red;">red</span>.', Ext.emptyFn);
        this.showErrorMsgBox('Please complete all mandatory fields.<br/>These have now been selected in <span style="color:red;">red</span>.');
       
    },
    
    showInvalidEmailMsg: function(){
        this.showErrorMsgBox('Please enter a valid email address.');
    },
    
    isFormValsEqual: function(formVals1, formVals2){        
        return Ext.encode(formVals1) == Ext.encode(formVals2);
        //see http://www.sencha.com/forum/showthread.php?59240-Compare-javascript-objects
        //http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    },
    
    showRMProgressPopup: function(titleText, msgText, icon, btnArray, cb, cbs){
        
        var iconPath = 'resources/images/rm-loading-img.gif';
        
        if(icon && icon !=''){
            iconPath = 'resources/images/rm-msgbox-'+icon+'.png';            
        }
        
        var msgBox = Ext.create('RM.component.RMMsgPopup');
        msgBox.add({
                    xtype: 'image',
                    src: iconPath,
                    height: 50,
                    width: 250,
                    margin: '25 0 5 0'               
                }
        );
        msgBox.add({                    
                    xtype: 'component',
                    html: titleText,                    
                    margin: '5 0 5 0'                                  
                }
        );
        msgBox.add({                    
                    xtype: 'component',
                    html: msgText,                    
                    margin: '7 0 15 0'                                  
                }
        );
        
        if (btnArray.length) {
            for(i = 0; i < btnArray.length; i++){
                
                msgBox.add({                    
                    xtype: 'button',
                    text: btnArray[i].text,
                    itemId: btnArray[i].itemId,
                    handler: function(btn){
    				    msgBox.hide();
                        if(cb && cbs){
                            cb.call(cbs, btn.getItemId());
                        }
                    },
                    scope: this                    
                });
            }            
        }
        msgBox.show();
        return msgBox;
    },
    
    showRMMsgPopup: function(msgText, icon, btnArray, cb, cbs){
        
        var iconPath = 'resources/images/rm-msgbox-warning.png';
        
        if(icon && icon !=''){
            iconPath = 'resources/images/rm-msgbox-'+icon+'.png';            
        }
        
        var msgBox = Ext.create('RM.component.RMMsgPopup');
        msgBox.add({
                    xtype: 'image',
                    src: iconPath,
                    height: 55,
                    width: 60,
                    margin: '25 0 12 0'               
                }
        );
        
        msgBox.add({                    
                    xtype: 'component',
                    html: msgText,
                    padding: '0 20',
                    margin: '18 0 20 0'                                  
                }
        );
        
        if (btnArray.length) {
            for(i = 0; i < btnArray.length; i++){
                
                msgBox.add({                    
                    xtype: 'button',
                    text: btnArray[i].text,
                    itemId: btnArray[i].itemId,
                    handler: function(btn){
    				    msgBox.hide();
                        if(cb && cbs){
                            cb.call(cbs, btn.getItemId());
                        }
                    },
                    scope: this                    
                });
            }            
        }
        msgBox.show();
        
    },
    
    showSuccessMsgBox: function(msgText, cb, cbs){
        this.showRMMsgPopup(msgText,'success', [{text: 'OK', itemId: 'ok'}], cb, cbs);
    },
    
    showFailureMsgBox: function(msgText, cb, cbs){
        this.showRMMsgPopup(msgText, 'error', [{text: 'RETRY', itemId: 'retry'}, {text: 'CANCEL', itemId: 'cancel'}], cb, cbs);
    },
    
    showErrorMsgBox: function(msgText, cb, cbs){ 
        this.showRMMsgPopup(msgText,'error',[{text: 'RETURN', itemId: 'Yes'}], cb, cbs);        
    },    
    
    showOkMsgBox: function(msgText, cb, cbs){ 
        this.showRMMsgPopup(msgText,'',[{text: 'OK', itemId: 'Yes'}], cb, cbs);        
    },    
    
    showOkCancelMsgBox: function(msgText, cb, cbs){        
        this.showRMMsgPopup(msgText,'',[{text: 'OK', itemId: 'ok'}, {text: 'Cancel', itemId: 'cancel'}], cb, cbs);       
    },
    
    showYesNoMsgBox: function(msgText, cb, cbs){        
        this.showRMMsgPopup(msgText,'',[{text: 'Yes', itemId: 'yes'}, {text: 'No', itemId: 'no'}], cb, cbs);        
    },
    
    showUnsavedChangesMsgBox: function(cb, cbs){
        this.showYesNoMsgBox('Do you want to save your changes?', cb, cbs);
    },
    
    isSimulator: function(){
        return !Ext.isDefined(device.model);
    },
    
    hoursToTime: function (hours) {

        var secs = hours * 60 * 60;

        hours = Math.floor(secs / (60 * 60))

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        //var divisor_for_seconds = divisor_for_minutes % 60;
        //var seconds = Math.ceil(divisor_for_seconds);

        var time = '';
        if (hours > 0)
            time += hours + 'h ';
        if (minutes > 0)
            time += minutes + 'm'

        return time;
    },

    minsToTime: function(totalMins){
        
      var hours =   Math.floor(totalMins / 60), mins = (hours > 0) ? totalMins % 60 : totalMins, timeStr = '';
     
      if(hours > 0){
          timeStr = hours + 'h ';
      }

      if(mins > 0){
          timeStr += mins + 'm';          
      }
      
       return timeStr.trim();        
    },    
    
    numberPrecision: function (value) {
        if (Ext.isNumber(value)) {
            return value.toFixed(2);
        }
    },

    numberWithCommas: function (value) {
        if (Ext.isNumber(value))  value = value.toFixed(2);        
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
    },
    
    valueWithCommas: function(value){
        value = Math.round(value);
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");        
    },

    /*saveSettings: function (settings, cb, cbs) {
        
        RM.ViewMgr.showLoadingMask('Saving...');
        
        Ext.Ajax.request({
            url: this.getApiUrl('Settings'),
            method: 'PUT',
            jsonData: settings,
            success: function (response) {
                if (cb)
                    cb.call(cbs, Ext.decode(response.responseText).success);
            },
            failure: function (resp) {
                alert('Request Failed with Http Response ' + resp.status);
                RM.ViewMgr.hideLoadingMask();
            }
        });
    },*/    
    
    capitalizeString: function(str) {
        str = (str + '').toLowerCase();
        return str.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });        
    },
    
    validateEmail: function(inputVal) {	
        var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (pattern.test(inputVal)) {         
            return true;
        }
        else {   
            return false; 
        }
    },
    
    startUpTest: function(){
        //following line is required for testing screens below when not using login()
        Ext.data.StoreManager.lookup('GSTCodes').setData([{ GSTCodeID: "7654913f-9486-419c-9752-8c0c2ec91e85", GSTCode: "GST", ShortDescription: "GST on sales", Rate: 10 }, { GSTCodeID: "2d540317-a3a8-4382-be26-94528b6b67d0", GSTCode: "FRE", ShortDescription: "Other GST Free", Rate: 0.0 }, { GSTCodeID: "3cb9ee30-7325-4234-b20b-c2913af9edcd", GSTCode: "EXP", ShortDescription: "GST free exports", Rate: 0.0}]);
        Ext.data.StoreManager.lookup('AccountingCategories').setData([{AccountingCategoryID: '4BE5F10D-F9BA-41E2-AC52-CD575D5B2154', Name:'Contract Work'}, {AccountingCategoryID: '39FA1C88-FAAB-4D2F-AF15-D8916BB68AE4', Name:'Supplies'}]);
        
        
        //Ext.Msg.alert('', 'No internet connection found', Ext.emptyFn); return;
       
        //RM.Selectors.showItems(true, null, true, function(){}, function(){});
        
        /*RM.ViewMgr.showCreatePin(
        function () {

        },
        this
        );*/

        /*RM.ViewMgr.showModules(
            function(moduleData){
                alert(moduleData.ModuleCode);
            },
            this
        );*/
        
        //RM.InvoicesMgr.showAcceptPayment('00000001-0000-0000-0000-000000000000', 467.67);
        //RM.TimeSheetsMgr.showTimeSheetDetail(null, function () { }, this);
        //RM.ViewMgr.showMainNavContainer();
        //RM.ViewMgr.showTimeSheets();
        //RM.ViewMgr.showExpenses();

        //RM.InvoicesMgr.showHistory('00000001-0000-0000-0000-000000000000');
        //RM.InvoicesMgr.emailInvoice('00000001-0000-0000-0000-000000000000');
         /*RM.InvoicesMgr.showInvoiceTimeSelect(
            function () {
    
    
            },
            this
        );*/
        /*RM.InvoicesMgr.showInvoiceDetail(
        { InvoiceId: '00000001-0000-0000-0000-000000000000' },
        function () {


        },
        this
        );*/
        
        /*RM.InvoicesMgr.showCustomDiscount(
        function(){
			
			
        },
        this		
        );*/

        //RM.ViewMgr.showMainNavContainer();
        /*RM.Selectors.showItems(
        true,
        null,
        false,
        function(){
			
			
        },
        this		
        );*/
        /*RM.Selectors.showItemDetail(
        {SaleTaxCodeID:'2D540317-A3A8-4382-BE26-94528B6B67D0'},
        function(closeType, itemData){
			
			
        },
        this
        );*/           
        
        
    }

});
