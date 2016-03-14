
app.controller('RewardsController', 
    ['$scope', '$http', 
      function($scope, $http) {

  $http.get('json/rewards.json')
   .then(function(res){
      $scope.rewards = res.data;                
    });

   $scope.currentPoints = 1000;

   

   $scope.getRewardClass = function(r){
      if(r.points > $scope.currentPoints)
        return '';
      else if (r.hover)
        return' md-whiteframe-6dp';
      else
        return '';
   };

}]);
