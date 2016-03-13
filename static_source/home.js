(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;
var infor_nav = global.nav_inf;
var login_infor_set = global.login_setting;
var update_and_post = global.update_and_post;
var load_post = global.load_posts; 
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
    var page="home";
    infor_nav.nav_inf_setting(cookie,data);

    console.log(cookie.get("userid"));


    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        update_and_post.update_profile(cookie,data,username_input,firstname_input, lastname_input); 

    });

    //frineds_find.friends(data, page);
    update_and_post.post_posts();
    load_post.posts_load(data,page,cookie);
    clicks.clickbtn(cookie);
};

setup(cookie,login_infor_set,infor_nav,clicks,data);

})(this);


