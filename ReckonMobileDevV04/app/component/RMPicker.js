Ext.define('RM.component.RMPicker', {
    override: 'Ext.picker.Picker',
    
    // Egregious, I know. Monkey patching the picker button handler so we can delay the default behaviour by enough time for the 
    // extra click event to be absorbed by the picker and not the underlying form. Affects android only.
    onDoneButtonTap: function(button, e) {
        if(!Ext.os.is.Android || this.noDelay) {
            // resume click event executing
            this.callParent(arguments);
            return;
        }
        
        // Delaying the done button click handling by 250 ms to give the ghost click time to fire and be eaten.
        // This approach is weird (noDelay etc in a recursive call), but required for the Ext callParent method to work. The caller HAS to be this 
        // method in this class.
        var that = this;
        var thoseArgs = arguments;
        setTimeout(function() {
            that.noDelay = true;
            that.onDoneButtonTap.apply(that, thoseArgs);
            that.noDelay = false;
        }, 250);
    }
});