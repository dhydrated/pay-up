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

	PayUp.Collections.ReportDatas = Backbone.Collection.extend({
		initialize: function(){
		  this.reportId = $('#report_id').val();
		},
		url: function() {
		  return '/api/reports/'+this.reportId+'/data';
		},
		model : PayUp.Models.ReportData
	});


	PayUp.Views.ReportChart = Backbone.View.extend({
		el : "#report_chart",
		initialize : function() {
			this.fetchData();
		},
		renderChart : function() {

			 // Load the Visualization API and the piechart package.
//		      google.load('visualization', '1.0', {'packages':['corechart']});

		      // Set a callback to run when the Google Visualization API is loaded.
//		      google.setOnLoadCallback(drawChart);

		      
		},
		// Callback that creates and populates a data table,
	      // instantiates the pie chart, passes in the data and
	      // draws it.
      drawChart: function() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      },
		fetchData : function() {

			this.data = new PayUp.Collections.ReportDatas();
			var that = this;
			this.data.fetch({
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