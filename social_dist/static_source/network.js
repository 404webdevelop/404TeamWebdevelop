(function (global) {

'use strict';


var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var frineds_find =global.findfriends;

var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };


function getfollowings(data){
  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            $.each(followersobj, function (i, value) {;
              if (followersobj[i].follower == data.url){
                $.getJSON(followersobj[i].followed,function(data){
                    data = data.username;
                    $("#f1").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                });
              }
            });
         });
  request.fail(function (callback) {
            console.log(callback);
         });

}

function getfollowers(data){
  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
              if (followersobj[i].followed == data.url){
                console.log(followersobj[i].followed);
                console.log(data.url);
                $.getJSON(followersobj[i].follower,function(data){
                    data = data.username;
                    $("#f3").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-plus\"href=\"#\">"+data+"</a></li>");
                });
              }
            });  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}


function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="network";

    $('#post_post').click(function(){
        update_and_post.post_posts(data.url);
    });

    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        update_and_post.update_profile(cookie,data,username_input,firstname_input, lastname_input); 
    });



    infor_nav.nav_inf_setting(data,page);
    clicks.clickbtn(cookie);
    frineds_find.friends(data,page);
    getfollowers(data);
    getfollowings(data);
};

setup(cookie,login_infor_set,infor_nav,clicks,data);

})(this);




