(function (global) {

'use strict';

var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var cookie = global.cookie_setting;

login_infor_set.infor_setting(cookie);

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

function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="posted";

  

    $(document).ready(function () {




        infor_nav.nav_inf_setting(cookie,data,page);
        clicks.clickbtn(cookie);
        var friends_list = [];
        load_post.posts_load(data,page,cookie);
        console.log("user id is:"+cookie.get("userid"));
        console.log("target id is:"+cookie.get("click_id"));
    });
  };
$( document ).ready(function() {
      setup(cookie,login_infor_set,infor_nav,clicks,data);
  });

})(this);
