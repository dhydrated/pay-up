var app = angular.module('puPayment', ['puUser', 'FileUploadModule']);

app.config(function($routeProvider) {
	$routeProvider.when('/new', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'CreatePaymentController'
	});
	
	$routeProvider.when('/edit/:paymentId', {
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
			
			/*scope.$watch('paymentTemplates', function(value){
				console.log(value);
			});*/
			
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

app.controller('CreatePaymentController', function($scope, $http, $window, $routeParams) {

	$scope.payment = {
		id: $routeParams.paymentId,
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
		
		if($scope.editMode()){
			
			$http({
				method : 'GET',
				url : '/api/payments/'+$scope.payment.id
			}).success(function(data, status, headers, config) {
				$scope.payment.paymentType = data.paymentType;
				$scope.payment.payee = data.payee;
				$scope.payment.payer = data.payer;
				$scope.payment.amount = data.amount;
				$scope.payment.remarks = data.remarks;
				$scope.payment.reference = data.reference;
				$scope.payment.payeeAccountNumber = data.payeeAccountNumber;
				$scope.payment.startPeriod = new Date(data.startPeriod).toString('dd/MM/yyyy');
				$scope.payment.endPeriod = new Date(data.endPeriod).toString('dd/MM/yyyy');
				$scope.payment.paidDate = new Date(data.paidDate).toString('dd/MM/yyyy');
			}).error(function(data, status, headers, config) {
				console.log('failed to retrieve payment templates.');
			});
			

			$scope.updateArtifactsList();
		}
	}
	
	$scope.updateArtifactsList = function(){
		$http({
			method : 'GET',
			url : '/api/payments/'+$scope.payment.id+'/artifacts'
		}).success(function(data, status, headers, config) {
			$scope.payment.artifacts = data;
		}).error(function(data, status, headers, config) {
			console.log('failed to retrieve payment artifacts.');
		});
	}
	
	$scope.editMode = function(){
		return ($scope.payment.id !== undefined);
	};
	
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
		
		var targetUrl = '/api/payments';

		if($scope.editMode()){
			targetUrl = targetUrl + '/' + $scope.payment.id
		}
		
		$http({
			method : 'POST',
			url : targetUrl,
			data : $scope.payment
		}).success(function(data, status, headers, config) {
			$scope.users = data;
			$window.location='/payments';
		}).error(function(data, status, headers, config) {
			console.log('failed saving user.');
		});
	};
	
	$scope.deleteArtifact = function(artifactId) {
		
		$http({
			method : 'POST',
			url : '/api/payments/artifacts/'+artifactId+'/delete'
		}).success(function(data, status, headers, config) {
			$scope.updateArtifactsList();
		}).error(function(data, status, headers, config) {
			console.log('failed deleting artifact.');
		});
		
	};
	
});



app.controller('CreateMonthlyPaymentController', function($scope, $http, $window) {

	
	$scope.payment = {
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
			         {id: "1", name: "January", selected: false, reference: ""},
			         {id: "2", name: "February", selected: false, reference: ""},
			         {id: "3", name: "March", selected: false, reference: ""},
			         {id: "4", name: "April", selected: false, reference: ""},
			         {id: "5", name: "May", selected: false, reference: ""},
			         {id: "6", name: "June", selected: false, reference: ""},
			         {id: "7", name: "July", selected: false, reference: ""},
			         {id: "8", name: "August", selected: false, reference: ""},
			         {id: "9", name: "September", selected: false, reference: ""},
			         {id: "10", name: "October", selected: false, reference: ""},
			         {id: "11", name: "November", selected: false, reference: ""},
			         {id: "12", name: "December", selected: false, reference: ""}
			],
			year: new Date().getFullYear()
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
		
		$scope.years = function() {
			
			currentYear = new Date().getFullYear();
			years = [];
			
			for(var i=currentYear-1; i<=currentYear+1; i++){
				years.push(i);
			}
			return years;
		}();
		
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
