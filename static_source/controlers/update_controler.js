(function (global) {

'use strict';


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

function patchProfile(firstName, lastName,email,git, callback) {
  var url = global.cookie_setting.get("url");
  var data= {
    "email": firstName,
    "first_name": lastName,
    "last_name":email,
    "github":git
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

global.update_and_post= {
	update_profile:patchProfile,
	post_posts:postPost

}



})(this);