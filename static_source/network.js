

/*function wori(){
          console.log(document.getElementById("click_target").value);
          //window.location.href = "posted";        
      };
*/




(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var frineds_find =global.findfriends;

login_infor_set.infor_setting(cookie);

var data= {"username":cookie.get("username"),
       "url":cookie.get("userid"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

function getfollowings(cookie,data){
  var url = "api/follow/"+cookie.get("userid")+"/followings";
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




function getfollowers(cookie,data){
  console.log(cookie.get("userid"));
  var url = "api/follow/"+cookie.get("userid")+"/followers";
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


function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="network";

    
    

    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        update_and_post.update_profile(cookie,data,username_input,firstname_input, lastname_input); 
    });
    


    infor_nav.nav_inf_setting(cookie,data,page);
    clicks.clickbtn(cookie);
    frineds_find.friends(cookie,data,page);
    getfollowers(cookie,data);
    getfollowings(cookie,data);
};




setup(cookie,login_infor_set,infor_nav,clicks,data);

})(this);




