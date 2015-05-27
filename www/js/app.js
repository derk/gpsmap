// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','baiduMap','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MapCtrl', function($scope,$cordovaGeolocation){
  $scope.showmap = false;
  $scope.longitude = 113.457;
  $scope.latitude = 23.392;
  $scope.getLocation = function(){
    $scope.showmap = false;
    var posOptions = {timeout:10000,enableHighAccruacy:true};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
      $scope.longitude = position.coords.longitude;
      $scope.latitude = position.coords.latitude;
      gotoMap();
    },function(error){
      $scope.showmap = true;
      console.log(error);
      alert('code:'+error.code+'\n'+'message:'+error.message='\n');
    });
  }
  $scope.setLocation = function(){
    gotoMap();
  }
  var gotoMap=function(){
    $scope.showmap = true;
    $scope.mapOptions = {
      center:{
        longitude:$scope.longitude,
        latitude:$scope.latitude
      },
      zoom:17,
      city:'?',
      markers:[{
        longitude:$scope.longitude,
        latitude:$scope.latitude,
        icon:'img/mappoint.png',
        width:49,
        height:60,
        title:'地址名称-大机电',
        content:'地址注释-大机电是什么鬼'
      }]
    };
  }
  $scope.clearMap = function(){
    $scope.showmap = false;
  }
});