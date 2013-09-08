/*
* An extension of a normal Ext.form.Panel make all of its child fields readonly and remove any placeholders 
* (if they support these settings) automatically based on it's permissions config
*
* Example: The default config will require AddEdit permissions on the item specified under 'permissionFor'
*         {
*               xtype: 'secureformpanel',
*               permissionFor: 'Contacts',
*               itemId: 'contactForm',	
*        } 
*
*/
Ext.define('RM.component.SecureFormPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'secureformpanel',
    
    config : {
        permissionFor : '',
        listeners: {painted : function () {this.checkPermissions();}} 
    },    

    checkPermissions: function() {
        // If there is a editAction specified, make sure the user has access to it, otherwise make all fields readonly
        var actionTarget = this.getPermissionFor();
        if(actionTarget && !RM.core.PermissionsMgr.canAddEdit(actionTarget)) {
            // Iterate over all form fields and make them ReadOnly, and remove any placeholder text
            this.getFieldsArray().forEach(function(field) {
                if(field.setReadOnly) { field.setReadOnly(true); }
                if(field.setPlaceHolder) { field.setPlaceHolder(''); }        
            });
        }
        
        // If any field has its own permissions, apply those too
        this.getFieldsArray().forEach(function(field) {                       
            var fieldPermission = field.config.permissionFor;
            if(fieldPermission) {
                var granted = RM.PermissionsMgr.canDo(fieldPermission.name, fieldPermission.action);
                if(fieldPermission.invoke) {
                    field[fieldPermission.invoke].apply(field, [granted]);    
                }
                else if(fieldPermission.invokeWithInverse) {
                    field[fieldPermission.invoke].apply(field, [!granted]);    
                }
                else {
                    field.setHidden(!granted);
                }                
            }
        });
    }
});