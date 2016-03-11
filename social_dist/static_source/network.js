(function (global) {

'use strict';




var cookie = global.cookie_setting;
var clicks = global.button_click;
var set_inf_nav = global.nav_inf;

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

function getfollowings(data){
  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            $.each(followersobj, function (i, value) {;
              if (followersobj[i].follower == data.url){
                $.getJSON(followersobj[i].followed,function(data){
                    data = data.username;
                    $("#f1").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                });
              }
            });
         });
  request.fail(function (callback) {
            console.log(callback);
         });

}





function getfollowers(data){
  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
              if (followersobj[i].followed == data.url){
                console.log(followersobj[i].followed);
                console.log(data.url);
                $.getJSON(followersobj[i].follower,function(data){
                    data = data.username;
                    $("#f3").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-plus\"href=\"#\">"+data+"</a></li>");
                });
              }
            });  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
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
                    $("#f2").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                });
            });  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
};




function getuserurl(username,callback){
  var user_name = username;

  var url = "api/authors/";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var userobj = callback;
            $.each(userobj,function (i,value){
              if (userobj[i].username == user_name){
                cookie.set("url",userobj[i].url);
                console.log(userobj[i].url);
                cookie.set("id",userobj[i].id);
              }
            });
            

         });
  request.fail(function (callback) {
            console.log(callback);
         });

}




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

function postPost(userurl){
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

function setdynamic(img,tit,tex,date,author){
  var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
  return string;
};





function setup(clicks,data){
    var page="network";
    set_inf_nav.nav_inf_setting(data,page);


    $('#post_post').click(function(){
        postPost(data.url);
    });

    $("#update_submit").click(function(){

        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();

        patchProfile(data,username_input,firstname_input, lastname_input);
    });
    $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data1 = {"username": username, "password": password};
        var url = "api-token/";
        var callback = "";
        getlogin(url,data1,callback);
        
        getuserurl(username);
        setTimeout(function(){
          window.location.href = "home";
        },1000
          );
    });


    clicks.clickbtn();


};



setup(clicks,data);

findfriends(data);
getfollowers(data);
getfollowings(data);


})(this);




