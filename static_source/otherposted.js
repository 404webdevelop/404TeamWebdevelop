(function (global) {

'use strict';

var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var cookie = global.cookie_setting;


var data= {"username":cookie.get("click_username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="otherpost";
    $('#post_post').click(function(){
        update_and_post.post_posts(cookie,data.username);
    });

    
    $(document).ready(function () {

        infor_nav.nav_inf_setting(cookie,data,page);
        clicks.clickbtn(cookie);
        var friends_list = [];
        load_post.posts_load(data,page,cookie);
        console.log("user id is:"+cookie.get("userid"));
        console.log("target id is:"+cookie.get("click_id"));
        console.log("target id is:"+cookie.get("click_username"));
    });
  };

      setup(cookie,login_infor_set,infor_nav,clicks,data);
  

})(this);
