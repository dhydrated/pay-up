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
			


			var that = this;
			

	    	  console.log(this);
			
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

    	  console.log('drawChart');
    	  
    	  console.log(this.collection);
    	  
        // Create the data table.
        var data = new google.visualization.DataTable();
        
        console.log(this.collection.models[0]);
        
        /*this.collection.each(function(row){
        	console.log(row);
        	console.log(row.attributes);
        	
        	for(prop in row.attributes){
        		console.log(prop);
        	}
        	
        });*/
        
        for(prop in this.collection.models[0].attributes){
    		console.log(prop);
    		var value = this.collection.models[0].get(prop);
    		console.log(value);
    		console.log(isNaN(value));
    		
    		var columnType = isNaN(value) ? "string" : "number"; 

    		console.log(columnType);
    		data.addColumn(columnType, value)
    	}
        
        
        
        /*data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');*/
        
        var myCollection = new Array();
        var count = 0;
        this.collection.each(function(row){
        	 var myArray = new Array();
        	 var idx = 0;
        	 for(prop in row.attributes){
        		 myArray[idx]= row.get(prop);
        		 idx++;
        	 }
        	 console.log(myArray);
        	 myCollection[count] = myArray;
        	 count++;
        });
        
        console.log(myCollection);
        data.addRows(myCollection);
        
//        data.addRows([
//          ['Mushrooms', 3],
//          ['Onions', 1],
//          ['Olives', 1],
//          ['Zucchini', 1],
//          ['Pepperoni', 2]
//        ]);
        
        var reportName = $('#name').val();

        // Set chart options
        var options = {'title':reportName,
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      },
		fetchData : function() {

			this.collection = new PayUp.Collections.ReportDatas();
			var that = this;
			this.collection.fetch({
				success : function(data) {
					console.log('success');
					console.log(data);
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