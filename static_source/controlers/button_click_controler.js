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

    $('#friends_field').click(function(){
          $('#hide1').show();
          $('#hide2').hide();
          $('#hide3').hide();

        
    });
    $('#following_field').click(function(){
          $('#hide3').show();
          $('#hide1').hide();
          $('#hide2').hide();
    });
    $('#follower_field').click(function(){
          $('#hide2').show();
          $('#hide1').hide();
          $('#hide3').hide();

        
    });



    $('#post_post').click(function(){
        global.update_and_post.post_posts();
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
        //global.update_and_post.update_profile(cookie,firstname_input, lastname_input,email_input,github_input); 
    });


    $('#list_post_view').delegate('li', 'click', function () {
         global.cookie_setting.set("post_id",$(this).attr("value"));
         setTimeout(function(){
          window.location.href = "network";
        },0
          );

     });

 $('#list_combox_btn').click( function () {
         console.log($('#list_combox_btn').text());
         global.update_and_post.post_comment();
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
           $.getJSON('api/author/',function(data){
            console.log(data);
            $.each(data.authors,function (i , value){
              if(data.authors[i].username == global.cookie_setting.get("click_username")){
                global.cookie_setting.set("click_first_name",data.authors[i].first_name);
                global.cookie_setting.set("click_last_name",data.authors[i].last_name);
                console.log(data.authors[i].first_name);
                console.log(data.authors[i].last_name);
              }
            });
           });


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
