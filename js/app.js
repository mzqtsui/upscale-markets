var app = angular.module('MainApp', ['ngMaterial']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('indigo');
});

app.controller('MainController', function($scope, $http, $sce) {
  $http.get('food.json')
       .then(function(res){
          $scope.foods = res.data;                
        });

	$scope.getHTMLvalue = function(html) {
      return $sce.trustAsHtml(html);	
     }; 

  $scope.user = {
      'First name': 'Anduin',
      'Last name': 'Wrynn',
      'E-mail Address': 'anduin.wrynn@stormwind.ca',
      'Address' : '1 Stormwind Castle, Eastern Kingdoms, Azeroth'
    };
    
});
