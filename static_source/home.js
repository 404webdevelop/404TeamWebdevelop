

(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var frineds_find =global.findfriends;



function setup(data,cookie,login_infor_set,infor_nav,clicks){

    var page="home";
    login_infor_set.infor_setting(clicks,infor_nav,cookie);
    load_post.posts_load(data,page,cookie);
    clicks.clickbtn(cookie);
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
clicks.clickbtn(cookie);
setup(data,cookie,login_infor_set,infor_nav,clicks);
});
})(this);


