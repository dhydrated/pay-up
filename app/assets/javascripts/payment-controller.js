var app = angular.module('puPayment', ['puUser']);

app.config(function($routeProvider) {
	$routeProvider.when('/new', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'CreatePaymentController'
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

app.controller('CreatePaymentController', function($scope, $http) {

	$scope.payment = {
		id: "",
		name: "",
		amount: "",
		remark: "",
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
