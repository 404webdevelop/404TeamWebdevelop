

/*function wori(){
          console.log(document.getElementById("click_target").value);
          //window.location.href = "posted";        
      };
*/




(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var frineds_find =global.findfriends;


function getfollowings(cookie,data){
  var url = "api/follow/"+cookie.get("userid")+"/followings";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            //console.log(callback);
            $.each(followersobj, function (i, value) {
             
                $.getJSON(followersobj[i].followed,function(data){
                    
                    $("#f1").append("<li id = \""+data.username+"\" value=\""+data.id+"\" class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\">"+data.username+"</a></li>");
                });
            
            });
         });
  request.fail(function (callback) {
            console.log(callback);
         });

}




function getfollowers(cookie,data){
  console.log(cookie.get("userid"));
  var url = "api/follow/"+cookie.get("userid")+"/followers";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            

            $.each(followersobj, function (i, value) {
                $.getJSON(followersobj[i].follower,function(data){
                    console.log("sdfsf");
                    console.log(data.id);
                    console.log("------");
                    $("#f3").append("<li id = \""+data.username+"\" value=\""+data.id+"\" class=\"ui-last-child\" ><a id =\"click_target\" value=\""+data.id+"\"  class=\"ui-btn ui-btn-icon-right ui-icon-plus\" >"+data.username+"</a></li>");
                });
              
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}


function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="network";


$( document ).ready(function() {
    infor_nav.nav_inf_setting(cookie,data,page);
    clicks.clickbtn(cookie);
    frineds_find.friends(cookie,data,page);
    getfollowers(cookie,data);
    getfollowings(cookie,data);
  });
};



$( document ).ready(function() {
  var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "firstname":cookie.get("firstname"),
       "lastname": cookie.get("lastname"),
       "userphoto":"/static/image/no_image.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

setup(cookie,login_infor_set,infor_nav,clicks,data);
});
})(this);




