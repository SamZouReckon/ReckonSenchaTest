Ext.define('RM.core.PermissionsMgr', {

    singleton: true, 
	
    init: function (application) {
		this.app = application;
	},
	
	setPermissions: function(permissions){
        this.permissions = permissions;
        this.triggerUpdateEvent();
    },
    
    getPermission: function(actionCode){        
        var granted = this.permissions.indexOf(actionCode) > -1;
        //<debug>
        if ("overrideAccessValue" in this) { return this.overrideAccessValue; }        
        //</debug>
        return granted;
    },
    
    canDo: function(permissionName, action){
       return this.getPermission(permissionName + '_' + action);
    },
    
    canAddEdit: function(permissionName){
        return this.canDo(permissionName, 'AddEdit');
    },
    
    canView: function(permissionName){
        return this.canDo(permissionName, 'View');        
    },
    
    canDelete: function(permissionName){
        return this.canDo(permissionName, 'Delete');
    },
    
    canReport: function(permissionName){
        return this.canDo(permissionName, 'Report');
    },
    
    triggerUpdateEvent: function() {
        this.app.fireEvent('rm-permissionsupdated');
    }
    
    //<debug>
    ,
    itIsWhatItIs: function() {
        delete this.overrideAccessValue;
        this.triggerUpdateEvent();
    },
    
    itsAllGood: function() {
        this.overrideAccessValue = true;        
        this.triggerUpdateEvent();
    },

    itsAllBad: function() {
        this.overrideAccessValue = false;        
        this.triggerUpdateEvent();
    }
    //</debug>
	
});