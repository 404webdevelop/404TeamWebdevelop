(function (global) {

'use strict';


var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var frineds_find =global.findfriends;


var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

function signuppage(){
	window.location="signup";
}


function setup(cookie,login_infor_set,infor_nav,clicks,data){
  var page="friends";
  

  $("#searchbutton").click(function(){
      console.log($('#myFilter').val());
      searchfriend($('#myFilter').val());
  });

  $("#update_submit").click(function(){
      var username_input = $("#user-name-input").val();
      var firstname_input = $('#first-name-input').val();
      var lastname_input = $('#last-name-input').val();
      update_and_post.update_profile(cookie,data,username_input,firstname_input, lastname_input); 
  });

  $('#post_post').click(function(){
      update_and_post.post_posts(data.url);
  });

  $("#login_submit").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      var data = {"username": username, "password": password};
      var url = "api-token/";
      var callback = "";
      login_infor_set.userinf_setting(cookie,url,data,callback);
      login_infor_set.url_setting(cookie,username);
      var token=cookie.get("token"); 
      setTimeout(function(){
        window.location.href = "friends";
      },1000);
  });

  infor_nav.nav_inf_setting(data,page);
  clicks.clickbtn();
  frineds_find.friends(data,"friends");
};




function searchfriend(username){
  var url = "api/authors/";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            console.log(callback);
            var userobj = callback;
            $.each(userobj,function (i,value){
              if (userobj[i].username == username){
                console.log("find::"+userobj[i].username);
                $("#search_listview").html("<li id=\"searched_friend\"class =\"ui-first-child ui-last-child\"><a class=\"ui-btn ui-btn-icon-right ui-icon-plus\" href=\"#\">"+userobj[i].username+"</a></li>");
              }
            })  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}

setup(cookie,login_infor_set,infor_nav,clicks,data);

})(this);