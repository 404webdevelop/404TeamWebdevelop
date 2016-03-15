(function (global) {

'use strict';


var cookie = global.cookie_setting;
var infor_nav = global.nav_inf;
var clicks = global.button_click;



function getuserlogin(clicks,infor_nav,cookie,callback){
    
    var url = "api/author/me";
    var request = $.ajax({
            method: "GET",
            url: url,
          });
    request.done(function (callback) {
        var userobj = callback;
        cookie.set("username",userobj.username);
        cookie.set("github", userobj.github);
        cookie.set("userid",userobj.id);
        cookie.set("url",userobj.url);
        cookie.set("firstname",userobj.first_name);
        console.log(userobj.first_name);
        cookie.set("lastname",userobj.last_name);
        console.log(userobj.last_name);
        var data= {"username":cookie.get("username"),
               "url":cookie.get("url"),
               "token":cookie.get("token"),
               "firstname":cookie.get("firstname"),
               "lastname": cookie.get("lastname"),
               "userphoto":"/static/image/no_image.jpg",
               "followers":"50",
               "following":"77",
               "friends":"112"
               };
    infor_nav.nav_inf_setting(cookie,data,"home");

    })
    request.fail(function (callback) {
            console.log(callback);
         });

    clicks.clickbtn(cookie);
    
}


global.login_setting = {
	infor_setting:getuserlogin,

}



})(this);