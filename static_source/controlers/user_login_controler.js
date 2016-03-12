(function (global) {

'use strict';


var cookie = global.cookie_setting;



function getuserurl(cookie,username,callback){
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

function getlogin(cookie,url,data,callback){
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








global.login_setting = {
	url_setting:getuserurl,
	userinf_setting:getlogin


}



})(this);