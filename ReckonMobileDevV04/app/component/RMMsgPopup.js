Ext.define('RM.component.RMMsgPopup', {
    extend: 'Ext.Sheet',
	
    config: {
        layout: {
            type: 'vbox',
            align: 'center',            
        },       
        cls: 'rm-msgpopup',
        showAnimation: {
            type: 'popIn',
            duration: 200,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 200,
            easing: 'ease-out'
        },
        zIndex: 90
    },

    show: function() {
        if (!this.getParent() && Ext.Viewport) {
            Ext.Viewport.add(this);
        }
        this.callParent();
    }
});
