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

	
	/*PayUp.Views.StartPeriod = Backbone.View.extend({
		el : "div.input #startPeriod",
		initialize : function() {
		},
		events : {
			"blur" : "updateEndPeriod"
		},
		updateEndPeriod : function() {
			var startDate = Date.parseExact($(this.el).val(), 'dd/MM/yyyy');
			var endDate = startDate.add(1).months().add(-1).days(); //set the end period a month from startPeriod.
			$('div.input #endPeriod').val(endDate.toString('dd/MM/yyyy'));
		}
	});*/

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
	
	PayUp.Views.TemplateSearchInput = Backbone.View.extend({
		el : "#template-search-div",
		events : {
			"keyup #search-template" : "search"
		},
		search : function(event){
			var searchkeyword = $(this.el).find("#search-template").val();
			
			
			$("#templates-list-body").find("tbody tr").each(function(key, row){
				pos = $(row).andSelf().text().search(new RegExp(searchkeyword, "i"));
				
				if(pos < 0){
					$(this).hide();
				}
				else{
					$(this).show();
				}
			});
			
		}
	});
	
	PayUp.Views.TemplatesRow = Backbone.View.extend({
		//el : "template-id-?",
		events: {
			"click" : "choose"
		},
		choose: function() {

			$('option:contains("'+this.model.attributes.paymentType.name+'")', "#paymentType_id").attr('selected', true);
			$('option:contains("'+this.model.attributes.payee.name+'")', "#payee_id").attr('selected', true);
			$("#amount").val(this.model.attributes.amount);
			
			$("#templates-list-modal").modal('hide');
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
			this.focus();
		},
		render: function() {
			$(this.el).html(this.template(this));
			
			var listBody = '<table id="templates-table" class="payments table table-striped table-bordered table-hover">';
			
			listBody += "<thead><tr>";
			listBody += "<td>Payment Type</td>";
			listBody += "<td>Payee</td>";
			listBody += "<td>Amount</td>";
			listBody += "</tr></thead>";
			var templateIds = [];
			this.collections.each(function(row){
				
				listBody += "<tr id='template-id-"+row.attributes.id+"'><td>"+row.attributes.paymentType.name+"</td>" +
						"<td>"+row.attributes.payee.name+"</td>" +
						"<td>"+row.attributes.amount+"</td></tr>";

				templateIds[row.attributes.id] = row;
			});
			listBody += "</table>";
			
			$("#templates-list-body").html(listBody);
			
			for(id in templateIds){
				new PayUp.Views.TemplatesRow({
					el : "#template-id-"+id+"",
					model: templateIds[id]
				});
			}
			
			new PayUp.Views.TemplateSearchInput();
						
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
		},
		focus : function(){
			$(this.el).on('shown', function () {
			    $('#search-template').focus();
			})
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
			//new PayUp.Views.StartPeriod();
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
