(function (global) {

'use strict';

//--------------------------------done------------------
function set_head_infor(img,firstname,lastname,username){
  //console.log(img);
  if( img != null ){
    $('div[id=div1]').html('<img src='+img+' class="img-circle" alt="Cinque Terre"  width="100" height="100">');
    //$("#userphoto").html('<a href="#"><img src='+img+'  width="20" height="20"> </a>');
  }
  $('div[id=div2]').html('<h1>'+firstname+' '+lastname+'<h1>'); 
  $("#profile_page").html('<span class="glyphicon glyphicon-user"></span>'+username +'');
}

function getuserlogin(callback){ 
    var url = "api/author/me";
    var request = $.ajax({
            method: "GET",
            url: url,
          });
    request.done(function (callback) {
        var userobj = callback;
        global.cookie_setting.set("username",userobj.displayName);
        global.cookie_setting.set("github", userobj.github);
        global.cookie_setting.set("userid",userobj.id);
        global.cookie_setting.set("url",userobj.url);
        global.cookie_setting.set("firstname",userobj.first_name);
        global.cookie_setting.set("lastname",userobj.last_name);
        global.cookie_setting.set("picture",userobj.picture);
        set_head_infor(userobj.picture,userobj.first_name,userobj.last_name,userobj.displayName);
        //console.log(userobj.first_name);
        //console.log(userobj.last_name);
        //console.log(userobj.emial);
        $('#firstname').val(userobj.first_name);
        $('#lastname').val(userobj.last_name);
        $('#email').val(userobj.email);
        $('#github').val(userobj.github);
        $('#profile-picture-form').attr('action', userobj.url + 'profile_picture/');
        var data= {"username":global.cookie_setting.get("username"),
           "url":global.cookie_setting.get("url"),
           "token":global.cookie_setting.get("token"),
           "firstname":global.cookie_setting.get("firstname"),
           "lastname": global.cookie_setting.get("lastname"),
           "no_image":"/static/image/noiamge.jpg",
           "userphoto":global.cookie_setting.get("picture"),
           "followers":"50",
           "following":"77",
           "friends":"112"
           };
        global.load_posts.posts_load(data,"home");
        global.load_posts.posts_load(data,"posted");
        global.load_posts.posts_load(data,"git");
        global.findfriends.f_request();
        global.findfriends.friends();
        global.findfriends.get_follower();
        global.findfriends.get_following();
        global.findfriends.get_fof();
        });
    request.fail(function (callback) {
            console.log(callback);
         });
}

global.login_setting = {
	infor_setting:getuserlogin,

}



})(this);
