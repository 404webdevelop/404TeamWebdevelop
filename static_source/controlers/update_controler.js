(function (global) {

'use strict';




function postPost(){
  
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
