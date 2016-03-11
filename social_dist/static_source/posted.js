
(function (global) {

'use strict';


var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 


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
};



/*function setdynamic(img,tit,tex,date,author){
  var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
  return string;
}*/





/*function getpost(data){
  var url = "api/post/posts/";
  var request = $.ajax({
          method: "GET",
          url: url,
  });
  request.done(function (callback) {
            //console.log(callback);
            console.log(callback);
            var postobj = callback;
            $.each(postobj, function (i, value) {
              if (postobj[i].author == data.url){
                //var data = {};
                $.getJSON(postobj[i].author,function(data){
                    console.log("that"+i+"f   ="+postobj[i].author);
                    console.log("that"+i+"f   ="+postobj[i].title);
                    console.log("that"+i+"f   ="+postobj[i].content);
                    console.log("that"+i+"f   ="+postobj[i].date_created);
                   
                    data = data.username;
                    console.log("this"+i+"f   ="+data);
                    var st= setdynamic("/static/image/Yu.jpg",postobj[i].title,postobj[i].content,postobj[i].date_created,data);
                    $("#list_post_view").append(st);
                });
              }
            });
         });
  request.fail(function (callback) {
            //console.log(callback);
            console.log(callback);
         });
}*/





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
            //console.log(friends_list);

            //$.each(friends_list,function (i,value){
             //     getpost(friends_list[i]);
            //});

            
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}







function setup(cookie,login_infor_set,infor_nav,clicks,data){
    var page="posted";
    infor_nav.nav_inf_setting(data,page);

   $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data1 = {"username": username, "password": password};
        var url = "api-token/";
        var callback = "";
        login_infor_set.userinf_setting(cookie,url,data1,callback);
        
        login_infor_set.url_setting(cookie,username);
        setTimeout(function(){
          window.location.href = "home";
        },1000
          );
    });

    $('#post_post').click(function(){
        update_and_post.post_posts(data.url);
    });


    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        update_and_post.update_profile(cookie,data,username_input,firstname_input, lastname_input); 
    });

    clicks.clickbtn();
};



setup(cookie,login_infor_set,infor_nav,clicks,data);
var page = "posted";
var friends_list = [];
load_post.posts_load(friends_list[0],data,page);

})(this);
