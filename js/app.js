var app = angular.module('MainApp', ['ngMaterial']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('amber');
});

app.controller('MainController', ['$scope', '$http', '$sce', 'CartService', function($scope, $http, $sce, cartService) {
  $http.get('food.json')
       .then(function(res){
          $scope.foods = res.data;                
        });

	$scope.getHTMLvalue = function(html) {
      return $sce.trustAsHtml(html);	
     };       
}]);

// service to use shared cart data
app.service('CartService', function(){
  this.items = [];

  //sample object
  var item = {
    id: 0,
    qty: 0,
    price: 0.00 //final price
  };  


});

//Cart controller for cart/checkout page
app.controller('CartController', ['$scope', 'CartService', function($scope, cartService){


}]);
