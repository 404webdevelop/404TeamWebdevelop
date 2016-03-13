(function (global) {

'use strict';
var cookie = global.cookie_setting;
var update_and_post = global.update_and_post;

function postPost(){
  var url = "api/posts/";  
  var post_post= $("#title_input_style").val();
  var post_content= $("#content_input_style").val();

  console.log(username);
  var data= {
    "title": post_post,
    "content": post_content,
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
    console.log(callback);
    });
}

function patchProfile(cookie,data,username,firstName, lastName, callback) {
}

global.update_and_post= {
	update_profile:patchProfile,
	post_posts:postPost

}



})(this);