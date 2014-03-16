Ext.define('RM.controller.PayAmountInputC', {
    extend: 'Ext.app.Controller',
    requires: ['RM.view.PayAmountInput'],
    config: {
        refs: {
            payAmountInput: 'payamountinput',            
            historyHideBtn: 'payamountinput #historyhidebtn',
            historyShowBtn: 'payamountinput #historyshowbtn',            
            clearInputBtn: 'payamountinput #clearinputbtn',
            historyContainer: 'payamountinput #historycontainer',
            inputAndHistoryContainer: 'payamountinput #inputandhistorycontainer',
            amount: 'payamountinput #amount',   
            toolbarTitle: 'payamountinput #toolbarTitle',
            discount: 'payamountinput #discount',
            descriptionFld: 'payamountinput #descriptionfield'            
        },
        control: {            
            
            'payamountinput calckeypad': {
                keytap: 'onCalcKeyTap'
            },
            'payamountinput #historyshowbtn': {
                tap: 'showOrHideHistory'
            },
            'payamountinput #historyhidebtn': {
                tap: 'showOrHideHistory'
            },
            'payamountinput #clearinputbtn': {
                tap: 'clearInputField'
            },
            'payamountinput #discountbtn': {
                tap: 'onDiscountFldTap'
            },
            'payamountinput #camerabtn': {
                tap: 'onCameraBtnTap'
            },
            'payamountinput #charge': {
                tap: 'onChargeBtnTap'
            },
            'payamountinput #descriptionfield':{
                tap: 'showNotes'
            }
        }

    },
    
    init: function(){
        this.callParent(arguments);        
        this.inputStr = '';
        this.inputArray = new Array();
        this.inputArrayIndex = 0;
        this.noteText = '',        
        this.history = false;
    },
    
    showView: function (data, cb, cbs) {
        this.data = data;
        this.selectCb = cb;
        this.selectCbs = cbs;
        
        if(this.data) {
            this.data.Amount = 0;
            this.data.Total = 0;
            this.data.Discount = 0;            
        }
                
        var view = this.getPayAmountInput();
        if (!view){
            view = { xtype: 'payamountinput' };
        }
        this.clearInputFieldAndHistory();
        
        var amountToPay = typeof data === "undefined" ? 0 : parseFloat(data.Amount);
        //var formattedAmount = RM.AppMgr.formatCurrency(amountToPay, 0);
        //var customerName = typeof data === "undefined" ? "" : data.CustomerName;
        
        this.getToolbarTitle().setHtml('Joe Plumber');
        this.getAmount().setHtml(amountToPay);
        //this.getTotalWithGst().setHtml("Total with GST " + amountToPay);
    },  
    
    onCalcKeyTap: function (key) {       
        
        if (key === 'back') {
            if (this.inputStr.length > 0 && (this.inputStr.indexOf('=') === -1 )) {               
                this.inputStr = this.inputStr.slice(0, -1); 
            }
        }  
        else if(key === '=' ){  
            if(this.inputStr.indexOf('=') === -1){
                this.addToInputHistory();            
                this.displayTotal(); 
            }                       
        }
        else if(key === 'x'){  
            if(this.inputStr === 'x') return;
            this.addToInputHistory();
            this.inputStr += '*';
        }else if(key === '+'){  
            if(this.inputStr === '+') return;
            this.addToInputHistory();
            this.inputStr += key;
        }
        else {           
            if(this.inputStr.indexOf('=') === -1 ){
                this.inputStr += key;
            }            
        }        
        console.log(this.inputStr);
        this.getAmount().setHtml(this.inputStr);
    },
    
    addToInputHistory: function(){
        if(this.inputStr === '+' || this.inputStr === '*' || this.inputStr === '=' || this.inputStr === ''){
            this.inputStr = ''
            return;
        }         
        this.inputArray[this.inputArrayIndex] = this.formatNumber(this.inputStr);
        this.inputArrayIndex += 1; 
        this.inputStr = '';
    },
    
    displayTotal: function(){           
        this.inputStr = '=' + this.calculateTotal();  
        if(this.inputStr === '=' || this.inputStr === '=undefined' || this.inputStr === '=NaN') {
            this.inputStr = '';
        }        
        this.getAmount().setHtml(this.showCurrencyPrefix(this.inputStr));
    },
    
    showCurrencyPrefix: function(val){         
        if(val.indexOf('=') >= 0){  
            val = this.formatNumber(val);
            val = val.replace('=','<span class = "rm-pay-currencyprefix">$</span>');
        }
        return val;
    },
    
    styleOperators: function(val){
        if(val.indexOf('$') > -1){
            val = val.replace('$', '= $');
        }
        else if(val.indexOf('=') > -1){
            val = val.replace('=', '<span class = "rm-pay-currencyprefix">= $</span>');
        }
        else if(val.indexOf('+') >= 0){
            val = val.replace('+', '<span class = "rm-pay-currencyprefix">+ </span>');
        }
        else if(val.indexOf('*') >= 0){
            val = val.replace('*', '<span class = "rm-pay-currencyprefix">* </span>');
        }
        return val;
    },
    
    calculateTotal: function(){
        if(this.inputArray && this.inputArray.length > 0){
            try{
                var calcInput = ''
                for (i=0; i < this.inputArray.length; i++){
                   if(this.inputArray[i].indexOf('=') !== -1){
                        calcInput = eval(calcInput);
                        calcInput = calcInput ? calcInput.toFixed(2) : calcInput;
                        calcInput ? this.inputArray[i] = '=' + calcInput : this.inputArray[i] = '+' + 0;
                        calcInput = this.inputArray[i].slice(1)
                    }
                    else{
                        calcInput += this.inputArray[i];
                    }                    
                }                
                return eval(calcInput);
            }catch(e){
                RM.AppMgr.showErrorMsgBox(e.message);
            }           
        }
        return '';
    },
   
    onCameraBtnTap: function(){
        alert('camera btn tapped');
    },
    
    onChargeBtnTap: function(){
        
        this.data = {
            Amount: this.getAmount().getHtml(),
            Description: "Test Description",
            PayerName: "Travis Beesley",
            Discount: 0,
            Surcharge: 0,
            Total: this.getAmount().getHtml(),
        };
        
        var discVal = this.getDiscount().getValue();
        this.data.Discount = discVal ? discVal : '$0.00';
        //this.data.Amount = this.formatNumber(this.inputStr.slice(1));  
        
        if(this.validateForm(this.data)){ 
            this.totalWithSurchargeAndDiscount();
            RM.PayMgr.showScreen('PayTransTypeSelect', this.data);
        }        
    },
    
    totalWithSurchargeAndDiscount: function() {
        var discount = 0;
        var total = 0;
        var surcharge = parseFloat(this.data.Surcharge);
        var amount = parseFloat(this.data.Amount.replace('$', ''));
        if(this.data.Discount.indexOf('$') > -1){
            discount = parseFloat(this.data.Discount.replace('$', ''));
        }
        if(this.data.Discount.indexOf('%') > -1){
            
            discount = (parseFloat(this.data.Discount.replace('%', ''))/100) * amount;
        }
        total = amount - discount + surcharge;
        this.data.Total = total.toFixed(2);
    },
    
    clearInputFieldAndHistory: function(){
        this.inputStr = '';
        this.inputArray = new Array();
        this.inputArrayIndex = 0;
        this.getAmount().setHtml('');
        var historyContainer = this.getHistoryContainer();
        historyContainer.removeAll(true,true);
    },
    
    showDescription: function(){        
        RM.Selectors.showNoteText(
            'Description',
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
    },
    
    addRowsToInputHistory: function(){
        console.log(this.inputArray);
        var me = this;
        var historyContainer = this.getHistoryContainer();
        historyContainer.removeAll(true,true);
        
        for (i=0; i < this.inputArray.length; i++){
            
            historyContainer.add({
                xtype: 'container',
                layout: 'hbox',  
                margin: 1,
                itemId: 'row'+i,
                items: [{
                    xtype: 'button',                    
                    ui: 'plain', 
                    iconCls: 'rm-btn-iconsize',
                    icon: 'resources/images/icons/rm-fieldclear.svg',
                    itemId: 'deletebtn',
                    margin: 5,
                    hidden: true,                    
                    handler: function(btn){                        
                        me.removeInputItem(parseInt(this.getParent().getItemId().replace('row','')));
                        me.displayTotal();
                        me.addRowsToInputHistory();
                    }
                },{
                    xtype: 'component', 
                    docked: 'right',
                    itemId: 'rowcontent',
                    margin: '2 5 2 5',
                    html: me.styleOperators(this.inputArray[i]),
                    //html: this.inputArray[i],
                    styleHtmlContent: true,
                    styleHtmlCls: ['rm-fontsize180', 'rm-payhistoryrowtextcolor', 'rm-pr5']
                    /*listeners: {
    								tap: {
    									element: 'element',                    
    									fn: function () {
                                           if(this.getHtml().indexOf('=') === -1){
                                                this.getParent().addCls('rm-lightgreenbg');                                            
    										    this.getParent().child('#deletebtn').setHidden(false);  
                                            }                                                                          
    									}
    								}
								}*/
                }
                ],
                listeners: {
                    tap: {
							element: 'element',                    
							fn: function () {
                                	console.log(parseInt(this.getItemId().replace('row','')));
                                    if(me.inputArray[parseInt(this.getItemId().replace('row',''))].indexOf('=') === -1)
                                    {
                                            this.addCls('rm-lightgreenbg');                                            
    									    this.child('#deletebtn').setHidden(false);  
                                    } 
                            }
                    }
                }
            });
        }
        historyContainer.add({
                xtype: 'container',
                layout: 'hbox',  
                margin: 1,
                itemId: 'resultrow',
                items: [{
                    xtype: 'button',                    
                    ui: 'plain', 
                    iconCls: 'rm-btn-iconsize',
                    icon: 'resources/images/icons/rm-fieldclear.svg',
                    itemId: 'deletebtn',
                    margin: 5,
                    hidden: true                   
                },{
                    xtype: 'component', 
                    docked: 'right',   
                    margin: '2 5 2 5',
                    html: me.styleOperators(this.getAmount().getHtml()),
                    //html: this.getAmount().getHtml(),
                    styleHtmlContent: true,
                    styleHtmlCls: ['rm-fontsize180', 'rm-payhistoryrowtextcolor', 'rm-pr5']                    
                }
                ]
            });            
    },
    
    removeInputItem: function(index){        
        this.inputArray.splice(index,1);
        this.inputArrayIndex = this.inputArrayIndex - 1;
    },
    
    showOrHideHistory: function(){    
        this.history = !this.history;
        if(this.history ){
          this.addRowsToInputHistory(); 
          this.getInputAndHistoryContainer().setActiveItem(1);   
           
        }else{
          this.getInputAndHistoryContainer().setActiveItem(0);  
        }
        this.getHistoryHideBtn().setHidden(!this.history);
        this.getClearInputBtn().setHidden(this.history);
        this.getHistoryShowBtn().setHidden(this.history);        
    },
    
    onDiscountFldTap: function(){
        RM.ViewMgr.hideKeyPad(); 
        var discountFld = this.getDiscount();
        var oldVal = discountFld.getValue();
        RM.InvoicesMgr.showChooseDiscountPopup(
            oldVal == 'None' ? 0 : oldVal,
			function (disc) {
                var newVal = (disc == 0 ? 'None' : disc);
                if(newVal != oldVal){                        
				    discountFld.setValue(newVal);
                    oldVal = newVal;                    
                }
			},
			this
		);
    },
    
    formatNumber: function(val, decimalPlaces){        
        if(!val){
            return '';
        }
        decimalPlaces ? decimalPlaces = decimalPlaces : decimalPlaces = 2;
        var operator = '';
        var result = val;
        if(val.indexOf('+') !== -1 || val.indexOf('*') !== -1 || val.indexOf('=') !== -1) {
            operator = val.slice(0,1);
            val = val.slice(1);          
        } 
        result = parseFloat(val);
        result = operator + result.toFixed(decimalPlaces);    
        return result;       
    },
    
    validateForm: function(vals){        
        var isValid = true;
        
        if( vals.Amount === undefined || vals.Amount === null || vals.Amount === ''){
            RM.AppMgr.showErrorMsgBox('Please enter in an amount');
            isValid = false;
        }       
        else if (vals.Amount <= 0) {
            RM.AppMgr.showErrorMsgBox('Please enter payment amount greater than $0.00');  
            isValid = false;
        }
        else if(vals.Discount.indexOf('$') > -1 && vals.Discount) {
            var discount = parseFloat(vals.Discount.replace('$', ''));
            if(discount && discount > vals.Amount){
                RM.AppMgr.showErrorMsgBox('Discount amount cannot be more than the total amount');  
                isValid = false; 
            }            
        }
        /*else if (this.getAmount().getHtml().indexOf('=') == -1){
            RM.AppMgr.showErrorMsgBox('Please complete calculation and press =');  
            isValid = false;
        }*/
            
        return isValid;
    }
});
