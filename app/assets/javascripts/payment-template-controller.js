var app = angular.module('puPaymentTemplate', ['puFormModule', 'puUser']);


app.controller('PaymentTemplateController', function($scope, $http, $window, $routeParams) {

	$scope.paymentTemplate = {

			payee: {
				id: "",
				name: ""
			},
			payer: {
				id: "",
				name: ""
			}
		
	};
	
	$scope.setPayee = function(id, name){
		$scope.paymentTemplate.payee.id = id,
		$scope.paymentTemplate.payee.name = name;
	};
	
	$scope.setPayer = function(id, name){
		$scope.paymentTemplate.payer.id = id,
		$scope.paymentTemplate.payer.name = name;
	};
	
});
