Ext.define('RM.component.PayAmountInputCalc', {
    extend: 'Ext.Panel',
    xtype: 'payamountinputcalc',
	requires: ['RM.component.CalcKeypad'],
    config: {      
        control: {         
            'calckeypad': {
                keytap: 'onCalcKeyTap'
            },
            '#historyshowbtn': {
                tap: 'showOrHideHistory'
            },
            '#historyhidebtn': {
                tap: 'showOrHideHistory'
            },
            '#clearinputbtn': {
                tap: 'clearInputFieldAndHistory'
            },
            '#discountbtn': {
                tap: 'onDiscountFldTap'
            },
            '#camerabtn': {
                tap: 'onCameraBtnTap'
            },
            '#charge': {
                tap: 'onChargeBtnTap'
            },
            '#discount': {
                tap: 'onDiscountFldTap'
            },            
            '#descriptionfield':{
                tap: 'showDescription'
            }
        },
        
        cls: 'rm-whitebg',
        layout: 'vbox',            
        items:[             
                {
                    xtype: 'container',
                    docked: 'top',
                    scrollable: 'horizontal',
                    height: '3em',
                    cls: 'rm-whitebg',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',                                                
                            cls: ['rm-white-flatbtn', 'rm-payamountinput-back-arrow'],
                            itemId: 'historyshowbtn',
                            docked: 'left'
                        },
                        {
                            xtype: 'component',
                            html: '0.00',
                            itemId: 'amount',                                    
                            cls: 'rm-pay-amount'                                                
                        },{
                            xtype: 'button',
                            itemId: 'clearinputbtn',
                            margin: 9,
                            ui: 'plain', 
                            iconCls: 'rm-btn-iconsize',
                            icon: 'resources/images/icons/rm-fieldclear.svg',
                            docked: 'right'                                        
                        },{
                            xtype: 'button',                                                
                            cls: ['rm-white-flatbtn', 'rm-payamountinput-arrow'],
                            itemId: 'historyhidebtn',
                            hidden: true,
                            docked: 'right'
                        }                
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'inputandhistorycontainer',
                    flex: '1',
                    layout: 'card',
                    activeItem: 0,               
                    items: [
                        {
                            xtype: 'container',
                            cls: 'rm-whitebg',
                            scrollable: 'vertical',
                            items: [        
                                        
                                    {
                                        xtype: 'container',
                                        cls: ['rm-whitebg', 'rm-border-top'],
                                        height: '2.6em',
                                        layout: 'hbox',
                                        items: [
                                            {
                            				    xtype: 'exttextfield', 
                                                itemId: 'discount',
                                                readOnly: true,                        					
                            					cls: 'rm-flatfield',
                                                border: 0,
                                                clearIcon: false,  
                                                placeHolder: 'enter',
                                                flex: 1
                            				},{
                                                xtype: 'button',
                                                itemId: 'discountbtn',
                                                width: 72,
                                                cls: ['rm-white-flatbtn', 'rm-border-left', 'rm-pay-discountbtn']
                                            }                
                                        ]
                                },{                                                            
                                        xtype: 'container',                         
                                        cls: ['rm-border-bottom','rm-whitebg', 'rm-border-top'],
                                        height: '2.6em',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'exttextfield',
                                                itemId: 'descriptionfield',
                                                cls: 'rm-flatfield',
                                                border: 0,                                            
                                                clearIcon: false,
                                                readOnly: true,
                                                placeHolder: 'add optional description',
                                                flex: 1
                                            },{
                                                xtype: 'button',
                                                itemId: 'camerabtn',
                                                width: 72,
                                                cls: ['rm-white-flatbtn', 'rm-border-left', 'rm-pay-camerabtn']
                                            }                        
                                        ]
                            },{
                                        xtype: 'calckeypad',
                                        docked: 'bottom'  
                            },{                    
                                        xtype: 'button',
                                        itemId: 'charge',
                                        text: '<span class="rm-btn-arrow">CHARGE</span>',
                                        cls: 'rm-photopreviewbtn',
                                        docked: 'bottom'                        
                            }
                    ]
                }
                ,{
                       xtype: 'container',
                       cls: 'rm-whitebg',
                       scrollable: 'vertical',
                       html: 'History',
                       styleHtmlContent: true,
                       styleHtmlCls: ['rm-p10', 'rm-fontsize70', 'rm-pay-graytext', 'rm-border1px'],
                       itemId: 'historycontainer'
                }               
        	]
            }           
         ] 
    },    
    
    initialize: function(){
        this.callParent(arguments);         
        this.inputStr = '';
        this.inputArray = new Array();
        this.inputArrayIndex = 0;
        this.noteText = '';        
        this.history = false;   
    },
    
    /*refs:{
            payAmountInputCalc: 'payamountinputcalc',            
            historyHideBtn: 'payamountinputcalc #historyhidebtn',
            historyShowBtn: 'payamountinputcalc #historyshowbtn',            
            clearInputBtn: 'payamountinputcalc #clearinputbtn',
            historyContainer: 'payamountinputcalc #historycontainer',
            inputAndHistoryContainer: 'payamountinputcalc #inputandhistorycontainer',
            amount: '#amount',   
            discount: 'payamountinputcalc #discount',
            descriptionFld: 'payamountinputcalc #descriptionfield',
            
        },*/
    
    getHistoryHideBtn: function(){
        return this.down("#historyhidebtn");
    },
    
    getHistoryShowBtn: function(){
        return this.down("#historyshowbtn");
    },
    
    getClearInputBtn: function(){
        return this.down('#clearinputbtn');  
    },
    
    getHistoryContainer: function(){
        return this.down('#historycontainer');  
    },
    
    getInputAndHistoryContainer: function(){
        return this.down('#inputandhistorycontainer');  
    },
    
    getAmount: function(){   
       return this.down('#amount');      
    },
    
    getDiscount: function(){
        return this.down('#discount');  
    },
    
    getDescriptionFld: function(){
        return this.down('#descriptionfield');  
    }, 
    
    loadData: function(data, callback, callbackScope){        
        //data ? this.data = data : this.data = {};
        this.data = {};
        if(data){
            this.data.InvoiceId = data.InvoiceId;
            this.data.AccountsReceivableCategoryId  = data.AccountsReceivableCategoryId;
            this.data.CustomerSupplierId = data.CustomerSupplierId;
            this.data.BankAccountId = data.BankAccountId;
            this.data.CustomerEmail = data.CustomerEmail;
        }       
        
        this.callback = callback;
        this.callbackScope = callbackScope;        
        this.clearInputFieldAndHistory();
        var amountToPay = 0;
        if(data && data.BalanceDue){
            amountToPay = typeof data === "undefined" ? 0 : parseFloat(data.BalanceDue);
        }
        else if(data && data.Amount){
            amountToPay = typeof data === "undefined" ? 0 : parseFloat(data.Amount);
        }
        if(amountToPay){
            this.inputStr = '' + amountToPay.toFixed(2);
        }
        else{
            this.inputStr = '';
        }
        //this.getAmount().setHtml(this.inputStr); 
        this.getAmount().setHtml(this.inputStr ? this.inputStr : '<span class = "rm-pay-currencyprefix">$</span>0.00');
        var discount = 'None';
        if(data){
            if(data.DiscountPercent && data.DiscountPercent != 0){
                discount = data.DiscountPercent + '%';
            }
            else if(data.DiscountAmount && data.DiscountAmount != 0){
                discount = RM.AppMgr.formatCurrency(data.DiscountAmount, 2);
            }            
        }                     	
        this.getDiscount().setValue(discount); 
        this.getDescriptionFld().setValue((data && data.Description) ? data.Description : '');
        this.noteText = this.getDescriptionFld().getValue();
    },
    
    onCalcKeyTap: function (key) {       
        var pointIndex = this.inputStr.indexOf('.');        
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
                if(key === '.' && pointIndex !== -1){
                    return;
                }
                if(pointIndex !== -1 && (this.inputStr.length - pointIndex) >= 3){
                    return;
                }
                this.inputStr += key;
            }            
        }         
        this.getAmount().setHtml(this.showCurrencyPrefix(this.inputStr));
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
                        calcInput ? this.inputArray[i] = '=' + calcInput : this.inputArray[i] = '+0.00';
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
        this.onCalcKeyTap('=');        
        if(!this.data){
            this.data = {}; 
        }
        this.data.Amount = 0;
        this.data.Description = "";
        this.data.PayerName = "";
        this.data.PaymentMethodId = 2;
        //this.data.Discount = 0;
        this.data.Surcharge = 0;
        this.data.Total = 0;     
        
        var discVal = this.getDiscount().getValue();
        var discount = discVal ? discVal : '$0.00';
        this.data.Amount = this.formatNumber(this.inputStr.slice(1)); 
        this.data.Description = this.getDescriptionFld().getValue(); 
        
        this.data.DiscountPercent = null;
        this.data.DiscountAmount = null;
        
        if (discount.indexOf('%') > -1) {
            this.data.DiscountPercent = discount.replace('%', '');
        }
        else if (discount.indexOf('$') > -1) {
            this.data.DiscountAmount = discount.replace('$', '');
        }
        
        if(this.validateForm(this.data)){ 
            this.totalWithSurchargeAndDiscount();
            console.log(this.data);
            RM.PayMgr.showScreen('PayTransTypeSelect', this.data, this.callback, this.callbackScope);
        }        
    },
    
    totalWithSurchargeAndDiscount: function() {
        var discount = 0;
        var total = 0;
        var surcharge = parseFloat(this.data.Surcharge);
        var amount = parseFloat(this.data.Amount.replace('$', ''));       
        if(this.data.DiscountAmount){
            discount = parseFloat(this.data.DiscountAmount);
        }
        else if(this.data.DiscountPercent){
            
            discount = (parseFloat(this.data.DiscountPercent)/100) * amount;
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
        this.history = true;
        this.showOrHideHistory();
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
        else if(vals.DiscountAmount) {
            var discount = parseFloat(vals.DiscountAmount);
            if(discount && discount >= vals.Amount){
                RM.AppMgr.showErrorMsgBox('Discount amount must be less than total amount');  
                isValid = false; 
            }            
        }        
        if(vals.BalanceDue){
            var balance = parseFloat(vals.BalanceDue);
            var amount = parseFloat(vals.Amount);            
            if(balance<amount){
                RM.AppMgr.showErrorMsgBox('Amount cannot be greater than balance due');  
                isValid = false;
            }
        }            
        return isValid;
    }
});