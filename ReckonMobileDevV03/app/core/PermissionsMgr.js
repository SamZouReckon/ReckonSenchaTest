Ext.define('RM.core.PermissionsMgr', {

    singleton: true, 
	
    init: function (application) {
		this.app = application;
	},
	
	setPermissions: function(permissions){
        this.permissions = permissions.map(function(action) { return action.toLowerCase() });
        this.triggerUpdateEvent();
    },
    
    getPermission: function(actionCode){        
        var granted = this.permissions.indexOf(actionCode.toLowerCase()) > -1;
        //<debug>
        if (actionCode in this.getOverrides()) { 
            console.log("Action override of '" + this.overrides[actionCode] + "' applied to: " + actionCode);
            return this.overrides[actionCode]; 
        }
        if ("globalOverride" in this) { 
            console.log("Global override of '" + this.globalOverride + "' applied to: " + actionCode);
            return this.globalOverride; 
        }        
        console.log("Access value of '" + granted + "' applied to: " + actionCode);
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
    resetPermissions: function() {
        delete this.globalOverride;
        delete this.overrides;
        this.triggerUpdateEvent();
    },
    
    allowEveryThing: function() {
        this.globalOverride = true;        
        this.triggerUpdateEvent();
    },

    allowNothing: function() {
        this.globalOverride = false;        
        this.triggerUpdateEvent();
    },
    
    alwaysAllowAction: function(action) {
        this.getOverrides()[action] = true;    
        this.triggerUpdateEvent();
    },
    
    alwaysDenyAction: function(action) {
        this.getOverrides()[action] = false;    
        this.triggerUpdateEvent();
    },
    
    getOverrides : function() {    
        if(!this.overrides) {this.overrides = {};}   
        return this.overrides;
    }    
    
    //</debug>
	
});