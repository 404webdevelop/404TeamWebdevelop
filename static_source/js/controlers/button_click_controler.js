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

function patchProfile(firstName, lastName,email,git,callback) {
  var data= {};
  data= {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
    "github": git,
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
        global.cookie_setting.set("post_id", posted_id)
        global.load_posts.comment_load(posted_id);
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
  $('#delpostbutton').click(function(){
      console.log("yeah");
      global.load_posts.post_delete(global.cookie_setting.get("post_id"));
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

  $('#list_combox_btn').click( function () {
         console.log($('#list_combox_btn').text());
         var lhost =  global.cookie_setting.get("com_lhost");
         var host =  global.cookie_setting.get("com_hurl");
  
         global.update_and_post.post_comment(lhost, host);
         $('#comment_page_list_view').empty()
      setTimeout(function(){
         global.load_posts.comment_load(global.cookie_setting.get("post_id"));

             },100);

   });

  $('#profile_btn').click(function(){
    console.log("sdffs---------");
    console.log($('#firstname').val());
    console.log($('#lastname').val());
    console.log($('#email').val());
    console.log($('#github').val());
    console.log($('#imgInp').val());
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var email = $('#email').val();
    var git = $('#github').val();
    patchProfile(firstName, lastName,email,git);
    $('#profile-picture-form').ajaxSubmit();
    window.location.href = "/";
  });


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
  });

  $('#follow_btn').click(function(){
        global.findfriends.follow_other(global.cookie_setting.get("click_username"),global.cookie_setting.get("click_url"));
    });

  $('#unfollow_btn').click(function(){
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
}

global.button_click = {
	clickbtn:button_click,
  jump:click_jmp_other

}

})(this);
