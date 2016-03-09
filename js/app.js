var app = angular.module('MainApp', ['ngMaterial']);

app.controller('MainController', function($scope, $http, $sce) {
  $http.get('food.json')
       .then(function(res){
          $scope.foods = res.data;                
        });

	$scope.getHTMLvalue = function(html) {
      return $sce.trustAsHtml(html);	
     };       
});
