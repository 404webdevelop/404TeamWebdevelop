(function (global) {

'use strict';




function getuserlogin(callback){
    
    var url = "api/author/me";
    var request = $.ajax({
            method: "GET",
            url: url,
          });
    request.done(function (callback) {
        var userobj = callback;
        global.cookie_setting.set("username",userobj.username);
        global.cookie_setting.set("github", userobj.github);
        global.cookie_setting.set("userid",userobj.id);
        global.cookie_setting.set("url",userobj.url);
        global.cookie_setting.set("firstname",userobj.first_name);
        console.log(userobj.first_name);
        global.cookie_setting.set("lastname",userobj.last_name);
        console.log(userobj.last_name);
        var data= {"username":global.cookie_setting.get("username"),
                   "url":global.cookie_setting.get("url"),
                   "token":global.cookie_setting.get("token"),
                   "firstname":global.cookie_setting.get("firstname"),
                   "lastname": global.cookie_setting.get("lastname"),
                   "userphoto":"/static/image/no_image.jpg",
                   "followers":"50",
                   "following":"77",
                   "friends":"112"
                   };

        $( document ).ready(function() {
             global.nav_inf.nav_inf_setting(data,"home");
        });
        
    

    })
    request.fail(function (callback) {
            console.log(callback);
         });


    $( document ).ready(function() {
        
        global.button_click.clickbtn();
    });
    
}



global.login_setting = {
	infor_setting:getuserlogin,

}



})(this);