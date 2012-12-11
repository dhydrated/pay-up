window.PayUp = {
	Models : {},
	Collections : {},
	Views : {},
	Routers : {},
	init : function() {
//		console.log('Hello from Backbone!');
	}
};

$(document).ready(function() {
	
	PayUp.Views.PayeeDropdown = Backbone.View.extend({
		el: "div.input #payee_id",
		initialize: function() {
			console.log('PayeeDropdown init.');
		},
		events: {
	    	  "click" : "selectPayee"
	    },
	    selectPayee: function(){
		    	
		    	console.log('selected Payee!');
				$(this.el).find('option:selected').each(function () {
					console.log($(this).val() + " : " + $(this).text());
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
			console.log('index');
			new PayUp.Views.PayeeDropdown();
		}
	});

	PayUp.boot = function(container) {
		container = $(container);
		var router = new PayUp.Router({
			el : container
		})
		Backbone.history.start();
		console.log('backbone started.');
	}();

});