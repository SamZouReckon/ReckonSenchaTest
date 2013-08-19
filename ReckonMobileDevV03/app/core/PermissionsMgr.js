Ext.define('RM.core.PermissionsMgr', {

    singleton: true, 
	
    init: function (application) {
		this.app = application;
	},
	
	setPermissions: function(permissions){
        this.permissions = permissions;
    },
    
    getPermission: function(actionCode){
        return this.permissions.indexOf(actionCode) > -1;
    },
    
    canDo: function(permissionName, action){
       return this.getPermission(permissionName + action);
    },
    
    canEdit: function(permissionName){
         return this.canDo(permissionName, '_AddEdit');
    },
    
    canView: function(permissionName){
        return this.canDo(permissionName, '_View');        
    },
    
    canDelete: function(permissionName){
        return this.canDo(permissionName, '_Delete');
    },
    
    canReport: function(permissionName){
        return this.canDo(permissionName, '_Report');
    }

	
});