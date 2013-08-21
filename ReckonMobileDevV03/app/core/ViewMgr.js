Ext.define('RM.core.ViewMgr', {

    singleton: true, 
	requires: ['RM.view.Main', 'RM.view.MainNavContainer', 'RM.view.Modules', 'RM.component.RMMsgPopup'],
    defaultBackAnimation : { type: 'slide', direction: 'right'},
	
    init: function (application) {
		this.app = application;
		this.appBackStack = new Array();
		this.mainView = Ext.create('RM.view.Main');
		
		this.mainNavContainer = Ext.create('RM.view.MainNavContainer');
        //this.mainNavContainer.list.getStore().getAt(7).set('title', 'Timesheets-na');
        //this.mainNavContainer.list.getStore().getAt(7).set('activated', false);
        
		//this.showLogin();
		//this.showMainNavContainer();
		//this.showPanel(Ext.create('RM.view.Projects'));
		//this.showPanel(Ext.create('RM.view.Invoices'));
		
		//this.showPanel(Ext.create('RM.view.TabNavContainer'));		
	},
	
	back: function(anim){
        //To hide keypad while navigating back in Android
        if (Ext.os.is('Android')) {
            document.activeElement.blur();
        }
        RM.AppMgr.clearLoadingTimer();
        
		if(this.appBackStack.length <= 1){
			return;
		}
		var view = this.appBackStack.pop();
        
		anim = anim || this.defaultBackAnimation;   
        // Clean up the popped view after animation completes
        this.setPostAnimationCallback(anim, function() { view.destroy(); });         
        
		this.showPanel2(this.appBackStack[this.appBackStack.length - 1], anim);
	},

    backTo: function(backToXtype, anim){
		//To hide keypad while navigating back in Android
		if (Ext.os.is('Android')) {
            document.activeElement.blur();
        }

        var view;
        anim = anim || this.defaultBackAnimation;        
        // Schedule some cleanup         
        this.setPostAnimationCallback(anim, function() { view.destroy(); }); 
        
        while(true){
            view = this.appBackStack.pop();            
            if(view.getXTypes().split('/').pop() == backToXtype){
                this.showPanel(view, anim);
                break;
            }
            view.destroy();
		}

    },

    appPause: function(){
        if(this.backHandler){
           this.backHandler.call(this.backHandlerScope);
        }                
    },    
    
    onDeviceBack: function(){
        
        
        if(this.backHandler){
           this.backHandler.call(this.backHandlerScope);
        }
        else if(!this.mainNavContainer.isClosed()){
          this.mainNavContainer.closeContainer();
        }
        else if(this.appBackStack.length <= 1 && !this.isDashboardShowing()){
            this.mainNavContainer.setSelectedItem('Dashboard');
            this.showPanel2(this.mainNavContainer, { type: 'slide', direction: 'right'});          
        }
        else if (this.appBackStack.length <= 1 ) {
            RM.AppMgr.showYesNoMsgBox("Are you sure you want to exit?",
              function(btn){
                  if(btn == 'yes'){
                      navigator.app.exitApp();
                  }
              },
              this
            );
        } else {
          this.back();
        }
       
    },

    regBackHandler: function(handler, scope){
        this.backHandler = handler;
        this.backHandlerScope = scope;
    },

    deRegBackHandler: function(){
        this.backHandler = null;
        this.backHandlerScope = null;
    },

    showCoreSettings: function(){
		var coreSettingsC = RM.AppMgr.getAppControllerInstance('RM.controller.CoreSettingsC');
		coreSettingsC.showView();	        
    },
    
    showModules: function(cb, cbs){
		var modulesC = RM.AppMgr.getAppControllerInstance('RM.controller.ModulesC');
		modulesC.showView(cb, cbs);     
    },
    
    showModuleSignup: function(moduleId){
		var moduleSignupC = RM.AppMgr.getAppControllerInstance('RM.controller.ModuleSignupC');
		moduleSignupC.showView(moduleId);            
    },

    showMyPreferences: function(){
		var myPrefC = RM.AppMgr.getAppControllerInstance('RM.controller.MyPreferencesC');
		myPrefC.showView();        
    },
    
    showDashboard: function(anim){
        this.mainNavContainer.setSelectedItem('Dashboard');
        this.showPanel(this.mainNavContainer, anim);
    },
    
    isDashboardShowing: function(){
        return this.mainNavContainer.isItemSelected('Dashboard');
    },
    
    showBills: function(anim){
        this.mainNavContainer.setSelectedItem('Bills');
        this.showPanel(this.mainNavContainer, anim);
    },

	showInvoices: function(anim){
		this.mainNavContainer.setSelectedItem('Invoices');
        this.showPanel2(this.mainNavContainer, anim);
	},

	showTimeSheets: function(anim){
		this.mainNavContainer.setSelectedItem('Timesheets');
        this.showPanel(this.mainNavContainer, anim);
	},
	
	showExpenses: function(anim){
		this.mainNavContainer.setSelectedItem('Expenses');
        this.showPanel(this.mainNavContainer, anim);
	},    
    
    closeMainNav: function(){
        this.mainNavContainer.closeContainer();
    },

	showPanel: function (panel, anim) {
		 //To hide keypad just before pushing view on stack
        if (Ext.os.is('Android')) {
            document.activeElement.blur();
        }
        var p = this.mainView.add(panel);
		this.appBackStack.push(p);
		//this.showBackStack('showPanel');
        if (!anim)
            anim = { type: 'slide', direction: 'left' };
        this.mainView.getLayout().setAnimation(anim);
        this.mainView.setActiveItem(p);
    },
	
	showPanel2: function(panel, anim){
        //To hide keypad just before pushing view on stack
        if (Ext.os.is('Android')) {
            document.activeElement.blur();
        }
        var p = this.mainView.add(panel);
		//this.appBackStack.push(p);
		//this.showBackStack('showPanel');
        if (!anim)
            anim = { type: 'slide', direction: 'left' };
        this.mainView.getLayout().setAnimation(anim);
        this.mainView.setActiveItem(p);	
	
	},
	
    clearBackStack: function(){
        this.appBackStack = new Array();
    },
    
	showBackStack: function(msg){

        console.log(msg);
		for(var i = 0; i < this.appBackStack.length; i++){
			console.log('  ' + this.appBackStack[i].getXTypes().split('/').pop());
		}
	},
	
	showLoadingMask: function(msg){
         //To hide keypad 
        if (Ext.os.is('Android')) {
            document.activeElement.blur();
        }
		//Ext.Viewport.setMasked({ xtype: 'loadmask', message: msg ? msg : 'Loading...'});	
        this.mainView.setMasked({ xtype: 'loadmask', message: msg ? msg : 'Loading...'});
	},
	
	hideLoadingMask: function(){
		//Ext.Viewport.setMasked(false);
        this.mainView.setMasked(false);
	},
	
	showLogin: function(cb, cbs){
		//this.showPanel2({xtype:'login'});
		var loginC = RM.AppMgr.getAppControllerInstance('RM.controller.LoginC');
		loginC.showView(cb, cbs);		
	},
	
	showCreatePin: function(cb, cbs){
		var createPinC = RM.AppMgr.getAppControllerInstance('RM.controller.CreatePinC');
		createPinC.showView(cb, cbs);		
	},		
	
	showEnterPin: function(userName, displayName, cb, cbs, cbFail){
		var enterPinC = RM.AppMgr.getAppControllerInstance('RM.controller.EnterPinC');
		enterPinC.showView(userName, displayName, cb, cbs, cbFail);		
	},
    
	showForgotPassword: function(){
		var forgotPassC = RM.AppMgr.getAppControllerInstance('RM.controller.ForgotPasswordC');
		forgotPassC.showView();		
	},
	
	showEnterUsername: function(cb, cbs){
		var enterUsername = RM.AppMgr.getAppControllerInstance('RM.controller.EnterUsernameC');
		enterUsername.showView(cb, cbs);		
	},	
    
	showMainNavContainer: function(title, subtitle, anim){
        this.mainNavContainer.list.getComponent(0).setTitle('<div style="margin-top: -5px;">'+title+'</div> <div style="font-size: 13px; margin-top: -25px; float: left; ">' + subtitle + '</div>');        
		RM.ViewMgr.showPanel(this.mainNavContainer, anim);
        this.clearBackStack();
	},    
	
    showEmailReminder: function(){
        return false;
    },
    
    setPostAnimationCallback: function(anim, callback) {
        if(!anim.listeners) { anim.listeners = {}; }
        anim.listeners.animationend = callback;
    }
    
	////////////// Old ////////////////////
	/*showLoginOld: function(anim){
		var hasPin = false;
		if(hasPin)
			this.showLoginPin(anim);
		else
			this.showLoginUserName(anim);	
	},	
	
	showLoginUserName: function(anim){
		RM.ViewMgr.showPanel(Ext.create('RM.view.LoginUserName'), anim);	
	},

	showLoginPin: function(anim){
		RM.ViewMgr.showPanel(Ext.create('RM.view.LoginPin'), anim);	
	},	
	
	showDashBoardOld: function (anim){
		RM.ViewMgr.showPanel(this.dashBoardView, anim);	
	}*/
    

	
});
