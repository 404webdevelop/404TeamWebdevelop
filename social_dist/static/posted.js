(function (global) {

'use strict';

var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var cookie = global.cookie_setting;

var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

console.log(data.url);
console.log(data.username);
console.log(data.token);

function signuppage(){
  window.location="signup";
};


function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="posted";

   $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data1 = {"username": username, "password": password};
        var url = "api-token/";
        var callback = "";
        login_infor_set.userinf_setting(cookie,url,data1,callback);
        login_infor_set.url_setting(cookie,username);
        setTimeout(function(){
          window.location.href = "home";
        },1000
          );
    });

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
    clicks.clickbtn();
    var friends_list = [];
    load_post.posts_load(friends_list[0],data,page);
    
  };

  setup(cookie,login_infor_set,infor_nav,clicks,data);


})(this);
