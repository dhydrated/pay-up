
var app = angular.module('puUser', ['ngSanitize']);

app.controller('UsersController', function($scope, $http) {
	
	$scope.retrieveUsers = function(){
		$http({ method: 'GET', url: '/api/users' }).
		  success(function (data, status, headers, config) {
			$scope.users = data;
		  }).
		  error(function (data, status, headers, config) {
		    console.log('failed retrieving users list.');
		  });
	};
	
	$scope.showUserSearch = function(userSelect){
		$scope.userSelectId = '#'+userSelect.toLowerCase()+'_id';
		$scope.userSelectName = '#'+userSelect.toLowerCase()+'_name';
		$('#'+userSelect.toLowerCase()+'-modal').modal('show');
	};
	
	
});

app.directive('userSearch', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: '/assets/templates/user-name-field-and-search.html',
		scope: {
			ngModel:"=",
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
			
			scope.selectUser = function(user) {
				$('#'+scope.userId.id).val(user.id);
				$('#'+scope.userName.id).val(user.name);
				$('#'+scope.name+'-modal').modal('hide');
				scope.ngModel = user.id;
			};
			
			$(element).on('shown.bs.modal', function () {
				$('#search-'+scope.name.toLowerCase()).focus();
			});
			
		}
	}
});