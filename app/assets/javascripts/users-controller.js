angular.module('pay-up', ['ngSanitize']);

function UsersController($scope, $http) {
	
	/*$scope.updateReferenceFields = function(value) {
		console.log('hi there!');
		console.log(value);
		console.log($scope);
		
		var obj = angular.element("#references["+value+"]");
		console.log(obj);
		obj.css( "display", "inline");
	};
	
	$scope.toggle = function(a){
		console.log(a);
	}*/
	
	
	$http({ method: 'GET', url: '/api/users' }).
	  success(function (data, status, headers, config) {
		$scope.users = data;
	  }).
	  error(function (data, status, headers, config) {
	    console.log('failed retrieving users list.');
	  });
	
	
	$($scope.userSelectId).on('shown.bs.modal', function () {
		$('#search-user').focus();
	});
	
	$($scope.userSelectId).on('hidden.bs.modal', function () {
		$scope.userSelectId = undefined;
	});
		
	$scope.selectUser = function(user){
		$($scope.userSelectId).val(user.id);
		$($scope.userSelectName).val(user.name);
		$('#user-modal').modal('hide');
	}
	
	$scope.showUserSearch = function(userSelect){
		$scope.userSelectId = '#'+userSelect+'_id';
		$scope.userSelectName = '#'+userSelect+'_name';
		$('#user-modal').modal('show')
	}	
	
	
}