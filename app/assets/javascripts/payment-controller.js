
var app = angular.module('puPayment', []);

app.controller('PaymentController', function($scope, $http) {
	
	$scope.payment = {
			name : ""
	}
	
	$scope.save = function(){
		alert('saving ' + $scope.payment.name);
		
		$http({ method: 'POST', url: '/api/payments', data: $scope.payment }).
		  success(function (data, status, headers, config) {
			$scope.users = data;
		  }).
		  error(function (data, status, headers, config) {
		    console.log('failed saving user.');
		  });
	};
	
	
});

