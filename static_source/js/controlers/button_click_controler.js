(function (global) {
'use strict';

function click_jmp_other(host){
    var url = global.cookie_setting.get("click_url");
    var othername = global.cookie_setting.get("click_username");
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
    $("#requ").hide();
    $("#search_result_fild").hide();
    $.getJSON(url,function(data){
      //console.log(data.id);
      

      $.getJSON("api/follow/pendingRequest/",function(data1){
        //console.log(data1.request[0]);

        if(data1.request[0] == undefined){
          $("#rej").hide();
        }

        $.each(data1.request,function (i,value){
          //console.log(data1.request[i]);
          //console.log(data.id);
          if(data1.request[i] == data.id ){
            $("#rej").show();
            //console.log("laokoaj");
            return false;
          }else{
            //console.log("sdfsdfs");
            $("#rej").hide();
            //console.log("sdfsdfs");
          }
        });
      //  console.log(data1.host);

      });
      global.findfriends.checkfollow(data.id);
    });
};


function reject_request(){
  $.getJSON("api/follow/", function(data){
    //console.log(data);
    //console.log(global.cookie_setting.get("click_url"));
    //console.log(global.cookie_setting.get("url"));
    var click_url = global.cookie_setting.get("click_url");
    var own_url = global.cookie_setting.get("url");
     $.each(data,function (i,value){
      if(data[i].follower == click_url && data[i].followed == own_url){
        //console.log("oh hohoh hohho");
        var hide_url = data[i].url;
        var request = $.ajax({
          method: "PATCH",
          url: hide_url,
          data: {"hide":true},
        });
        request.done(function (callback) {
          console.log(callback);
          $('#request_list_view').empty();
            global.findfriends.f_request();
          alert("successfully hide this user.");
          });
        
        request.fail(function (callback) {
          console.log(callback);
          });

      }
      if(data[i].remote_author_url == click_url && data[i].followed == own_url){
        //console.log("oh hohoh hohho");
        var hide_url = data[i].url;
        var request = $.ajax({
          method: "PATCH",
          url: hide_url,
          data: {"hide":true},
        });
        request.done(function (callback) {
          console.log(callback);
          alert("successfully hide this user.");
          });
        
        request.fail(function (callback) {
          console.log(callback);
          });

      }
     });
    
  })
  
}

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
    $("#requ").hide();
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
    $("#requ").hide();
    $("#search_result_fild").hide();
  });

  $('.list-group').delegate('li', 'click', function () {
      $('#others_page_list_view').empty();
      var url = $(this).attr("value");
      //var othername= $(this).attr("id");
      $.getJSON(url,function(data){
        //console.log(data);
        global.cookie_setting.set("click_username",data.displayName);
        global.cookie_setting.set("click_url",data.url);
        global.cookie_setting.set("click_host",data.host);
        //console.log(global.cookie_setting.get("click_host"));
        global.cookie_setting.set("click_id",data.id);
        click_jmp_other(data.host);
        global.findfriends.checkfollow(data.id);
      });

      
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
        $("#requ").hide();
        $("#search_result_fild").hide();   
     });    
  $('#delpostbutton').click(function(){
      //console.log("yeah");
      global.load_posts.post_delete(global.cookie_setting.get("post_id"));
});
  $('#friends_page').click(function(){
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").show(800);
    $("#git").hide();
    $("#requ").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#search_result_fild").hide();
  });
  $('#rej').click(function(){
    reject_request();
  });

  $('#list_combox_btn').click( function () {
         //console.log($('#list_combox_btn').text());
      
  
         global.update_and_post.post_comment();
         $('#comment_page_list_view').empty()
      setTimeout(function(){
         global.load_posts.comment_load(global.cookie_setting.get("post_id"));

             },100);

   });

  $('#profile_btn').click(function(){
    //console.log("sdffs---------");
    //console.log($('#firstname').val());
    //console.log($('#lastname').val());
    //console.log($('#email').val());
    //console.log($('#github').val());
    //console.log($('#imgInp').val());
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
    $("#requ").hide();
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
    $("#requ").hide();
    $("#search_result_fild").hide();
  });

  $('#f_request').click(function(){
    $("#home").hide();
    $("#posted").hide();
    $("#follow_btn").hide();
    $("#other_posted").hide();
    $("#friends").hide();
    $("#git").hide();
    $("#profile").hide();
    $("#comment").hide();
    $("#requ").show(800);
    $("#search_result_fild").hide();
  });
  //-------------------------in the friends page---------------------------
  $('#display_follower').click(function(){
    $("#follower_list").show(800);
    $("#following_list").hide();
    $("#friends_list").hide();
    $("#search_list").hide();
    $("#search_result_fild").hide(); 
  });

  $('#display_following').click(function(){
    $("#follower_list").hide();
    $("#following_list").show(800);
    $("#friends_list").hide();
    $("#search_list").hide();
    $("#search_result_fild").hide(); 
  });

  $('#display_friends').click(function(){
    $("#follower_list").hide();
    $("#following_list").hide();
    $("#friends_list").show(800);
    $("#search_list").hide();
    $("#search_result_fild").hide();    
  });


  $('#display_search').click(function(){
    $("#follower_list").hide();
    $("#following_list").hide();
    $("#friends_list").hide();
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
        //console.log(global.cookie_setting.get("click_host"));
        global.findfriends.follow_other(global.cookie_setting.get("click_id"),global.cookie_setting.get("click_host"),global.cookie_setting.get("click_username"),global.cookie_setting.get("click_url"));
        $("#rej").hide();
    });


  $('#unfollow_btn').click(function(){
        global.findfriends.unfollow_other(global.cookie_setting.get("click_host"),global.cookie_setting.get("click_username"),global.cookie_setting.get("click_url"));
        
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
