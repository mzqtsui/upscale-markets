//Cart controller for cart/checkout hud
app.controller('CartController', ['$scope', '$mdMedia', '$mdDialog', 'CartService', 
  function($scope, $mdMedia, $mdDialog, cartService){
 $scope.cartHover;
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
      templateUrl: 'dialog/cart.tmpl.html',
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
