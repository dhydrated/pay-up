//inject angular file upload directives and service.
fileUploadModule = angular.module('FileUploadModule', ['angularFileUpload']);

fileUploadModule.config(function($routeProvider) {
	
	$routeProvider.when('/edit/:paymentId', {
		templateUrl : '/assets/templates/payment/create.html',
		controller : 'FileUploadController'
	});
	
});

var FileUploadController = [ '$scope', '$upload', '$routeParams', function($scope, $upload, $routeParams) {
	
  
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      console.log(file);
      $scope.upload = $upload.upload({
    	//upload.php script, node.js route, or servlet url
        url: '/api/upload_payment_file/'+$routeParams.paymentId, 
        // method: POST or PUT,
        // headers: {'headerKey': 'headerValue'}, withCredential: true,
        data: {myObj: $scope.myModelObj},
        file: file
        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
        //fileFormDataName: myFile,
        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
        //formDataAppender: function(formData, key, val){} 
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
    }
  };
}];