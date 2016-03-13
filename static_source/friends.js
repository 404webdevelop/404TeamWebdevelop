(function (global) {

'use strict';


var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var frineds_find =global.findfriends;

login_infor_set.infor_setting(cookie);

var data= {"username":cookie.get("username"),
       "url":cookie.get("url"),
       "token":cookie.get("token"),
       "userphoto":"../static/image/Yu.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

function setup(cookie,login_infor_set,infor_nav,clicks,data){
  var page="friends";
  

  $("#searchbutton").click(function(){
      //console.log("this is what you want to find :"+$('#myFilter').val());
      //searchfriend($('#myFilter').val());
      frineds_find.search(cookie,$('#myFilter').val());
  });

  

  infor_nav.nav_inf_setting(cookie,data,page);
  clicks.clickbtn(cookie);
  frineds_find.friends(cookie,data,"friends");
};



setup(cookie,login_infor_set,infor_nav,clicks,data);

})(this);