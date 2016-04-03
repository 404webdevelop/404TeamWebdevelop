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

function postComment(){
    console.log("Comment?");

    var url = 'api/posts/' + global.cookie_setting.get("post_id") + '/comments/';

    //logan edits
    $.get('/api/posts/' + global.cookie_setting.get("post_id") + '/', function(data){global.cookie_setting.set("comments_list", data['comments_list'])});
    var url = global.cookie_setting.get("comments_list");

    var combody = $("#Comment_content").val();
 
    var user = global.cookie_setting.get("username");
    var userurl = global.cookie_setting.get("url");
    console.log("Content " + combody);
    console.log("User " + user);
    console.log("Url " + userurl);
    var data = {
  	 "comment":combody, "contentType": "text/plain"
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
