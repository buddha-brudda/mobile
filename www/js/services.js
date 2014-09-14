angular.module('starter.services', [])

.controller('AlertCenterCtrl', ['$http', function($http){
  var alertCenter = this;
  alertCenter.notificationList = [];
  // alertCenter.notificationList = [{date:"2014-09-14T00:50:30.048Z"},{date:"2014-09-14T00:40:30.048Z"}];
  notificationList_dateISOString_toDateAgo(alertCenter.notificationList);
  setInterval(function(){
    $http.get("http://buddhabrudda.mybluemix.net/notifications/4699553379")
    .success(function(data){
      alertCenter.notificationList = data;
      // alertCenter.notificationList = [{time:"2014-09-14T00:50:30.048Z"},{time:"2014-09-14T00:40:30.048Z"}];
      notificationList_dateISOString_toDateAgo(alertCenter.notificationList);
    });
  }, 3000);
}]);

function notificationList_dateISOString_toDateAgo(notificationList){
  for (var i=0;i<notificationList.length; ++i){
    var dateISOString = notificationList[i].date;
    notificationList[i].ago = moment(dateISOString).fromNow();
  }
  return notificationList;  
}
