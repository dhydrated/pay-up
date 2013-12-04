var app = angular.module('puPayment', [ 'puUser' ]);

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

app.controller('CreatePaymentController', function($scope, $http) {

	$scope.payment = {
		id: "",
		name: "",
		amount: "",
		remarks: "",
		reference: "",
		paidDate: "",
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
