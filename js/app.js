var app = angular.module('MainApp', ['ngMaterial']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});

app.controller('MainController', 
    ['$scope', '$http', '$sce', '$mdToast', 'CartService', 'OrderItem', 
      function($scope, $http, $sce, $mdToast, cartService, OrderItem) {

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

  $scope.showSimpleToast = function(msg) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .hideDelay(1000)
    );
  };
    
   $scope.getQuantity = function(food){
    var qty = cartService.currentOrder.getQuantity(food);
    food.open = qty > 0;
    return qty;
   }

   $scope.increaseItem = function(food){
    cartService.currentOrder.increaseItem(food);
    food.qty = $scope.getQuantity(food);
    $scope.total = cartService.currentOrder.total;
    $scope.showSimpleToast(food.name + ' added');
   }

   $scope.decreaseItem = function(food){
    if(food.qty > 0){
      cartService.currentOrder.decreaseItem(food);
      food.qty = $scope.getQuantity(food);
      $scope.total = cartService.currentOrder.total;
      $scope.showSimpleToast(food.name + ' removed');
    }
   }
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
      if(this.items[item.id].qty < 0)
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

