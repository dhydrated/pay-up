window.PayUp = {
	Models : {},
	Collections : {},
	Views : {},
	Routers : {},
	init : function() {
	}
};

$(document).ready(function() {

	PayUp.Models.ReportData = Backbone.Model.extend({
//		urlRoot : '/api/reports/'
	});

	PayUp.Models.Report = Backbone.Model.extend({
		urlRoot : '/api/reports'
	});

	PayUp.Collections.ReportDatas = Backbone.Collection.extend({
		initialize: function(){
		  this.reportId = $('#report_id').val();
		},
		url: function() {
		  return '/api/reports/'+this.reportId+'/data';
		},
		model : PayUp.Models.ReportData
	});

	PayUp.Collections.Reports = Backbone.Collection.extend({
		initialize: function(){
		  this.reportId = $('#report_id').val();
		},
		url: function() {
		  return '/api/reports/'+this.reportId;
		},
		model : PayUp.Models.Report
	});


	PayUp.Views.ReportChart = Backbone.View.extend({
		el : "#report_chart",
		initialize : function() {
			this.fetchData();
		},
		renderChart : function() {
			var that = this;
			setTimeout(
					function(){
						window.report = that.report;
						google.load('visualization', '1', 
								{'callback':that.drawChart, 'packages':['corechart']}
						)
					}
					, 1000);
		      
		},
		// Callback that creates and populates a data table,
	      // instantiates the pie chart, passes in the data and
	      // draws it.
      drawChart: function() {
    	  
        // Create the data table.
        var data = new google.visualization.DataTable();
        
        for(var key in this.report.attributes.data[0]){
            var attrName = key;
            var attrValue = this.report.attributes.data[0][key];
            var columnType = isNaN(attrValue) ? "string" : "number"; 
            data.addColumn(columnType, attrName);
        }

        var myCollection = new Array();
        var count = 0;
        
        $(this.report.attributes.data).each(function(key, row){
	       	var myArray = new Array();
	       	var idx = 0;
       	 
	       	for(var key in row){
	            var attrName = key;
	            var attrValue = row[key];
	            myArray[idx]= attrValue;
	      		 idx++;
	       	}

	       	myCollection[count] = myArray;
	       	count++;
       });
        
       data.addRows(myCollection);
       var reportName = $('#name').val();

       // Set chart options
       var options = {'title':reportName,
                       'width':800,
                       'height':600};

        var chartType = this.report.attributes.chartType;
        
        var chartDiv = document.getElementById('chart_div');
        // Instantiate and draw our chart, passing in some options.
        if(chartType === "pie_chart"){
        	var chart = new google.visualization.PieChart(chartDiv);
        }
        else if(chartType === "area_chart"){
        	var chart = new google.visualization.AreaChart(chartDiv);
        }
        else if(chartType === "bubble_chart"){
        	var chart = new google.visualization.BubbleChart(chartDiv);
        }
        else if(chartType === "candlestick_chart"){
        	var chart = new google.visualization.CandlestickChart(chartDiv);
        }
        else if(chartType === "column_chart"){
        	var chart = new google.visualization.ColumnChart(chartDiv);
        }
        else if(chartType === "gauge"){
        	var chart = new google.visualization.Gauge(chartDiv);
        }
        else{
        	var chart = new google.visualization.BarChart(chartDiv);
        }
        
        
        chart.draw(data, options);
      },
	  fetchData : function() {
		  var that = this;
		  this.report = new PayUp.Models.Report({id: $('#report_id').val()});
		  this.report.fetch({
				success : function(data) {
					console.log('success');
					that.renderChart();
				},
				error : function() {
					console.log('error');
				}
			});
	  }
	});
	
	PayUp.Router = Backbone.Router.extend({
		initialize : function(options) {
			this.el = options.el
		},
		routes : {
			"" : "index"
		},
		index : function() {
			new PayUp.Views.ReportChart();
		}
	});

	PayUp.boot = function(container) {
		container = $(container);
		var router = new PayUp.Router({
			el : container
		})
		Backbone.history.start();
	}();
});