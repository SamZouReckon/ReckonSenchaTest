Ext.define('RM.controller.PayAmountInputC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayAmountInput'],
    config: {
        refs: {
            payAmountInput: 'payamountinput',
            calcInput: 'payamountinput #calcinput',
            amount: 'payamountinput #amount',   
            toolbarTitle: 'payamountinput #toolbarTitle',
            totalWithGst: 'payamountinput #totalwithgstfield',
            descriptionFld: 'payamountinput #descriptionfield'            
        },
        control: {            
            
            'payamountinput calckeypad': {
                keytap: 'onCalcKeyTap'
            },
            'payamountinput #gstbtn': {
                tap: 'onGstBtnTap'
            },
            'payamountinput #camerabtn': {
                tap: 'onCameraBtnTap'
            },
            'payamountinput #charge': {
                tap: 'onChargeBtnTap'
            },
            'payamountinput #clear': {
                tap: 'clear'                
            },
            'payamountinput #descriptionfield':{
                tap: 'showNotes'
            }
        }

    },
    
    init: function(){
        this.callParent(arguments);
        this.valStr = '';
        this.noteText = '',
        this.gstVal = 10;
    },
    
    showView: function (data, cb, cbs) {
        this.data = data;
        this.selectCb = cb;
        this.selectCbs = cbs;

        var view = this.getPayAmountInput();
        if (!view){
            view = { xtype: 'payamountinput' };
        }
        
        var amountToPay = typeof data == "undefined" ? 0 : parseFloat(data.AmountPaid);
        var formattedAmount = RM.AppMgr.formatCurrency(amountToPay, 0);
        var customerName = typeof data == "undefined" ? "" : data.customerName;

        this.getToolbarTitle().setHtml(customerName);
        this.getAmount().setHtml(formattedAmount);
        this.getTotalWithGst().setHtml("Total with GST " + formattedAmount);
    },  
    
    onCalcKeyTap: function (key) {       
        
        if (key == 'back') {
            if (this.valStr.length > 0) {
                this.valStr = this.valStr.slice(0, -1)
            }
        }  
        else if(key == '='){
            this.getAmount().setHtml(this.calculateTotal());            
        }
        else {           
            this.valStr += key;
        }
        //console.log(this.valStr);
        
        this.getCalcInput().setHtml(this.valStr);

    },
    
    calculateTotal: function(){
        if(this.valStr){
            try{
                return eval(this.valStr);
            }catch(e){
                RM.AppMgr.showErrorMsgBox(e.message);
            }
           
        }
        return '';
    },
    
    calculateTotalWithGst: function(){
        var total = this.calculateTotal();
        if(total){
           return total + this.gstVal;
        }
        return '';
    },
    
    onGstBtnTap: function(){
        this.getTotalWithGst().setHtml(this.calculateTotalWithGst());
    },
    
    onCameraBtnTap: function(){
        alert('camera btn tapped');
    },
    
    onChargeBtnTap: function(){
        
        var data = {
            Amount: 50.54,
            GST: 2.45,
            Surcharge: 2.40,
            Total: 54.67,
        };
        
        RM.PayMgr.showScreen('PayTransTypeSelect', data);
    },
    
    clear: function(){
        this.valStr = '';
        this.getCalcInput().setHtml('');
        this.getAmount().setHtml('0.00');
        this.getTotalWithGst().setHtml('Total with GST $0.00');
    },
    
    showNotes: function(){
        
        RM.Selectors.showNoteText(
            'Notes',
            true,
            'SAVE',
            this.noteText,
            function(noteText){
                RM.ViewMgr.back();
                this.noteText = noteText;
                this.getDescriptionFld().setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );
        
    }
    
    
    

});
