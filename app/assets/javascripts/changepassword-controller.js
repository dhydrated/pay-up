var app = angular.module('puChangePassword', ['puFormModule']);


app.controller('ChangePasswordController', function($scope, $http) {
	
	$scope.password = "";
	$scope.confirm_password = "";
	
	$scope.changePassword = function(){
		
		console.log('sving');
		
		//action="/users/loggedin_user_update_password" method="POST"
		
		var data = {
				password: $scope.password
		}
		
		$http.post('/users/loggedin_user_update_password', data).success(successCallback);
		
		return false;
	}
});