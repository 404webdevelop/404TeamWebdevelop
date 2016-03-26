(function (global) {
'use strict';

function click_jmp_other(url,othername){
    global.cookie_setting.set("click_username",othername);
    global.cookie_setting.set("click_url",url);
    global.load_posts.set_other(url);
    global.load_posts.posts_load_other(othername);
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").show(800);
    $("#friends").hide();
    $("#git").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();
    var id = url.split("/")[5];
    global.findfriends.checkfollow(id);
};

function patchProfile(firstName, lastName,email,git,callback,img) {
  console.log("sdfsdf"+img);
  var data= {};
  if (img == "undefined"){
    data= {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
    "github": git,

  };
  }else{
    var data= {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
    "github": git,
    "picture":img
  };

  }
  var url = global.cookie_setting.get("url");

  var request = $.ajax({
          method: "PATCH",
          url: url,
          data: data,
        });
  request.done(function (callback) {
    console.log(callback);
    alert("successfully post.");
    });
  
  request.fail(function (callback) {
    console.log(callback);
    });


}



function button_click(){

    //-----------------------main pages-----------------------------------
  $('#home_page').click(function(){
    $("#home").show(800);
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").hide();
    $("#git").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();

    });


  


  $('#posted_page').click(function(){
    $("#home").hide();
    $("#posted").show(800);
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").hide();
    $("#git").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();

  });
  $('.list-group').delegate('li', 'click', function () {
        $('#others_page_list_view').empty();
        var url = $(this).attr("value");
        
        var othername= $(this).attr("id");
        global.cookie_setting.set("click_username",othername);
        global.cookie_setting.set("click_url",url);
        click_jmp_other(url,othername);
        console.log(url);
        var id= url.split("/")[5];
        console.log(id);
        global.findfriends.checkfollow(id);
     }); 

  $('.try').delegate('li', 'click', function () {
        var posted_id = $(this).attr("value");
        location.hash ='posted/'+posted_id+'/';
        $("#home").hide();
        $("#posted").hide();
        $("#follow_btn").hide();
        $("#other_posted").hide();
        $("#friends").hide();
        $("#git").hide();
        $("#profile").hide();
        $("#comment").show(800);
        $("#search_result_fild").hide();

        
     });    

  $('#friends_page').click(function(){
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").show(800);
    $("#git").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();

  });
  /*$('#profile_btn').click(function(){
    console.log("sdffs---------");
    console.log($('#firstname').val());
    console.log($('#lastname').val());
    console.log($('#email').val());
    console.log($('#github').val());
    console.log($('#imgInp').val());
    var firstName = $('#firstname').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var git = $('#github').val();
    var img = $('#imgInp').val();

    
    
    if($('#imgInp').val() == ""){
      console.log("sfdsjohoho");
      patchProfile(firstName, lastName,email,git,img);
    }else{
      console.log("enter");
      var input = document.getElementById('imgInp');

     if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(input.files[0]);
            //patchProfile(firstName, lastName,email,git,e.target.result);
            var data= {
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "github": git,
                "picture":input.files[0]
              };
              var url = global.cookie_setting.get("url");

              var request = $.ajax({
                      method: "PATCH",
                      url: url,
                      data: data,
                    });
              request.done(function (callback) {
                console.log(callback);
                alert("successfully post.");
                });
              
              request.fail(function (callback) {
                console.log(callback.responseText);
                });


        }
        console.log(reader.readAsDataURL(input.files[0]));
      }

    }

  });*/


  $('#git_page').click(function(){
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").hide();
    $("#git").show(800);
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();

  });
  $('#profile_page').click(function(){
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").hide();
    $("#git").hide();
    $("#profile").show(800);
    $("#comment").hide();
    $("#search_result_fild").hide();

  });
  


  //-------------------------in the friends page---------------------------
  $('#display_follower').click(function(){
    $("#follower_list").show(800);
    $("#following_list").hide();
    $("#friends_list").hide();
    $("#fof_list").hide();
    $("#search_list").hide();
    $("#search_result_fild").hide();
      
  });
  $('#display_following').click(function(){
    $("#follower_list").hide();
    $("#following_list").show(800);
    $("#friends_list").hide();
    $("#fof_list").hide();
    $("#search_list").hide();
    $("#search_result_fild").hide();
      
  });
  $('#display_friends').click(function(){
    $("#follower_list").hide();
    $("#following_list").hide();
    $("#friends_list").show(800);
    $("#fof_list").hide();
    $("#search_list").hide();
    $("#search_result_fild").hide();
      
  });
  $('#display_fof').click(function(){
    $("#follower_list").hide();
    $("#following_list").hide();
    $("#friends_list").hide();
    $("#fof_list").show(800);
    $("#search_list").hide();
    $("#search_result_fild").hide();
      
  });
  $('#display_search').click(function(){
    $("#follower_list").hide();
    $("#following_list").hide();
    $("#friends_list").hide();
    $("#fof_list").hide();
    $("#search_list").show(800);
    $("#search_result_fild").hide();
      
  });

  $('#search_button').click(function(){
    $("#search_result_fild").hide();
    $("#search_result_fild").show(800);
    var username = $('#search_name').val();
    global.findfriends.search(username);
    //console.log("sdfsfsdfsfsd");
  });


  $('#follow_btn').click(function(){
        global.findfriends.follow_other(global.cookie_setting.get("click_username"),global.cookie_setting.get("click_url"));
    });
  $('#unfollow_btn').click(function(){
        //console.log("this is : "+global.cookie_setting.get("click_username"));
        //console.log("that is : "+global.cookie_setting.get("click_url"));
        //$('#follow_btn').show();  
        //$('#unfollow_btn').hide();
        global.findfriends.unfollow_other(global.cookie_setting.get("click_username"),global.cookie_setting.get("click_url"));
    });



    $('#logout_btn').click(function(){
        global.cookie_setting.clear("username");
        global.cookie_setting.clear("userid");
        global.cookie_setting.clear("url");
        global.cookie_setting.clear("github");
        global.cookie_setting.clear("firstname");
        global.cookie_setting.clear("lastname");
        setTimeout(function(){
          window.location.href = "logout";
        },0
          );  
    });
    

    /*$('#user_name_input').click(function(){
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
        /*setTimeout(function(){
          window.location.href = "posted";
        },0
          );*/

    /*});

    $("#update_submit").click(function(){
        var email_input = $("e-mail-input").val();
        var github_input = $("github-input").val();
        var firstname_input = $('#first-name-input').val();
        var lastname_input = $('#last-name-input').val();
        var password_input = $('#password_input').val();
        global.update_and_post.update_profile(firstname_input, lastname_input,email_input,github_input,password_input); 
        setTimeout(function(){
          window.location.href = "posted";
        },0
          );
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
         $.getJSON('api/author/',function(data1){
          console.log(data1);
          $.each(data1.authors,function (i , value){
            if(data1.authors[i].username == global.cookie_setting.get("click_username")){
              global.cookie_setting.set("click_first_name",data1.authors[i].first_name);
              global.cookie_setting.set("click_last_name",data1.authors[i].last_name);
              global.cookie_setting.set("click_picture",data1.authors[i].picture);
              console.log(data1.authors[i].first_name);
              console.log(data1.authors[i].last_name);
              return false;
            }
          });
         });
          
         setTimeout(function(){
          window.location.href = "otherposted";
        },100
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
    });*/

    
}



global.button_click = {
	clickbtn:button_click,
  jump:click_jmp_other

}

})(this);
