(function (global) {

'use strict';


function setup(data){
    var page="otherpost";
    $('#post_post').click(function(){
        update_and_post.post_posts(data.username);
    });

    
    $(document).ready(function () {
        var friends_list = [];
        global.nav_inf.nav_inf_setting(data,page);
        global.load_posts.posts_load(data,page);
        global.button_click.clickbtn();
        console.log("user id is:"+global.cookie_setting.get("userid"));
        console.log("target id is:"+global.cookie_setting.get("click_id"));
        console.log("target id is:"+global.cookie_setting.get("click_username"));
        console.log("target fist name: "+global.cookie_setting.get("click_first_name"));
        console.log("target last name: "+global.cookie_setting.get("click_last_name"));


    });
  };
$( document ).ready(function() {
      var data= {"username":global.cookie_setting.get("click_username"),
                 "token":global.cookie_setting.get("token"),
                 "firstname":global.cookie_setting.get("click_first_name"),
                 "lastname": global.cookie_setting.get("click_last_name"),
                 "userphoto":"/static/image/no_image.jpg",
                 "followers":"50",
                 "following":"77",
                 "friends":"112"
                 };
      
      setup(data);
  });

})(this);
