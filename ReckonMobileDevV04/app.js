
Ext.application({    
    name: 'RM',
    requires: ['RM.core.Consts', 'RM.util.Log'],
    controllers: ['MainC', 'TestScreenC', 'CoreSettingsC', 'AppStopC', 'ModulesC', 'ModuleSignupC', 'AboutC', 'ContactsC', 'ContactDetailC', 'MyPreferencesC', 'EnterPinC', 'EnterUsernameC', 'CreatePinC', 'CashBooksC', 'CustomersC', 'BudgetLineItemsC', 'BillsC', 'ItemsC', 'DashboardC', 'ForgotPasswordC', 'CustomerInvoicesC', 'InvoicesC', 'InvoiceDetailC', 'InvoiceLineItemC', 'InvoiceItemSelectC', 'InvoiceTimeSelectC', 'InvoiceExpenseSelectC', 'InvoiceTimeSelectDetailC', 'InvoiceBalanceBreakdownC', 'InvoiceActionsC', 'HistoryC', 'CustomDiscountC', 'TimeSheetsC', 'TimeSheetDetailC', 'ExpenseDetailC', 'TimeSheetsCalendarC', 'ExpensesC', 'ProjectsC', 'SuppliersC', 'EmailInvoiceC', 'AddNoteC', 'ItemsAmountsC', 'ItemDetailC', 'CreateItemC', 'AcceptPaymentC', 'ReceiptPhotoPreviewC'],
    models: ['GSTCode', 'ItemType', 'AccountingCategory', 'TaxStatus', 'CashBook', 'Bill', 'Item', 'BudgetLineItem', 'CustomerInvoice', 'Customer', 'Contact', 'Invoice', 'InvoiceTemplate', 'InvoiceTimeSelect', 'InvoiceExpenseSelect', 'TimeEntry', 'TimeEntryCalendar', 'Expense', 'Project', 'Supplier', 'History', 'PaymentMethod', 'BankAccount'],
    stores: ['GSTCodes', 'ItemTypes', 'AccountingCategories', 'TaxStatuses', 'CashBooks', 'Bills', 'Items', 'BudgetLineItems', 'CustomerInvoices', 'Customers', 'Contacts', 'Invoices', 'InvoiceTemplates', 'InvoiceTimeSelect', 'InvoiceExpenseSelect', 'TimeEntries', 'TimeEntriesCalendar', 'Expenses', 'Projects', 'Suppliers', 'Histories', 'PaymentMethods', 'BankAccounts'],

    launch: function () {
        //Fix for textareafield cursor issue in iOS              
        //This one will cause problems with tapping textfields: Ext.event.publisher.TouchGesture.prototype.isNotPreventable = /^(select|a|input|textarea)$/i; - see http://www.sencha.com/forum/showthread.php?265533-ST-2.2.1-Cannot-move-cursor-in-TextField-TextAreaField-in-iOS/page2
        //Ext.event.publisher.TouchGesture.prototype.isNotPreventable=/^(select|a|textarea)$/i;
        
    }
});


