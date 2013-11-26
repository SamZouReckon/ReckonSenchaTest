/*Ext.Loader.setConfig({ 
	enabled: true,
    paths:{
        'Ext': 'sdk/src'
    }
});*/


Ext.application({    
    name: 'RM',
    requires: ['RM.core.Consts', 'RM.util.Log'],
    controllers: ['MainC', 'TestScreenC', 'CoreSettingsC', 'AppStopC', 'ModulesC', 'ModuleSignupC', 'AboutC', 'ContactsC', 'ContactDetailC', 'MyPreferencesC', 'EnterPinC', 'EnterUsernameC', 'CreatePinC', 'CashBooksC', 'CustomersC', 'BudgetLineItemsC', 'BillsC', 'ItemsC', 'DashboardC', 'ForgotPasswordC', 'CustomerInvoicesC', 'InvoicesC', 'InvoiceDetailC', 'InvoiceLineItemC', 'InvoiceItemSelectC', 'InvoiceTimeSelectC', 'InvoiceExpenseSelectC', 'InvoiceTimeSelectDetailC', 'InvoiceBalanceBreakdownC', 'InvoiceActionsC', 'HistoryC', 'CustomDiscountC', 'TimeSheetsC', 'TimeSheetDetailC', 'ExpenseDetailC', 'TimeSheetsCalendarC', 'ExpensesC', 'ProjectsC', 'SuppliersC', 'EmailInvoiceC', 'AddNoteC', 'ItemsAmountsC', 'ItemDetailC', 'CreateItemC', 'AcceptPaymentC', 'ReceiptPhotoPreviewC'],
    models: ['GSTCode', 'ItemType', 'AccountingCategory', 'TaxStatus', 'CashBook', 'Bill', 'Item', 'BudgetLineItem', 'CustomerInvoice', 'Customer', 'Contact', 'Invoice', 'InvoiceTemplate', 'InvoiceTimeSelect', 'InvoiceExpenseSelect', 'TimeEntry', 'TimeEntryCalendar', 'Expense', 'Project', 'Supplier', 'History', 'PaymentMethod', 'BankAccount'],
    stores: ['GSTCodes', 'ItemTypes', 'AccountingCategories', 'TaxStatuses', 'CashBooks', 'Bills', 'Items', 'BudgetLineItems', 'CustomerInvoices', 'Customers', 'Contacts', 'Invoices', 'InvoiceTemplates', 'InvoiceTimeSelect', 'InvoiceExpenseSelect', 'TimeEntries', 'TimeEntriesCalendar', 'Expenses', 'Projects', 'Suppliers', 'Histories', 'PaymentMethods', 'BankAccounts'],

    launch: function () {
        //Fix for textareafield cursor issue in iOS              
        //This one will cause problems with tapping textfields: Ext.event.publisher.TouchGesture.prototype.isNotPreventable = /^(select|a|input|textarea)$/i; - see http://www.sencha.com/forum/showthread.php?265533-ST-2.2.1-Cannot-move-cursor-in-TextField-TextAreaField-in-iOS/page2
        Ext.event.publisher.TouchGesture.prototype.isNotPreventable=/^(select|a|textarea)$/i;
        
    }
});


//Overrides to deal with iOS7 issues in Sencha 2.2 - e.g. keypad overlaying field editing
//from http://www.sencha.com/forum/showthread.php?272926-iOS7-fix-for-Touch-2.2.x

if (Ext.os.version.gtEq('7')) {
    // iPad or Homescreen or UIWebView
    if (Ext.os.deviceType === 'Tablet' || !Ext.browser.is.Safari || window.navigator.standalone) {
        Ext.define('Ext.iOS7Fix1.Viewport', {
            override : 'Ext.viewport.Ios',
            constructor : function () {
                var stretchHeights = {},
                        stretchWidths = {},
                        orientation = this.determineOrientation(),
                        screenHeight = window.screen.height,
                        screenWidth = window.screen.width,
                        menuHeight = orientation === this.PORTRAIT
                                ? screenHeight - window.innerHeight
                                : screenWidth - window.innerHeight;




                stretchHeights[this.PORTRAIT] = screenHeight - menuHeight;
                stretchHeights[this.LANDSCAPE] = screenWidth - menuHeight;
                stretchWidths[this.PORTRAIT] = screenWidth;
                stretchWidths[this.LANDSCAPE] = screenHeight;


                this.stretchHeights = stretchHeights;
                this.stretchWidths = stretchWidths;


                this.callOverridden(arguments);


                this.on('ready', this.setViewportSizeToAbsolute, this);
                this.on('orientationchange', this.setViewportSizeToAbsolute, this);
            },
            getWindowHeight : function () {
                return this.stretchHeights[this.orientation];
            },
            getWindowWidth : function () {
                return this.stretchWidths[this.orientation];
            },
            setViewportSizeToAbsolute : function () {
                this.setWidth(this.getWindowWidth());
                this.setHeight(this.getWindowHeight());
            }
        });
    }


    // iPad Only
    if (Ext.os.deviceType === 'Tablet') {
        Ext.define('Ext.iOS7Fix2.Viewport', {
            override : 'Ext.viewport.Ios',
            constructor : function () {


                this.callOverridden(arguments);


                window.addEventListener('scroll', function () {
                    if (window.scrollX !== 0) {
                        window.scrollTo(0, window.scrollY);
                    }
                }, false);
            },
            setViewportSizeToAbsolute : function () {
                window.scrollTo(0, 0);
                this.callOverridden(arguments);
            }
        });
    }
}