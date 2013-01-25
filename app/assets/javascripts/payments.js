window.PayUp = {
	Models : {},
	Collections : {},
	Views : {},
	Routers : {},
	init : function() {
	}
};

$(document).ready(function() {

	PayUp.Models.Payee = Backbone.Model.extend({
		urlRoot : '/api/payees'
	});

	PayUp.Collections.Payees = Backbone.Collection.extend({
		model : PayUp.Models.Payee,
		url : '/api/payees'
	});

	PayUp.Views.PayeeDropdown = Backbone.View.extend({
		el : "div.input #payee_id",
		initialize : function() {
			this.fetchPayees();
		},
		events : {
			"click" : "selectPayee"
		},
		selectPayee : function() {

			$('input#amount').val("");
			
			var that = this;
			$(this.el).find('option:selected').each(function() {
				var selectedPayeeId = $(this).val();
				that.collections.each(function(payee, index){
					if(selectedPayeeId == payee.id){
						$('input#amount').val(payee.get("amount"));
					}
				});
			});
		},
		fetchPayees : function() {

			this.collections = new PayUp.Collections.Payees();
			var that = this;
			this.collections.fetch({
				success : function(data) {
					console.log('success');
				},
				error : function() {
					console.log('error');
				}
			});
		}
	});
	
	PayUp.Views.StartPeriod = Backbone.View.extend({
		el : "div.input #startPeriod",
		initialize : function() {
		},
		events : {
			"blur" : "updateEndPeriod"
		},
		updateEndPeriod : function() {
			console.log('update period');
			
			var startDate = Date.parse($(this.el).val());
			var endDate = startDate.add(1).months().add(-1).days(); //set the end period a month from startPeriod.
			
			$('div.input #endPeriod').val(endDate.toString('yyyy-MM-dd'));
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
			new PayUp.Views.PayeeDropdown();
			new PayUp.Views.StartPeriod();
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