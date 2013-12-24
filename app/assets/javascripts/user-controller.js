
var app = angular.module('puUser', ['ngSanitize', 'puFormModule']);

app.controller('UserController', function($scope, $http) {
	
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
		$scope.userSelectId = '#'+userSelect.toLowerCase()+'.id';
		$scope.userSelectName = '#'+userSelect.toLowerCase()+'_name';
		$('#'+userSelect.toLowerCase()+'-modal').modal('show');
	};
	
	
});

app.directive('userSearch', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/assets/templates/user-name-field-and-search.html',
		scope: {
			ngModel:"=",
            eventHandler: '&ngClick'
            
        },
		link: function(scope, element, attribute){
			
			scope.name = attribute.name;
			scope.label = attribute.label;
			
			scope.selectUser = function(user) {
				$('#'+scope.name+'-modal').modal('hide');
				scope.$parent.$parent[attribute.parentModel][scope.name].id = user.id;
				scope.$parent.$parent[attribute.parentModel][scope.name].name = user.name;
			};
			
			$(element).on('shown.bs.modal', function () {
				$('#search-'+scope.name.toLowerCase()).focus();
			});
			
		}
	}
});