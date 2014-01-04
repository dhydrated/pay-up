var app = angular.module('puChangePassword', ['puFormModule']);


app.controller('ChangePasswordController', function($scope, $http) {

	$scope.data = {
		first_password : "",
		confirm_password : ""
	};
	
	$scope.$watch("data.first_password", function(val){
		console.log("data.first_password");
		console.log(val);
		console.log($scope);
	})
	
	$scope.notTheSame = function(){
		if($scope.data.first_password !== $scope.data.confirm_password
				&& $scope.data.first_password !== undefined){
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