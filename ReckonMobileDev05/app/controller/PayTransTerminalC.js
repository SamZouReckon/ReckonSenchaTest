Ext.define('RM.controller.PayTransTerminalC',{
    extend: 'Ext.app.Controller',
    requires: 'RM.view.PayTransTerminal',
     config: {
        refs: {
            payTransTerminal: 'paytransterminal',
            terminalContainer: 'paytransterminal #terminalContainer'
        },
        control: {
            'paytransterminal #back': {
                tap: 'back'
            },
            'paytransterminal #details': {
                tap: 'onDetailsTap'
            }
        }
     },
    
    init: function() {      
       RM.AppMgr.application.on( {'reckonpay-devicedetected' : this.showDevice, scope : this} );  
       RM.AppMgr.application.on( {'reckonpay-cardinserted' : this.showPin, scope : this} );
       RM.AppMgr.application.on( {'reckonpay-incorrectpin' : this.incorrectPin, scope : this} );
       RM.AppMgr.application.on( {'reckonpay-correctpin' : this.correctPin, scope : this} );
       RM.AppMgr.application.on( {'reckonpay-removecard' : this.removeCard, scope : this} );
        
       //RM.AppMgr.application.fireEvent('reckonpay-devicedetected'); 
    },
    
    showDevice: function(){
        this.getTerminalContainer().setActiveItem(1);
    },
    
    showPin: function(){
        this.getTerminalContainer().setActiveItem(2);
    },
    
    removeCard: function(){
        RM.ViewMgr.showPay();
    },
    
    incorrectPin: function(){
        this.getTerminalContainer().setActiveItem(3);
    },
    
    correctPin: function(){
        this.getTerminalContainer().setActiveItem(4);
    },
    
    showView: function (data) {
        this.data = data;
        var view = this.getPayTransTerminal();
        if (!view){
            view = { xtype: 'paytransterminal' };
        }       
        RM.ViewMgr.showPanel(view);
    },
    
    onDetailsTap: function(){
        RM.PayMgr.showScreen('PayAmountDetails', this.data);
    },
    
    back: function () {
        RM.ViewMgr.back();
    }    
});