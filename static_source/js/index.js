(function (global) {

'use strict';

function setup(){
	global.button_click.clickbtn();
};

$( document ).ready(function() {
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
	global.findfriends.friends();
	global.findfriends.get_follower();
	global.findfriends.get_following();
});

})(this);