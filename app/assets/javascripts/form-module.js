var app = angular.module('puFormModule', []);

app.directive("fieldRow", function(){
	return {
		restrict: "E",
		transclude: true,
		scope: {
			elementLabel: "@",
			elementId: "@"
		},
		templateUrl: "/assets/templates/field-row.html"
	}
});
