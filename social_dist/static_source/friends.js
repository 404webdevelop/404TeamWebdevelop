(function (global) {

'use strict';




var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;

var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };
console.log(data.url);
console.log(data.username);
console.log(data.token);

function signuppage(){
	window.location="signup";
}




function setup(cookie,login_infor_set,infor_nav,clicks,data){
  var page="friends";
  infor_nav.nav_inf_setting(data,page);


  $("#searchbutton").click(function(){
      console.log($('#myFilter').val());
      searchfriend($('#myFilter').val());
      
  });



  $("#update_submit").click(function(){
      var username_input = $("#user-name-input").val();
      var firstname_input = $('#first-name-input').val();
      var lastname_input = $('#last-name-input').val();
      patchProfile(data,username_input,firstname_input, lastname_input); 
  });

  $('#post_post').click(function(){
      postPost();
  });

  $("#login_submit").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      var data = {"username": username, "password": password};
      var url = "api-token/";
      var callback = "";
      login_infor_set.userinf_setting(cookie,url,data1,callback);
      login_infor_set.url_setting(cookie,username);
      var token=getCookie("token"); 
      setTimeout(function(){
        window.location.href = "friends";
      },1000);
  });


  clicks.clickbtn();
};




//need to copy patchprofile and click button to each page.

function patchProfile(data,username,firstName, lastName, callback) {
  var token = JSON.parse(data.token);
  $.ajax({
    method: 'PATCH',
    url: data.url,
    contentType:"application/json; charset=utf-8",
    data: JSON.stringify({
      'username': username,
      'first_name': firstName,
      'last_name': lastName
    }),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' + token.token);
    },
    success: function (data) {
      //callback(data);
      cookie.set("username",username);
      setTimeout(function(){
      window.location.href = "home";
        },1000
      );
    },
    error: function (error) {
      console.log(error);
    }
  })
}


function findfriends(data){

  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var follower_list=[];
            var following_list=[];
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
              if (followersobj[i].followed == data.url){
                  follower_list.push(followersobj[i].follower);
                  //console.log(followersobj[i].follower);
                }
              if (followersobj[i].follower == data.url){
                  following_list.push(followersobj[i].followed);
                   //console.log(followersobj[i].followed);
                }
              });

            $.each(follower_list, function (i, value) {
              $.each(following_list, function (j, value) {
                if (follower_list[i] == following_list[j])
                  friends_list.push(follower_list[i]);
              });
            });
            $.each(friends_list,function (i,value){
              $.getJSON(friends_list[i],function(data){
                    data = data.username;
                    console.log(data);
                    $("#friends_list_view").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                });
            });  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
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

function getlogin(url,data,callback){
  var val;
  var username = data.username;
  //console.log(username);
  var password = data.password;
  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,

        });
  request.done(function (callback) {
            var token =JSON.stringify(callback);
            
            cookie.set("username",username);
            cookie.set("token",token);
            
         });
  request.fail(function () {
            cookie.clear("username");
            cookie.clear("token");
            cookie.clear("url");
         });
};


function postPost(data){
  var userurl = data.url;
  var url = "api/post/posts/";
  
  var post_post= $("#title_input_style").val();
  console.log(post_post);
  
  var post_content= $("#content_input_style").val();
  console.log(post_content);
  
  var post_url= userurl;
  console.log(post_url);
 
  var data= {
    "title": post_post,
    "content": post_content,
    "author": post_url,
  };

  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,
        });

  request.done(function (callback) {
    console.log(callback)
    });
  
  request.fail(function (callback) {
            //console.log(callback);
    console.log(callback);
    });

}



setup(cookie,login_infor_set,infor_nav,clicks,data);
findfriends(data);


})(this);