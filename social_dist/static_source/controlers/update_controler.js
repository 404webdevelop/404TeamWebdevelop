(function (global) {

'use strict';
var cookie = global.cookie_setting;

function postPost(userurl){
  var url = "api/post/posts/";
  
  var post_post= $("#title_input_style").val();
  console.log(post_post);
  
  var post_content= $("#content_input_style").val();
  console.log(post_content);
  
  var post_url= userurl;
  console.log(post_url);
 
  var data= {
    "title": post_post,
    "content": post_content,
    "author": post_url,
  };

  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,
        });

  request.done(function (callback) {
    console.log(callback)
    });
  
  request.fail(function (callback) {
            //console.log(callback);
    console.log(callback);
    });

}

function patchProfile(cookie,data,username,firstName, lastName, callback) {
  var token = JSON.parse(data.token);
  $.ajax({
    method: 'PATCH',
    url: data.url,
    contentType:"application/json; charset=utf-8",
    data: JSON.stringify({
      'username': username,
      'first_name': firstName,
      'last_name': lastName
    }),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' + token.token);
    },
    success: function (data) {
      cookie.set("username",username);
      setTimeout(function(){
      window.location.href = "home";
        },1000
      );
    },
    error: function (error) {
      console.log(error);
    }
  })
}





global.update_and_post= {
	update_profile:patchProfile,
	post_posts:postPost

}



})(this);