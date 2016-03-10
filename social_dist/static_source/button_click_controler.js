(function (global) {

'use strict';

var cookie = global.cookie_setting;

function button_click(data){
    $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data1 = {"username": username, "password": password};
        var url = "api-token/";
        var callback = "";
        getlogin(url,data1,callback);
        
        getuserurl(username);
        setTimeout(function(){
          window.location.href = "home";
        },1000
          );
    });

    $('#post_post').click(function(){
        postPost(data.url);
    });


    $("#update_submit").click(function(){
        var username_input = $("#user-name-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        patchProfile(data,username_input,firstname_input, lastname_input); 
    });

    $("#logoutbutton").click(function(){
        cookie.clear("username");
        cookie.clear("token");
        cookie.clear("url");
        setTimeout(function(){
          window.location.href = "home";
        },0
          );
    });

    $("#connect_friends").click(function(){
        setTimeout(function(){
          window.location.href = "friends";
        },0
          );
    });

    $("#connect_home").click(function(){
        setTimeout(function(){
          window.location.href = "home";
        },0
          );
    });


    $("#connect_net").click(function(){
        setTimeout(function(){
          window.location.href = "network";
        },0
          );
    });

    $("#connect_prof").click(function(){
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
