(function (global) {

'use strict';


function postPost(){
  var url = "api/posts/";  
  var post_post= $("#title_input_style").val();
  var post_content= $("#content_input_style").val();
  var right = $("#right").val();
  var host_only = $("#host_only").val();
  if (host_only =="true"){
      host_only = true;
  }else{
    host_only = false;
  }
  console.log(right);
  console.log(username);
  var data= {
    "title": post_post,
    "content": post_content,
    "privacy_level":right,
    "privacy_host_only":host_only,
  };

  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,

        });

  request.done(function (callback) {
    console.log(callback.url);
    });
  
  request.fail(function (callback) {
    console.log(callback);
    });
}


function patchProfile(firstName, lastName,email,git,password,callback) {
  var url = global.cookie_setting.get("url");
  var data= {
    "username": global.cookie_setting.get("username"),
    "email": email,
    "password":password,
    "first_name": firstName,
    "last_name": lastName,
    "github": git,
    "picture": null,
  };
  var request = $.ajax({
          method: "PUT",
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


function postComment(){
    console.log("Comment?");
    var url = 'api/posts/' + global.cookie_setting.get("post_id") + '/comments/';
    var combody = $("#comment_content").val();
    var user = global.cookie_setting.get("username");
    var userurl = global.cookie_setting.get("url");
    console.log("Content " + combody);
    console.log("User " + user);
    console.log("Url " + userurl);
    var data = {
	"content":combody,

	};
    var request = $.ajax({
	method: "POST",
	url: url,
	data:data,
	});
  console.log(request);
  request.done(function (callback) {
    console.log(callback)
    });
  request.fail(function (callback) {
    console.log(callback);
    });
 
}

global.update_and_post= {
	update_profile:patchProfile,
	post_posts:postPost,
        post_comment:postComment

}



})(this);
