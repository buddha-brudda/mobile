angular.module('starter.services', [])

.controller('AlertCenterCtrl', ['$http', function($http){
  var alertCenter = this;
  $http.get("http://buddhabrudda.mybluemix.net/notifications/4699553379")
  .success(function(data){
    alertCenter.notificationList = data;
  });
}]);

