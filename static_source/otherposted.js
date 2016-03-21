(function (global) {

'use strict';


function setup(data){
    var page="otherpost";
    $('#post_post').click(function(){
        update_and_post.post_posts(data.username);
    });

    
        console.log(global.cookie_setting.get("click_first_name"));
        var friends_list = [];
        
        console.log("user id is:"+global.cookie_setting.get("userid"));
        console.log("target id is:"+global.cookie_setting.get("click_id"));
        global.nav_inf.nav_inf_setting(data,page);
        global.load_posts.posts_load(data,page);
        global.button_click.clickbtn();
        



  };
$( document ).ready(function() {
      var data= {"username":global.cookie_setting.get("click_username"),
                 "token":global.cookie_setting.get("token"),
                 "firstname":global.cookie_setting.get("click_first_name"),
                 "lastname": global.cookie_setting.get("click_last_name"),
                 "no_image":"/static/image/no_image.jpg",
                 "userphoto":global.cookie_setting.get("click_picture"),
                 "followers":"50",
                 "following":"77",
                 "friends":"112"
                 };
      
      setup(data);

  });

})(this);
