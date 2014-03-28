Ext.define('RM.controller.PayTransRefundC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransRefund',
    config: {
        refs: {
            payTransRefund: 'paytransrefund',
            notesFld: 'paytransrefund #notes'
        },
        control: {            
            'paytransrefund #refund': {
                tap: 'refund'
            },
            'paytransrefund #notes':{
                tap: 'onNotesTap'
            },
            'paytransrefund #back': {
                tap: 'back'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransRefund();
        if (!view){
            view = { xtype: 'paytransrefund' };
        }       
        RM.ViewMgr.showPanel(view);
    },   
    
    refund: function(){
           
    },
    
    onNotesTap: function(){
      RM.Selectors.showNoteText(
            'Notes',
            true,
            'SAVE',
            this.noteText,
            function(noteText){
                RM.ViewMgr.back();
                this.noteText = noteText;
                this.getNotesFld().setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );   
    },
    
    back: function () {
        RM.ViewMgr.back();
    }     
});