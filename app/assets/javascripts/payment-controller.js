var app = angular.module('puPayment', [ 'puUser' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/new', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'CreatePaymentController'
	});
	

	$routeProvider.otherwise({ redirectTo: '/new' });
})

app.controller('CreatePaymentController', function($scope, $http) {

	$scope.payment = {
		name : ""
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
