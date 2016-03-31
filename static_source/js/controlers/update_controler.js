(function (global) {

'use strict';



function patchProfile(firstName, lastName,email,git,callback) {
  var url = global.cookie_setting.get("url");
  var data= {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
    "github": git,
  };
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

function postComment(lhost, host){
    console.log("Comment?");

    var url = '';
    if(lhost == true){
	url = 'api/posts/' + global.cookie_setting.get("post_id") + '/comments/';
    } else {
	url = host + '/api/posts/' + global.cookie_setting.get("post_id") + '/comments/';
  }
    var combody = $("#Comment_content").val();
 
    var user = global.cookie_setting.get("username");
    var userurl = global.cookie_setting.get("url");
    console.log("Content " + combody);
    console.log("User " + user);
    console.log("Url " + userurl);
    var data = {
  	 "comment":combody,
  	};
    var request = $.ajax({
  	method: "POST",
  	url: url,
  	data:data,
  	});
       console.log(data);
    request.done(function (callback) {
      console.log(callback)
    });
    request.fail(function (callback) {
      console.log(callback);
    });
    
}

global.update_and_post= {
	update_profile:patchProfile,
  post_comment:postComment

}



})(this);
