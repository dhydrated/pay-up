var app = angular.module('puPayment', ['puUser']);

app.config(function($routeProvider) {
	$routeProvider.when('/new', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'CreatePaymentController'
	});
	
	$routeProvider.when('/newMonthly', {
		templateUrl : '/assets/templates/payment/createMonthly.html',
		controller : 'CreateMonthlyPaymentController'
	});
	

	$routeProvider.when('/test', {
		templateUrl : '/assets/templates/payment/test.html',
		controller : 'TestPaymentController'
	});
	

	$routeProvider.otherwise({ redirectTo: '/new' });
});

app.directive("fieldRow", function(){
	return {
		restrict: "E",
		transclude: true,
		scope: {
			elementLabel: "@",
			elementId: "@"
		},
		templateUrl: "/assets/templates/field-row.html"
	}
});

app.directive("datePicker", function(){
	return {
		restrict: "E",
		transclude: true,
		templateUrl: "/assets/templates/date-picker.html",
		scope: {
			parentModel: "@",
			modelVariable: "@"
		},
		link: function(scope, element, attributes){

			$(element).datepicker({'format':'dd/mm/yyyy'}).on('changeDate', function(ev){
				scope.$parent.$parent[scope.parentModel][scope.modelVariable] = (new Date(ev.date.valueOf())).toString('dd/MM/yyyy');
				scope.$apply();
				scope.$parent.$parent.$apply();
				$(element).datepicker('hide');
			});;
		}
	}
})



app.directive("paymentTemplates", function($http){
	return {
		restrict: "E",
		templateUrl: "/assets/templates/payment/payment-templates.html",
		scope: {
		},
		link: function(scope, element, attributes){
			
			$http({
				method : 'GET',
				url : '/api/payment_templates'
			}).success(function(data, status, headers, config) {
				scope.paymentTemplates = data;
			}).error(function(data, status, headers, config) {
				console.log('failed to retrieve payment templates.');
			});
			
			scope.$watch('paymentTemplates', function(value){
				console.log(value);
			});
			
			scope.open = function(){
				$('#templates-list-modal').modal('show');
			}
			
			scope.selectTemplate = function(template){
				console.log(template);
				console.log(scope.$parent['payment']);
				scope.$parent['payment']['amount'] = template['amount'];
				scope.$parent['payment']['payer'] = template['payer'];
				scope.$parent['payment']['payee'] = template['payee'];
				scope.$parent['payment']['payeeAccountNumber'] = template['payeeAccountNumber'];
				scope.$parent['payment']['paymentType']['id'] = template['paymentType']['id'];

				$('#templates-list-modal').modal('hide');
				window.scope = scope.$parent;
			}
		}
	
	}
});

app.controller('CreatePaymentController', function($scope, $http, $window) {

	$scope.payment = {
		id: "",
		name: "",
		amount: "",
		remarks: "",
		reference: "",
		paidDate: (new Date()).toString('dd/MM/yyyy'),
		payee: {
			id: "",
			name: ""
		},
		payeeAccountNumber: "",
		payer: {
			id: "",
			name: ""
		},
		paymentType: {
			id: ""
		},
		startPeriod: Date.today().clearTime().moveToFirstDayOfMonth().toString('dd/MM/yyyy'),
//		startPeriod: "2012-09-01T00:00:00.000Z",
		endPeriod: ""
		
	}
	
	$scope.initializeForm = function(){
		
		$http({
			method : 'GET',
			url : '/api/payment_types'
		}).success(function(data, status, headers, config) {
			$scope.paymentTypes = data;
		}).error(function(data, status, headers, config) {
			console.log('failed to retrieve payment templates.');
		});
		
		
	}
	
	$scope.updateEndPeriod = function(){
		var startDate = Date.parseExact($scope.payment.startPeriod, 'dd/MM/yyyy');
		var endDate = startDate.add(1).months().add(-1).days();
		$scope.payment.endPeriod = endDate.toString('dd/MM/yyyy');
	}
	
	$scope.$watch('payment.startPeriod', function(value){
		
		if(value!==''){
			$scope.updateEndPeriod();
		}
	});
	

	
	$scope.$watch('payment.paymentType', function(value){
		$scope.payment.paymentType = value;
	});

	$scope.save = function() {
		
		$http({
			method : 'POST',
			url : '/api/payments',
			data : $scope.payment
		}).success(function(data, status, headers, config) {
			$scope.users = data;
			$window.location='/payments';
		}).error(function(data, status, headers, config) {
			console.log('failed saving user.');
		});
	};

});



app.controller('CreateMonthlyPaymentController', function($scope, $http, $window) {

	
	$scope.payment = {
			id: "",
			name: "",
			amount: "",
			remarks: "",
			reference: "",
			paidDate: (new Date()).toString('dd/MM/yyyy'),
			payee: {
				id: "",
				name: ""
			},
			payeeAccountNumber: "",
			payer: {
				id: "",
				name: ""
			},
			paymentType: {
				id: ""
			},
			months: [
			         {id: "01", name: "January", selected: false, reference: ""},
			         {id: "02", name: "February", selected: false, reference: ""},
			         {id: "03", name: "March", selected: false, reference: ""},
			         {id: "04", name: "April", selected: false, reference: ""},
			         {id: "05", name: "May", selected: false, reference: ""},
			         {id: "06", name: "June", selected: false, reference: ""},
			         {id: "07", name: "July", selected: false, reference: ""},
			         {id: "08", name: "August", selected: false, reference: ""},
			         {id: "09", name: "September", selected: false, reference: ""},
			         {id: "10", name: "October", selected: false, reference: ""},
			         {id: "11", name: "November", selected: false, reference: ""},
			         {id: "12", name: "December", selected: false, reference: ""}
			]			
		}
	
	
	$scope.initializeForm = function(){
		
		$http({
			method : 'GET',
			url : '/api/payment_types'
		}).success(function(data, status, headers, config) {
			$scope.paymentTypes = data;
		}).error(function(data, status, headers, config) {
			console.log('failed to retrieve payment templates.');
		});
		
		
	}
	
	$scope.$watch('payment.paymentType', function(value){
		
		$scope.payment.paymentType = value;
	});

	$scope.save = function() {
		
		$http({
			method : 'POST',
			url : '/api/monthly_payments',
			data : $scope.payment
		}).success(function(data, status, headers, config) {
			$scope.users = data;
			$window.location='/payments';
		}).error(function(data, status, headers, config) {
			console.log('failed saving user.');
		});
	};

});


app.controller('TestPaymentController', function($scope, $http) {

	$scope.test = {
			amount: "",
			paymentType: ""
	}
	
	$scope.paymentTypes = [];
	
	$scope.init = function(){
		$scope.paymentTypes.push({id: "1", name: "Bill"});
		$scope.paymentTypes.push({id: "2", name: "Installment"});
	}
	
	$scope.save = function(){
		
		console.log('save');
		console.log($scope.test);
	};
	
});
