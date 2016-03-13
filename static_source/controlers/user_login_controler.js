(function (global) {

'use strict';


var cookie = global.cookie_setting;



function getuserlogin(cookie,callback){
    
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

    })
    request.fail(function (callback) {
            console.log(callback);
         });
    
}




global.login_setting = {
	infor_setting:getuserlogin,

}



})(this);