var app = angular.module('MainApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});

app.controller('MainController', 
    ['$scope', '$http', 'CartService',
      function($scope, $http, cartService) {

  $http.get('json/food.json')
       .then(function(res){
          $scope.foods = res.data;                
        });

  $scope.total = 0;

    
   $scope.getQuantity = function(food){
    var qty = cartService.currentOrder.getQuantity(food);
    return qty;
   }

   $scope.setQuantity = function(food, qty){
    $scope.total = cartService.currentOrder.setQuantity(food, qty);
   }

   $scope.increaseItem = function(food){
    $scope.total = cartService.currentOrder.increaseItem(food);
    food.qty = $scope.getQuantity(food);
   }

   $scope.decreaseItem = function(food){
    if(food.qty > 0){
      $scope.total = cartService.currentOrder.decreaseItem(food);
      food.qty = $scope.getQuantity(food);
      
    }
   }

   
}]);

// service to use shared cart data
app.service('CartService', ['Order',function(Order){
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
      if(this.items[item.id].qty > 99)
        this.items[item.id].qty = 99;
    }else{
      this.items[item.id] = new OrderItem(item.id, item.price, item.name);
    }
    return this.updateTotal();
  };

  Order.prototype.decreaseItem = function(item){
    if(item.id in this.items){
      this.items[item.id].qty--;
      if(this.items[item.id].qty <= 0)
        delete this.items[item.id];
    }
    return this.updateTotal();
  };

  Order.prototype.setQuantity = function(food, qty){
    if(food.id in this.items)
      this.items[food.id].qty = qty;
    else
      this.items[food.id] = new OrderItem(food.id, food.price, food.name);
    this.items[food.id].qty = qty;
    return this.updateTotal();
  }

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
    
    return this.total;
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

