

/*function wori(){
          console.log(document.getElementById("click_target").value);
          //window.location.href = "posted";        
      };
*/




(function (global) {

'use strict';

var cookie = global.cookie_setting;

    function getfollowings(data){
      var url = "api/follow/"+global.cookie_setting.get("userid")+"/followings";
      var request = $.ajax({
              method: "GET",
              url: url,
            });
      request.done(function (callback) {
                var followersobj = callback;
                //console.log(callback);
                $.each(followersobj, function (i, value) {
                 
                    $.getJSON(followersobj[i].followed,function(data){
                        
                        $("#f1").append("<li id = \""+data.username+"\" value=\""+data.id+"\" class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\">"+data.username+"</a></li>");
                    });
                
                });
             });
      request.fail(function (callback) {
                console.log(callback);
             });

    }




    function getfollowers(data){
      console.log(global.cookie_setting.get("userid"));
      var url = "api/follow/"+global.cookie_setting.get("userid")+"/followers";
      var request = $.ajax({
              method: "GET",
              url: url,
            });
      request.done(function (callback) {
                var followersobj = callback;
                

                $.each(followersobj, function (i, value) {
                    $.getJSON(followersobj[i].follower,function(data){
                        console.log("sdfsf");
                        console.log(data.id);
                        console.log("------");
                        $("#f3").append("<li id = \""+data.username+"\" value=\""+data.id+"\" class=\"ui-last-child\" ><a id =\"click_target\" value=\""+data.id+"\"  class=\"ui-btn ui-btn-icon-right ui-icon-plus\" >"+data.username+"</a></li>");
                    });
                  
                }); 
             });
      request.fail(function (callback) {
                console.log(callback);
             });
    }


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
           "url":global.cookie_setting.get("url"),
           "token":global.cookie_setting.get("token"),
           "firstname":global.cookie_setting.get("firstname"),
           "lastname": global.cookie_setting.get("lastname"),
	   
           "userphoto":"/static/image/no_image.jpg",
           "following":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoing laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
           "followers":"A Great Test Post",
           "friends":"112"
           };

    setup(data);
    });
})(this);




