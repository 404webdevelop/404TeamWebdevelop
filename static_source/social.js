(function (global) {

'use strict';





function setup(){
	global.button_click.clickbtn();
};

$( document ).ready(function() {
	var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "no_image":"/static/image/no_image.jpg",
       "userphoto":global.cookie_setting.get("picture"),
       "followers":"50",
       "following":"77",
       "friends":"112"
       };


	$("#home").show();
	$("#posted").hide();
	$("#follow_btn").hide();
	$("#other_posted").hide();
	$("#friends").hide();
	$("#git").hide();
	$("#profile").hide();
	$("#follower_list").show();
	$("#following_list").hide();
	$("#friends_list").hide();
	$("#fof_list").hide();
	$("#search_list").hide();
	$("#search_result_fild").hide();
	$("#comment").hide();

	global.login_setting.infor_setting();
	setup();
	global.load_posts.posts_load(data,"home");
	global.load_posts.posts_load(data,"posted");
	global.load_posts.posts_load(data,"git");
	global.findfriends.friends();
	global.findfriends.get_follower();
	global.findfriends.get_following();
    console.log( data.username);       
    console.log( data.url);    
    console.log( data.firstname);    
    console.log( data.lastname);    
    console.log( data.userphoto);    
	console.log( global.cookie_setting.get("lastname"));
});

})(this);