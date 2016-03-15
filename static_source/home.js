

(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var frineds_find =global.findfriends;



function setup(data){

    var page="home";
    global.login_setting.infor_setting(cookie);
    global.load_posts.posts_load(data,page,cookie);
    global.button_click.clickbtn();
    console.log("why");
};


$( document ).ready(function() {

  var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "userphoto":"/static/image/no_image.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };
global.button_click.clickbtn();
setup(data);
});
})(this);


