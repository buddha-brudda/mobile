angular.module('starter.services', [])

.controller('AlertCenterCtrl', ['$http', function($http){
  var userId = "Ian";
  var userNumber = "4699553379";
  var alertCenter = this;
  alertCenter.notificationList = [];
  // alertCenter.notificationList = [{time:"2014-09-14T00:50:30.048Z", callback:"http:///google.com", reactions:[{text:"upvote", closeNotification:true},{text:"downvote"}]},   {time:"2014-09-14T00:40:30.048Z"}];
  notificationList_dateISOString_toDateAgo(alertCenter.notificationList);
  setInterval(function(){
    $http.get("http://buddhabrudda.mybluemix.net/notifications/4699553379")
    .success(function(data){
      alertCenter.notificationList = data;
      // alertCenter.notificationList = [{time:"2014-09-14T00:50:30.048Z", callback:"http:///google.com", reactions:[{text:"upvote", closeNotification:true},{text:"downvote"}]},   {time:"2014-09-14T00:40:30.048Z"}];
      notificationList_dateISOString_toDateAgo(alertCenter.notificationList);
    });
  }, 3000);

  this.react = function(notificationIdx, reactionIdx){
    var currNotif = alertCenter.notificationList[notificationIdx];
    var currReact = alertCenter.notificationList[notificationIdx].reactions[reactionIdx];
    console.log("react", notificationIdx, reactionIdx, "-->", currNotif.id);
    if(true || currReact.closeNotification){ //permanent true - simplify API case
      this.hideNotification(currNotif, 1);
    }
    if(typeof currNotif.callback!='undefined'){
      console.log("@@@",currNotif.callback);
      $http.post(currNotif.callback, {name:userId, action:currReact.text}); ////
      currNotif.callbackResponse = currReact.text+" is successful.";
      console.log("callback was done for",currReact.text);
    }
    if(typeof currReact.redirection!='undefined'){
      console.log("redirect to", currReact.redirection);
    }
  };
  this.hideNotificationByIdx = function(notificationIdx){
    alertCenter.hideNotification( alertCenter.notificationList[notificationIdx], 0 );
  };
  this.hideNotification = function(currNotif, delayInSec){
    setTimeout(function(){
      currNotif.canHide = true;
      $http.post("http://buddhabrudda.mybluemix.net/read/"+userNumber, {id:currNotif.id}); //This is postId
    }, delayInSec*1000);
  };

}]);

function notificationList_dateISOString_toDateAgo(notificationList){
  for (var i=0;i<notificationList.length; ++i){
    var dateISOString = notificationList[i].date;
    notificationList[i].ago = moment(dateISOString).fromNow();
  }
  return notificationList;  
}
