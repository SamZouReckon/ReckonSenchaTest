Ext.define('RM.view.dashboard.TopExpenses', {
    extend: 'Ext.Panel',
    xtype: 'dbtopexpenses',
    config: {
        
    },
	
    initialize: function() {        
		this.callParent(arguments);
        this.dashboardPieChartColors = ["#a1d079", "#009f94", "#00aeee", "#ed3d57", "#fdc00d", "#fced04"];
		this.add([{
				
                html: '<h2 class="rm-hearderbg">TOP EXPENSES</h2>'
			},{
				html: ''
		}]);
	},
	
	setViewData: function(data){
		
        if(data==null || data.length<=0 ){
            this.getComponent(1).setHtml('<div class="rm-dashboard-nodata">No data found</div>');
            return;
        }
		this.getComponent(1).setHtml(this.getContent(data));
        this.paintChart(data);
	},
    
    getContent: function(data){
        var htmlContent = '<div class="rm-dashboardtopexpenses"><table width="100%" class="tableLayout"><tr><td width="48%">';                        
        htmlContent += '<canvas id="dashboardPieChart" class="rm-dashboardpiechartcolor" width="124" height="124"></canvas></td><td width="52%">';

        for(var i = 0; i< data.length; i++){
                    htmlContent+=
                    '<div class="rm-legendcolor" style="background :'+this.selectColor(i)+'"></div>'+
                    '<div class="rm-legend">'+data[i].Name+
                    '<span class="rm-legendpercent"> ('+this.wholeNumber(data[i].Percentage)+'%)</span>'+'</div>'+
                    '<div class= "rm-clear"></div>'
         }
        htmlContent+= '</td></tr></table></div>';
        return htmlContent;
    },
    
    selectColor: function(xindex) {
        
        return this.dashboardPieChartColors[xindex];
    },
    
    wholeNumber: function(number) {
        return number.toFixed(0);
    },
    
    paintChart: function(recordData){
                        
        var count = recordData.length;
        
        var topExpenses = recordData
        var data = [];
        
        for(i=0;  i < count; i++) {                            
            data.push(topExpenses[i].Percentage)
        }
    
        var canvas = document.getElementById('dashboardPieChart');                
        var ctx = canvas.getContext("2d");
        
        var colors = this.dashboardPieChartColors;
    
        var center = [canvas.width / 2, canvas.height / 2];
    
        var radius = Math.min(canvas.width, canvas.height) / 2;
    
        var lastPosition = -1.55, total = 0;
    
        for(var i in data) {
            total += data[i];
        }
    
        for (var i = 0; i < data.length; i++) {                            
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(center[0],center[1]);
            ctx.arc(center[0],center[1],radius,lastPosition,lastPosition+(Math.PI*2*(data[i]/total)),false);
            ctx.lineTo(center[0],center[1]);
            ctx.fill();
            lastPosition += Math.PI*2*(data[i]/total);
        }                    
                        
                        
    }
});