Ext.define('RM.controller.PayTransCardSignC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransCardSign',
    config: {
        refs: {
            payTransCardSign: 'paytranscardsign',
            payTransCardSignTitle: 'paytranscardsign #title',
            payTransCardSignPanel: 'paytranscardsign #signpanel',
            payTransCardVoidButton: 'paytranscardsign #void'
        },
        control: { 
            'paytranscardsign #back': {
                tap: 'back'
            },
            'paytranscardsign #clear': {
                tap: 'clear'
            },
            'paytranscardsign #confirm':{
                tap: 'onConfirmTap'  
            },
            'paytranscardsign #details': {
                tap: 'onDetailsTap'
            },
            'paytranscardsign #void':{
                tap: 'onVoidTap'
            },
            'paytranscardsign #signpanel': {
                rmcanvaspainted: 'onRMCanvasPainted'
            }
        }
     },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransCardSign();
        if (!view){
            view = { xtype: 'paytranscardsign' };
        }       
        RM.ViewMgr.showPanel(view);
        this.loadData();
    },   
    
    loadData: function(){        
        this.getPayTransCardSignTitle().setHtml(RM.AppMgr.formatCurrency(this.data.Amount));
    },
    
    clear: function(){
        this.getPayTransCardSignPanel().clearCanvas();
        this.getPayTransCardVoidButton().setHidden(true);
    },
    
    back: function(){
        RM.ViewMgr.back();
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    onRMCanvasPainted: function(){
        this.getPayTransCardVoidButton().setHidden(false);  
    },
    
    onVoidTap: function(){
        RM.AppMgr.showRMMsgPopup('Signature is incorrect','error',[{text: '<span class="rm-btn-arrow">CHANGE PAYMENT TYPE</span>', itemId: 'changetype'}, {text: 'EXIT', itemId: 'exit'}], function(selection){
            if(selection === 'changetype'){
                RM.ViewMgr.backTo('paytransdetails');
                //RM.PayMgr.showScreen('PayTransDetails', this.data, this.callback, this.callbackScope);
            }
            else if(selection === 'exit'){
                this.data.voidedTransaction = true;
                RM.PayMgr.showScreen('PaySendReceipt', this.data, this.callback, this.callbackScope);                
            }            
        }, this); 
    },
    
    onConfirmTap: function(){
     	RM.PayMgr.showPinAuthentication(
        	localStorage.getItem('RmUserName'),
            localStorage.getItem('RmDisplayName'), 
        	function(){
               alert('Correct PIN');
            }, 
        	this, 
        	function(){
               alert('Incorrect PIN');  
            }
        );   
    }
});