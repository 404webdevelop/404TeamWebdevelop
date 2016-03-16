

(function (global) {

'use strict';


function setup(data){

    var page="home";
    global.login_setting.infor_setting();
    global.load_posts.posts_load(data,page);
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
setup(data);
});
})(this);


