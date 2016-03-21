

(function (global) {

'use strict';


function setup(data){

    var page="home";
    global.login_setting.infor_setting();
    global.load_posts.posts_load(data,page);
};


$( document ).ready(function() {


  var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "no_image":"/static/image/no_image.jpg",
       "userphoto":global.cookie_setting.get("picture"),
       "followers":global.findfriends.get_follower,
       "following":global.findfriends.get_following,
       "friends":"12"
       };

setup(data);
});
})(this);


