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

	PayUp.Router = Backbone.Router.extend({
		initialize : function(options) {
			this.el = options.el
		},
		routes : {
			"" : "index"
		},
		index : function() {
//			console.log('index');
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