window.PayUp = {
	Models : {},
	Collections : {},
	Views : {},
	Routers : {},
	init : function() {
	}
};

$(document).ready(function() {
	
	var template = function(name) {
	   return Handlebars.compile($('#'+name+'-template').html());
	};

	PayUp.Models.Payee = Backbone.Model.extend({
		urlRoot : '/api/payees'
	});

	PayUp.Models.PaymentTemplate = Backbone.Model.extend({
		urlRoot : '/api/payment_templates'
	});

	PayUp.Collections.Payees = Backbone.Collection.extend({
		model : PayUp.Models.Payee,
		url : '/api/payees'
	});

	PayUp.Collections.PaymentTemplates = Backbone.Collection.extend({
		model : PayUp.Models.PaymentTemplate,
		url : '/api/payment_templates'
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
			var startDate = Date.parse($(this.el).val());
			var endDate = startDate.add(1).months().add(-1).days(); //set the end period a month from startPeriod.
			
			$('div.input #endPeriod').val(endDate.toString('yyyy-MM-dd'));
		}
	});

	PayUp.Views.TemplatesListButton = Backbone.View.extend({
		el : "#templates-list-button-container",
		template: template('templates-list-button'),
		events: {
			"click #templates-list-open-btn" : "open"
		},
		initialize : function() {
			this.render();
		},
		render: function() {
			$(this.el).html(this.template(this));
			return this;
		},
		open: function(){
			$("#templates-list-modal").modal({show: true});
		}
	});
	
	PayUp.Views.TemplatesList = Backbone.View.extend({
		el : "div #templates-list-container",
		template: template('templates-list-modal'),
		events: {
			"click #templates-list-close-btn" : "close"
		},
		initialize : function() {
			this.fetch();
		},
		render: function() {
			$(this.el).html(this.template(this));
			
			var listBody = '<table class="payments table table-striped table-bordered">';
			
			listBody += "<thead><tr>";
			listBody += "<td>Payment Type</td>";
			listBody += "<td>Payee</td>";
			listBody += "<td>Amount</td>";
			listBody += "</tr></thead>";
			this.collections.each(function(row){
				
				listBody += "<tr><td>"+row.attributes.paymentType.name+"</td>" +
						"<td>"+row.attributes.payee.name+"</td>" +
						"<td>"+row.attributes.amount+"</td></tr>";
				console.log(row);
			});
			listBody += "</table>";
			
			$("#templates-list-body").html(listBody);
			
			return this;
		},
		close: function(){
			$("#templates-list-modal").modal('hide');
		},
		fetch : function() {

			this.collections = new PayUp.Collections.PaymentTemplates();
			var that = this;
			this.collections.fetch({
				success : function(data) {
					console.log('success');
					that.render();
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
			new PayUp.Views.PayeeDropdown();
			new PayUp.Views.StartPeriod();
			new PayUp.Views.TemplatesListButton();
			new PayUp.Views.TemplatesList();
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