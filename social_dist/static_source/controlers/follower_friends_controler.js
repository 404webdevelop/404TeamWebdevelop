(function (global) {

'use strict';




function findfriends(data,page){
  var load_post = global.load_posts; 
  
  var url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var follower_list=[];
            var following_list=[];
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
              if (followersobj[i].followed == data.url){
                  follower_list.push(followersobj[i].follower);
                }
              if (followersobj[i].follower == data.url){
                  following_list.push(followersobj[i].followed);
                }
              });

            $.each(follower_list, function (i, value) {
              $.each(following_list, function (j, value) {
                if (follower_list[i] == following_list[j])
                  friends_list.push(follower_list[i]);
              });
            });
            $.each(friends_list,function (i,value){
              $.getJSON(friends_list[i],function(data){
                    data = data.username;
                    console.log(data);
                    if(page == "network"){
                    	$("#f2").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                    }
                    if(page =="friends" ){
                    	$("#friends_list_view").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                    }
                    if(page =="home"){
                    	load_post.posts_load(friends_list[i],data,page);
                    }
                    
                });
            });  
         });
  request.fail(function (callback) {
            console.log(callback);
         });
};

global.findfriends= {
  friends:findfriends
	
}



})(this);