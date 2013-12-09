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
		/*controller:function($scope,$attrs)  {
            $scope.x=$attrs;

            $scope.$watch('ngModel',function(){
                $scope.$parent.ngModel=$scope.ngModel;
            	console.log($scope.$parent);
            }) ;

            $scope.ngModel=$attrs.value;
        },*/
		templateUrl: "/assets/templates/date-picker.html",
		link: function(scope, element, attributes){

			scope.$watch('elementId', function(oldValue, newValue){
				$('#'+newValue).datepicker({'format':'dd/mm/yyyy'}).on('changeDate', function(ev){
				    /*var startDate = (new Date(ev.date.valueOf()));
					var endDate = startDate.add(1).months().add(-1).days(); //set the end period a month from startPeriod.
*/				
					scope.eventHandler();

					scope.ngModel= (new Date(ev.date.valueOf())).toString('dd/MM/yyyy');
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
//		startPeriod: "2012-09-01T00:00:00.000Z",
		endPeriod: "",
		payeeAccount: ""
		
	}
	
	$scope.$watch('payment.startPeriod', function (v) {
        console.log('value changed, new value is: ' + v);
    });
	
	
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
		var startDate = (new Date($scope.payment.startPeriod.valueOf()));
		var endDate = startDate.add(1).months().add(-1).days();
		
		$scope.payment.endPeriod = endDate;
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
