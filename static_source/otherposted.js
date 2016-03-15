(function (global) {

'use strict';



function find_click_user(){

  $.getJSON('api/author/',function(data){
    $.each(data.data,function (i , value){
      if(data.data[i].username == global.cookie_setting.get("click_username")){
        global.cookie_setting.set("click_first_name",data.data[i].first_name);
        global.cookie_setting.set("click_last_name",data.data[i].last_name);
      }
    });
  });
}


function setup(data){
    var page="otherpost";
    $('#post_post').click(function(){
        update_and_post.post_posts(data.username);
    });

    
    $(document).ready(function () {
        global.nav_inf.nav_inf_setting(data,page);
        global.button_click.clickbtn();
        var friends_list = [];
        global.load_posts.posts_load(data,page);
        console.log("user id is:"+global.cookie_setting.get("userid"));
        console.log("target id is:"+global.cookie_setting.get("click_id"));
        console.log("target id is:"+global.cookie_setting.get("click_username"));
    });
  };
$( document ).ready(function() {
      find_click_user();

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
