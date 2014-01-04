var app = angular.module('puChangePassword', ['puFormModule']);


app.controller('ChangePasswordController', function($scope, $http) {

	$scope.data = {
		first_password : "",
		confirm_password : ""
	};
	
	$scope.notTheSame = function(){
		if($scope.data.first_password !== $scope.data.confirm_password){
			return true;
		}
		
		return false;
	};
	
	$scope.changePassword = function(e){
		
		if($scope.data.first_password !== '' &&
				$scope.data.first_password === $scope.data.confirm_password){
			
		}
		else{
			e.preventDefault();
			console.log("not the same");
		}
	}
});