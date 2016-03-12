var app = angular.module('MainApp', ['ngMaterial']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});

app.controller('MainController', 
    ['$scope', '$http', '$sce', '$mdToast', '$mdDialog', '$mdMedia', 'CartService', 'OrderItem', 
      function($scope, $http, $sce, $mdToast, $mdDialog, $mdMedia, cartService, OrderItem) {

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
        

  $scope.total = 0;

    
   $scope.getQuantity = function(food){
    var qty = cartService.currentOrder.getQuantity(food);
    return qty;
   }

   $scope.increaseItem = function(food){
    cartService.currentOrder.increaseItem(food);
    food.qty = $scope.getQuantity(food);
    $scope.total = cartService.currentOrder.total;
   }

   $scope.decreaseItem = function(food){
    if(food.qty > 0){
      cartService.currentOrder.decreaseItem(food);
      food.qty = $scope.getQuantity(food);
      $scope.total = cartService.currentOrder.total;
    }
   }


   
    $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', 'CartService',
        function($scope, $mdDialog, cartService){
          $scope.order = cartService.currentOrder;
          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.checkout = function(){
          }
      }],
      templateUrl: 'cart.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
}]);



// service to use shared cart data
app.service('CartService', ['OrderItem','Order',function(OrderItem, Order){
  //every order has 0 or more items
  this.currentOrder = new Order();

}]);

app.factory('Order', ['OrderItem',function(OrderItem){
  function Order(){
    this.orderId = Date.now();
    this.total = 0;  //$ sum
    this.items = {}; //items map
    this.empty = true;
  };

  Order.prototype.increaseItem = function(item){
    //if item already exists, update quantity
    if(item.id in this.items){
      this.items[item.id].qty++;
    }else{
      this.items[item.id] = new OrderItem(item.id, item.price, item.name);
    }
    this.updateTotal();
    return this;
  };

  Order.prototype.decreaseItem = function(item){
    if(item.id in this.items){
      this.items[item.id].qty--;
      if(this.items[item.id].qty <= 0)
        delete this.items[item.id];
    }
    this.updateTotal();
    return this;
  };

  Order.prototype.getQuantity = function(food){
    if(food.id in this.items){
      return this.items[food.id].qty;
    }
    return 0;
  }

  Order.prototype.updateTotal = function(){
    this.total = 0;
    for(i in this.items){
      this.total += this.items[i].price * this.items[i].qty;
    }
    if(this.total == 0)
      this.empty = true;
    else
      this.empty = false;
    //console.log(this);
  };

  return Order;
}]);


app.factory('OrderItem', function(){
  function OrderItem(id, price, name){
    this.id = id;
    this.qty = 1;
    this.price = price;
    this.name = name;
  };
  return OrderItem;
});

//Cart controller for cart/checkout page
app.controller('CartController', ['$scope', 'CartService', function($scope, cartService){


}]);

