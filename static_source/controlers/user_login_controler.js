(function (global) {

'use strict';

//--------------------------------done------------------
function set_head_infor(img,firstname,lastname,username){
  console.log(img);
  if(img != undefined || img != 'undefined'){
    $('div[id=div1]').html('<img src='+img+' class="img-circle" alt="Cinque Terre"  width="100" height="100">');
  }
  $('div[id=div2]').html('<h1>'+firstname+' '+lastname+'<h1>');
  $("#userphoto").html('<a href="#"><img src='+img+'  width="20" height="20"> </a>');
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
        });
    request.fail(function (callback) {
            console.log(callback);
         });
}



global.login_setting = {
	infor_setting:getuserlogin,

}



})(this);