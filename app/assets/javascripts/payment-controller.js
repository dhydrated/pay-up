var app = angular.module('puPayment', ['puUser']);

app.config(function($routeProvider) {
	$routeProvider.when('/new', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'CreatePaymentController'
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
		scope: {
			elementLabel: "@",
			elementId: "@",
			ngModel:"=",
            eventHandler: '&ngChange'
		},
		templateUrl: "/assets/templates/date-picker.html",
		link: function(scope, element, attributes){

			scope.$watch('elementId', function(oldValue, newValue){
				$('#'+newValue).datepicker({'format':'dd/mm/yyyy'}).on('changeDate', function(ev){
					scope.ngModel= (new Date(ev.date.valueOf())).toString('dd/MM/yyyy');
					scope.$apply();
					scope.eventHandler();
				});
			});
		}
	}
})

app.controller('CreatePaymentController', function($scope, $http) {

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
		payer: {
			id: "",
			name: ""
		},
		paymentType: {
			id: "",
			name: ""
		},
		startPeriod: "",
//		startPeriod: "2012-09-01T00:00:00.000Z",
		endPeriod: "",
		payeeAccount: ""
		
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
		console.log('updateEndPeriod');
		console.log($scope.payment);
		var startDate = Date.parseExact($scope.payment.startPeriod, 'dd/MM/yyyy');
		
		console.log(startDate);
		var endDate = startDate.add(1).months().add(-1).days();
		
		$scope.payment.endPeriod = endDate.toString('dd/MM/yyyy');
		$scope.$apply();
	}

	$scope.save = function() {
		
		$http({
			method : 'POST',
			url : '/api/payments',
			data : $scope.payment
		}).success(function(data, status, headers, config) {
			$scope.users = data;
		}).error(function(data, status, headers, config) {
			console.log('failed saving user.');
		});
	};

});
