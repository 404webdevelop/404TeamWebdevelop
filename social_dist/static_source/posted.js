
(function (global) {

'use strict';


var cookie = global.cookie_setting;
var clicks = global.button_click;


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



function setdynamic(img,tit,tex,date,author){
  var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
  return string;
};


function setifor(img,username,followers, following, friends){
	var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+username+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
	return string;
};




function getpost(data){
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

            $.each(friends_list,function (i,value){
                  getpost(friends_list[i]);
            });

            
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}






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


function setup(clicks,data){
    if (data.username == "undefined" || data.username == undefined ){
      
      document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
      document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>You do not have access to view this page</strong><br>If you are not logged in, please do so now. </center></div>";
      $("#fot").hide();
    }else{

      var head = setifor(data.userphoto,data.username,data.following, data.followers, data.friends)
      
      document.getElementById("loginbutton").innerHTML ="<a href=\"posted\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<a href=\"#myProfileDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"edit\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Edit Profile</button></a><button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
      document.getElementById("info").innerHTML = head;
      document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<center><button id=\"AddFriendbutton\" type=\"button\" onclick=\"javascript:history.go(0)\" class=\"btn btn-lg btn-success\">AddFriend</button>   Yu is following you </div></div>";
    };

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

    $('#post_post').click(function(){
        postPost(data.url);
    });


    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        patchProfile(data,username_input,firstname_input, lastname_input); 
    });

    clicks.clickbtn();
};



setup(clicks,data);
getpost(data);


})(this);
