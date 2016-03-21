
(function (global) {

'use strict';

var cookie = global.cookie_setting;

    function setup(data){
        var page="network";

    $( document ).ready(function() {
        global.nav_inf.nav_inf_setting(data,page);
	global.load_posts.posts_load(data,page,cookie);
        global.button_click.clickbtn();
       
      });
    };



    $( document ).ready(function() {
      var data= {"username":global.cookie_setting.get("username"),
           "postid":global.cookie_setting.get("post_id"),
           "url":global.cookie_setting.get("url"),
           "token":global.cookie_setting.get("token"),
           "firstname":global.cookie_setting.get("firstname"),
           "lastname": global.cookie_setting.get("lastname"),
	         "no_image":"/static/image/no_image.jpg",
           "userphoto":global.cookie_setting.get("picture"),
           "following":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoing laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
           "followers":"A Great Test Post",
           "friends":"112"
           };

    setup(data);
    });
})(this);




