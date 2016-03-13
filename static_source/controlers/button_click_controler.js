(function (global) {
'use strict';
var cookie = global.cookie_setting;
function button_click(cookie){

    $('#list_post_view').delegate('li', 'click', function () {
         cookie.set("click_id",$(this).attr("value"));

         setTimeout(function(){
          window.location.href = "posted";
        },0
          );

     });
    $("#follow_btn").click(function(){
        $('#follow_btn').text("UNFOLLOW");
        $('#follow_btn').css("background","#FF6347");
    });

    $('.target').delegate('li', 'click', function () {

         cookie.set("click_id",$(this).attr("value"));
         cookie.set("click_username",$(this).attr("id"));
         setTimeout(function(){
          window.location.href = "otherposted";
        },0
          );
     });

    $("#connect_friends").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "friends";
        },0
          );
    });

    $("#connect_home").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "home";
        },0
          );
    });

    $("#connect_net").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "network";
        },0
          );
    });

    $("#connect_prof").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "posted";
        },0
          );
    });

}



global.button_click = {
	clickbtn:button_click

}

})(this);
