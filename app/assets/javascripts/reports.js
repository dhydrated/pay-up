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
						window.collection = that.collection;
						google.load('visualization', '1', 
								{'callback':that.drawChart, 'packages':['corechart']}
						)
					}
					, 2000);
		      
		},
		// Callback that creates and populates a data table,
	      // instantiates the pie chart, passes in the data and
	      // draws it.
      drawChart: function() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        
        for(prop in this.collection.models[0].attributes){
    		var value = this.collection.models[0].get(prop);
    		var columnType = isNaN(value) ? "string" : "number"; 
    		data.addColumn(columnType, value)
    	}

        var myCollection = new Array();
        var count = 0;
        this.collection.each(function(row){
        	 var myArray = new Array();
        	 var idx = 0;
        	 for(prop in row.attributes){
        		 myArray[idx]= row.get(prop);
        		 idx++;
        	 }
        	 myCollection[count] = myArray;
        	 count++;
        });
        
        data.addRows(myCollection);
        
        var reportName = $('#name').val();

        // Set chart options
        var options = {'title':reportName,
                       'width':400,
                       'height':300};

        var chartType = $("#chartType :selected").val();
        
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

			this.collection = new PayUp.Collections.ReportDatas();
			var that = this;
			this.collection.fetch({
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