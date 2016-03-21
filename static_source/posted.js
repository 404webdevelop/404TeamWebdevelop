(function (global) {

'use strict';



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

function setup(data){
    var page="posted";

  

    $(document).ready(function () {
        global.nav_inf.nav_inf_setting(data,page);
        global.button_click.clickbtn();
        var friends_list = [];
        global.load_posts.posts_load(data,page);
        console.log("user id is:"+global.cookie_setting.get("userid"));
        console.log("target id is:"+global.cookie_setting.get("click_id"));
    });
  };
$( document ).ready(function() {
  var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "no_image":"/static/image/no_image.jpg",
       "userphoto":global.cookie_setting.get("picture"),
       "followers":"50",
       "following":"77",
       "friends":"112"
       };
      setup(data);
  });

})(this);
