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
       return this.getPermission(action + permissionName);
    },
    
    canEdit: function(permissionName){
         return this.canDo(permissionName, 'edit');
    },
    
    canRead: function(permissionName){
        return this.canDo(permissionName, 'view');        
    },
    
    canDelete: function(permissionName){
        return this.canDo(permissionName, 'delete');
    },
    
    canReport: function(permissionName){
        return this.canDo(permissionName, 'report');
    }

	
});