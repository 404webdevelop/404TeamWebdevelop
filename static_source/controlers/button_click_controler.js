(function (global) {
'use strict';
var cookie = global.cookie_setting;
var check = global.findfriends;
var update_and_post = global.update_and_post;
var login_infor_set = global.login_setting;




function button_click(cookie){

    $('#logoutbutton').click(function(){
        cookie.clear("username");
        cookie.clear("userid");
        cookie.clear("url");
        cookie.clear("github");
        cookie.clear("firstname");
        cookie.clear("lastname");




        setTimeout(function(){
          window.location.href = "logout";
        },0
          );  
    });

    $('#sub_btn').click(function(){
        login_infor_set.infor_setting(cookie);

        
    });
    $('#post_post').click(function(){

        update_and_post.post_posts();

        setTimeout(function(){
          window.location.href = "posted";
        },0
          );  
    });

    $("#update_submit").click(function(){
        var email_input = $("e-mail-input").val();
        var github_input = $("github-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        //update_and_post.update_profile(cookie,firstname_input, lastname_input,email_input,github_input); 
    });


    $('#list_post_view').delegate('li', 'click', function () {
         cookie.set("click_id",$(this).attr("value"));

         setTimeout(function(){
          window.location.href = "posted";
        },0
          );

     });
    $("#follow_btn").click(function(){
      console.log($('#follow_btn').text());
      if ($('#follow_btn').text() == "UNFOLLOW"){
        check.unfollow_other(cookie);
      }else{
        check.follow_other(cookie);
      }    


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
