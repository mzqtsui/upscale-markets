app.controller('SettingsController', 
  ['$scope', '$mdDialog', '$mdMedia', '$sce', '$http',
  function($scope, $mdDialog, $mdMedia, $sce, $http) {
    $scope.getHTMLvalue = function(html) {
      return $sce.trustAsHtml(html);  
     };      

  $scope.user = {
      'First name': 'Anduin',
      'Last name': 'Wrynn',
      'E-mail Address': 'anduin.wrynn@stormwind.ca',
      'Address' : '1 Stormwind Castle, Eastern Kingdoms, Azeroth'
    };
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm'); 
  $scope.showPrompt = function(ev) {
    $mdDialog.show({
          controller: ['$scope', '$mdDialog',
            function($scope, $mdDialog){
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
          }],
          templateUrl: 'dialog/profilepwd.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
      });
  };
  $scope.editProfile = function(ev) {
    $mdDialog.show({
          controller: ['$scope', '$mdDialog',
            function($scope, $mdDialog){
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
          }],
          templateUrl: 'dialog/editProfile.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
      });
  };
  $scope.showTracking = function(ev) {
    $mdDialog.show({
          controller: ['$scope', '$mdDialog',
            function($scope, $mdDialog){
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
          }],
          templateUrl: 'dialog/track.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
      });
  };  
}]);


