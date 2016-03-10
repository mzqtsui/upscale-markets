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

     

     cartService.currentOrder.increaseItem(new Item('0',1,2.55));

     function Item(id, qty, price){
      this.id = id;
      this.qty = qty;
      this.price = price;
    };
}]);

// service to use shared cart data
app.service('CartService', function(){
  //every order has 0 or more items
  this.currentOrder = new Order();
  this.item = new Item(0,1,1.00);
  console.log(this.item);

  
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
      this.items[item.id] = new Item(item.id, 1, item.price);
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

  Order.prototype.updateTotal = function(){
    this.total = 0;
    for(i in this.items){
      this.total += this.items[i].price * this.items[i].qty;
    }
    console.log(this);
  }



  function Item(id, qty, price){
    this.id = id;
    this.qty = qty;
    this.price = price;
  };


});

//Cart controller for cart/checkout page
app.controller('CartController', ['$scope', 'CartService', function($scope, cartService){


}]);
