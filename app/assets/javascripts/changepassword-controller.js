var app = angular.module('puChangePassword', ['puFormModule']);


app.controller('ChangePasswordController', function($scope, $http) {

	$scope.data = {
		first_password : "",
		confirm_password : ""
	};
	
	$scope.changePassword = function(e){
		

		
		if($scope.data.first_password !== '' &&
				$scope.data.first_password === $scope.data.confirm_password){
			
			/*var post_data = {
					password: $scope.data.first_password
			}
			
			console.log(post_data);
			
			$http
			.post('/users/loggedin_user_update_password', post_data)
			.success(function(data, status, headers, config) {
				console.log(status);
			})
			.error(function(data, status, headers, config) {
				console.log('failed update password.');
			});*/
			
			
		}
		else{
			e.preventDefault();
			console.log("not the same");
		}
	}
});