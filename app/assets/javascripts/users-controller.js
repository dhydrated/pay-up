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
	    $scope.populateSearchUsersList();
	    
	  }).
	  error(function (data, status, headers, config) {
	    console.log('failed retrieving users list.');
	  });
	
	$scope.populateSearchUsersList = function() {
		console.log('populate users');
		console.log($scope.users);
		
		content = "";

		  content += "<tr>";
		  content += "  <th>";
		  content += "  Name";
		  content += "  </th>";
		  content += "</tr>";
		  
		angular.forEach($scope.users, function(user){
			  console.log(user.email);
			  
			  content += "<tr>";
			  content += "  <td>";
			  content += user.name;
			  content += "  </td>";
			  content += "</tr>";
				  
			});
		
		console.log(content);
		
		$scope.myHTML = content;
		/*$scope.users.each(function(user){
			
			console.log($(user));
			
		});*/
		
	};
	
	$('#payee-modal').on('shown.bs.modal', function () {
		  console.log('test');
		})
}