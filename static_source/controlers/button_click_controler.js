(function (global) {
'use strict';


function button_click(){

    $('#logoutbutton').click(function(){
        global.cookie_setting.clear("username");
        global.cookie_setting.clear("userid");
        global.cookie_setting.clear("url");
        global.cookie_setting.clear("github");
        global.cookie_setting.clear("firstname");
        global.cookie_setting.clear("lastname");
        console.log("sfsfsfsfsfsfsfsfs");
        setTimeout(function(){
          window.location.href = "logout";
        },0
          );  
    });



    

    $('#user_name_input').click(function(){
        setTimeout(function(){
          window.location.href = "posted";
        },0
          );  
    });

    $('#sub_btn').click(function(){
        login_infor_set.infor_setting();

        
    });
    $('#post_post').click(function(){
        localStorage.setItem("lastname", "Smith");
        console.log(localStorage.getItem("lastname"));


        global.update_and_post.post_posts();

    });

    $("#update_submit").click(function(){
        var email_input = $("e-mail-input").val();
        var github_input = $("github-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        //global.update_and_post.update_profile(cookie,firstname_input, lastname_input,email_input,github_input); 
    });


    $('#list_post_view').delegate('li', 'click', function () {
         global.cookie_setting.set("click_id",$(this).attr("value"));

         setTimeout(function(){
          window.location.href = "posted";
        },0
          );

     });

 $('#list_combox_view').delegate('li', 'click', function () {
         global.cookie_setting.set("click_id",$(this).attr("value"));

         setTimeout(function(){
          window.location.href = "network";
        },0
          );

     });
    $("#follow_btn").click(function(){
      console.log($('#follow_btn').text());
      if ($('#follow_btn').text() == "UNFOLLOW"){
        global.findfriends.unfollow_other();
        console.log("sddffffffffffffffffffff"+$('#follow_btn').text());
      }else{
        global.findfriends.follow_other();
      }    


    });

    $('.target').delegate('li', 'click', function () {

         global.cookie_setting.set("click_id",$(this).attr("value"));
         global.cookie_setting.set("click_username",$(this).attr("id"));
         setTimeout(function(){
          window.location.href = "otherposted";
        },0
          );
     });

    $("#connect_friends").click(function(){
        global.cookie_setting.clear("click_id");
        global.cookie_setting.clear("click_username");
        setTimeout(function(){
          window.location.href = "friends";
        },0
          );
    });

    $("#connect_home").click(function(){
        global.cookie_setting.clear("click_id");
        global.cookie_setting.clear("click_username");
        setTimeout(function(){
          window.location.href = "home";
        },0
          );
    });

    $("#connect_net").click(function(){
        global.cookie_setting.clear("click_id");
        global.cookie_setting.clear("click_username");
        setTimeout(function(){
          window.location.href = "network";
        },0
          );
    });

    $("#connect_prof").click(function(){
        global.cookie_setting.clear("click_id");
        global.cookie_setting.clear("click_username");
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
