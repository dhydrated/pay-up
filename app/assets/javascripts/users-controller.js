var app = angular.module('pay-up', ['ngSanitize']);

function UsersController($scope, $http) {
	
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

app.directive('userSearch', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: '/assets/templates/user-name-field-and-search.html',
		scope: {
            eventHandler: '&ngClick'
        },
		link: function(scope, element, attribute){
			
			scope.name = attribute.userSearch;
			
			scope.userId = {
					name: attribute.userSearch + ".id",
					id: attribute.userSearch + "_id"
			};
			
			scope.userName = {
					name: attribute.userSearch + ".name",
					id: attribute.userSearch + "_name"
			};
			
			scope.userLabel = attribute.label;
			scope.userSearchId = attribute.userSearchId;
			scope.userSearchName = attribute.userSearchName;
			
		}
	}
});