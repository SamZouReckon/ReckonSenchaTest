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
            totalWithGst: 'payamountinput #totalwithgstfield',
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
            'payamountinput #gstbtn': {
                tap: 'onGstBtnTap'
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
        this.gstVal = 10;
        this.history = false;
    },
    
    showView: function (data, cb, cbs) {
        this.data = data;
        this.selectCb = cb;
        this.selectCbs = cbs;

        var view = this.getPayAmountInput();
        if (!view){
            view = { xtype: 'payamountinput' };
        }
        
        var amountToPay = typeof data === "undefined" ? 0 : parseFloat(data.AmountPaid);
        var formattedAmount = RM.AppMgr.formatCurrency(amountToPay, 0);
        var customerName = typeof data === "undefined" ? "" : data.customerName;

        this.getToolbarTitle().setHtml(customerName);
        this.getAmount().setHtml(formattedAmount);
        this.getTotalWithGst().setHtml("Total with GST " + formattedAmount);
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
        console.log(this.inputArray);
        this.getAmount().setHtml(this.inputStr);
    },
    
    addToInputHistory: function(){
        if(this.inputStr === '+' || this.inputStr === '*' || this.inputStr === '='){
            this.inputStr = ''
            return;
        } 
        this.inputArray[this.inputArrayIndex] = this.inputStr;
        this.inputArrayIndex += 1; 
        this.inputStr = '';
    },
    
    displayTotal: function(){           
        this.inputStr = '=' + this.calculateTotal();  
        if(this.inputStr === '=' || this.inputStr === '=undefined' || this.inputStr === '=NaN') {
            this.inputStr = '';
        }
        this.getAmount().setHtml(this.inputStr);                  
    },
    
    calculateTotal: function(){
        if(this.inputArray && this.inputArray.length > 0){
            try{
                var calcInput = ''
                for (i=0; i < this.inputArray.length; i++){
                   if(this.inputArray[i].indexOf('=') !== -1){
                        calcInput = eval(calcInput);
                        calcInput ? this.inputArray[i] = '=' + calcInput : this.inputArray[i] = '+' + 0;
                        calcInput = this.inputArray[i].slice(1)
                    }
                    else{
                        calcInput += this.inputArray[i];
                    }                    
                }
                console.log(calcInput);
                return eval(calcInput);
            }catch(e){
                RM.AppMgr.showErrorMsgBox(e.message);
            }           
        }
        return '';
    },
    
    calculateTotalWithGst: function(){
        //var total = this.calculateTotal();
        //if(total){
        //   return total + this.gstVal;
        //}
       // return '';
    },
    
    onGstBtnTap: function(){
        //this.getTotalWithGst().setHtml(this.calculateTotalWithGst());
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
    
    clearInputField: function(){
        this.inputStr = '';
        this.inputArray = new Array();
        this.inputArrayIndex = 0;
        this.getAmount().setHtml('');
        //this.getTotalWithGst().setHtml('Total with GST $0.00');
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
                itemId: i,
                items: [{
                    xtype: 'button',                    
                    ui: 'plain', 
                    iconCls: 'rm-btn-iconsize',
                    icon: 'resources/images/icons/rm-fieldclear.svg',
                    itemId: 'deletebtn',
                    margin: 5,
                    hidden: true,                    
                    handler: function(btn){                        
                        me.removeInputItem(this.getParent().getItemId());
                        me.displayTotal();
                        me.addRowsToInputHistory();
                    }
                },{
                    xtype: 'component', 
                    docked: 'right',   
                    margin: '2 5 2 5',
                    html: this.inputArray[i],
                    styleHtmlContent: true,
                    styleHtmlCls: ['rm-fontsize120', 'rm-pay-graytext', 'rm-lineheight180', 'rm-pr5'],
                    listeners: {
    								tap: {
    									element: 'element',                    
    									fn: function () {
                                            if(this.getHtml().indexOf('=') === -1){
                                                this.getParent().addCls('rm-lightgreenbg');                                            
    										    this.getParent().child('#deletebtn').setHidden(false);  
                                            }                                                                                      
    									}
    								}
								}
                }
                ]
            });
        }
        historyContainer.add({
                xtype: 'container',
                layout: 'hbox',  
                margin: 1,
                itemId: 'res',
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
                    html: this.getAmount().getHtml(),
                    styleHtmlContent: true,
                    styleHtmlCls: ['rm-fontsize120', 'rm-pay-graytext', 'rm-lineheight180', 'rm-pr5']                    
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
    }
});
