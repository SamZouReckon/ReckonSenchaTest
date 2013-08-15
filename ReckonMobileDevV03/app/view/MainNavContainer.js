Ext.define('RM.view.MainNavContainer', {
    extend: 'Ext.ux.slidenavigation.View',

    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom',
		//'RM.view.bankaccounts.BankAccounts',
		'RM.view.dashboard.Dashboard',
		'RM.view.CustomerInvoices',
		'RM.view.bills.Bills',
		'RM.view.budgets.Budgets',
		'RM.view.TimeSheets',
		'RM.view.Expenses',
        'RM.view.Contacts',
		//'RM.view.settings.MyPreferences',
        'RM.view.About'
		//'RM.view.settings.LinkBankAccount'
		//,'RM.view.settings.CompanySettings'
    ],

    config: {
        fullscreen: true,
        closeOnSelect: true,
        slideSelector: 'x-toolbar',
        //slideSelector: 'x-body',        
        selectSlideDuration: 200,
        
        list: {
            maxDrag: 275,
            width: 275,            //Raj: Please change width in rm-slidenav-menuitem-msg of app.scss whenever this width is changed
            items: [{
                xtype: 'toolbar',
                docked: 'top',
				ui: 'rm-slidenav-topbar'
                
            }],            
			itemTpl: new Ext.XTemplate(	
							
                            '{[this.switchBgColor(values.title, values.activated)]}',
							{
								switchBgColor: function(titleText, activated){									
									if(titleText == 'Module home' || titleText == 'Lock' || titleText == 'Logout') {
                                        return '<div class="rm-slidenav-menuitem">'+titleText+'</div>';
                                    }                       
									
                                    else if(!activated){                                        
                                        return '<div class="rm-slidenav-menuitem-msg"><div class="leftlabel">'+titleText+'</div><div class="rightlabel"> not activated</div></div>'
                                    }
                                    else
                                    {
                                        return '<div>' + titleText + '</div>';
                                    }
                                    
								}
							}
                            ),
                            
            listeners: {
                itemtap: function (list, index, target, record, e, eOpts) {
                    //cause slide nav to close when already selected item is closed again
                    if(list.isSelected(record))
                        RM.ViewMgr.closeMainNav();
                },
				painted: function(){
				}
            }

        },

        groups: {
			'GENERAL':1,
            'RECKON ONE': 2,
            'SETTINGS': 3
        },

        

        items: [/*{
            title: 'Module home',
            activated: true,
            handler: function () {
                if(RM.AppMgr.isLoggedIn()){ //otherwise the select module screen flashes up at the start before login or enter pin
                    RM.AppMgr.selectModule();
                }   
            },
			group: 'GENERAL'
        },*/{
            title: 'Lock',
            activated: true,
            handler: function () {
                RM.AppMgr.lock();
            },
			group: 'GENERAL'
        },{
            title: 'Logout',
            activated: true,
            handler: function () {
                RM.AppMgr.logout();
            },
			group: 'GENERAL'
        },{
            title: 'Choose book',
            activated: true,
            group: 'RECKON ONE',
            handler: function () {
                RM.AppMgr.selectCashBook();
            }
        },{
            xtype: 'dashboard',
            title: 'Dashboard',
            activated: true,
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'  //to insert at left of toolbar, have changed source code of slidenavigation\View.js  line 206 changed return parent.add(Ext.merge(me.slideButtonDefaults, config)); to return parent.insert(0, Ext.merge(me.slideButtonDefaults, config));
            }
        },/* {
            xtype: 'bankaccounts',
            title: 'Bank accounts',
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        },*/ {
            xtype: 'customerinvoices',
            title: 'Invoices',
            activated: true,
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        },/* {
            xtype: 'bills',
            title: 'Bills',
            activated: true,
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        },*//* {
            xtype: 'budgets',
            title: 'Budgets',
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        },*/ {
            xtype: 'timesheets',
            activated: true,
            title: 'Timesheets',
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        }, {
            xtype: 'expenses',
            title: 'Employee expenses',
            activated: true,
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        }, {
            xtype: 'contacts',
            title: 'Contacts',
            activated: true,
            group: 'RECKON ONE',
            slideButton: {
                selector: 'toolbar'
            }
        },/* {
            xtype: 'mypreferences',
            title: 'Preferences',
            activated: true,
            group: 'SETTINGS',
            handler: function () {
                RM.ViewMgr.showMyPreferences();  
            }   
        },*/ {
            xtype: 'about',
            title: 'About',
            activated: true,
            group: 'SETTINGS',
            slideButton: {
                selector: 'toolbar'
            }
        }/*, {
            xtype: 'linkbankaccount',
            title: 'Link bank account',
            group: 'SETTINGS',
            slideButton: {
                selector: 'toolbar'
            }
        }, {
            xtype: 'companysettings',
            title: 'Company settings',
            group: 'SETTINGS',
            slideButton: {
                selector: 'toolbar'
            }
        }*/]/*,

        listeners: {
            painted: function () {
                //this.openContainer(0);
            },
            open: function () {
                //alert('select');

            }
        }*/
    }
});