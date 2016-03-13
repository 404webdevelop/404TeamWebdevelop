

(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
var frineds_find =global.findfriends;







function setup(cookie,login_infor_set,infor_nav,clicks){

    if (cookie.get("stf")=="1"){
      console.log("sdfsfsdfffffffffffffffffff");
      cookie.set("stf","2");
      window.location.reload();
    }

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
    var page="home";
    infor_nav.nav_inf_setting(cookie,data);

    console.log(cookie.get("userid"));


   

    //frineds_find.friends(data, page);
    update_and_post.post_posts();
    load_post.posts_load(data,page,cookie);
    clicks.clickbtn(cookie);
};
login_infor_set.infor_setting(cookie);
setup(cookie,login_infor_set,infor_nav,clicks);

})(this);


