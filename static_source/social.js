(function (global) {

'use strict';





function setup(){
	global.button_click.clickbtn();
};

function load_other_posts(other){
	var url = "api/posts/";
	var request = $.ajax({
          method: "GET",
          url: url,
        });
	var no_iamge="/static/image/no_image.jpg";
	request.done(function (callback) {
    console.log(callback);
    var postobj = callback;
    var count =0;
            $.each(postobj.posts, function (i, value) { 
              console.log(postobj.posts[i].author.displayName);
              if(postobj.posts[i].author.displayName==other){
                if(count < 100){
                  count++;
                  var inner_request = $.ajax({
                        method: "GET",
                        url: "api/images/",
                  });
                  inner_request.done(function (callback) {
                    var cont =0;
                    var cont1 =0;

                    $.each(callback.images, function (j, value) { 
                      if(callback.images[j].parent_post == postobj.posts[i].url){
                          $.getJSON(callback.images[j].json_url, function(data1){
                            global.load_posts.set_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,'others');
                            });
                          cont =1;              
                      }else{
                          cont1 =2;
                      }          
                    });
                      if (cont == 0 && cont1 == 2){
                            global.load_posts.set_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,no_iamge,'others');
                            
                      }
                      if (cont == 0 && cont1 == 0){
                            global.load_posts.set_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,no_iamge,'others');
                            
                      }
                  });
                  inner_request.fail(function (callback) {
                  });

                 }
                 }
            });

    });
  
  request.fail(function (callback) {
    console.log(callback);
    });

}



function setother_header(url){
	//var url = "api/friends/"+global.cookie_setting.get("userid");
  	var request = $.ajax({
          method: "GET",
          url: url,
        });
  	request.done(function (callback) {
    console.log(callback);
    var img = callback.picture;
    if(img != undefined || img != 'undefined'){
    	 	$('#other_div1').html('<img src='+img+' class="img-circle" alt="Cinque Terre"  width="100" height="100">');
 		 }
		  $('#other_div2').html('<h1>'+callback.first_name+' '+callback.last_name+'<h1>');
    //alert("successfully post.");
    });
  
  request.fail(function (callback) {
    console.log(callback);
    });

};

$( document ).ready(function() {
	var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "no_image":"/static/image/no_image.jpg",
       "userphoto":global.cookie_setting.get("picture"),
       "followers":"50",
       "following":"77",
       "friends":"112"
       };

    $('#follower_view').delegate('li', 'click', function () {
         //global.cookie_setting.set("post_id",$(this).attr("value"));
         //console.log("hoho"+$(this).attr("value"));
         var url = $(this).attr("value");
         setother_header(url);
         load_other_posts($(this).attr("id"));
         /*if(img != undefined || img != 'undefined'){
    	 	$('div[id=div1]').html('<img src='+img+' class="img-circle" alt="Cinque Terre"  width="100" height="100">');
 		 }
		  $('div[id=div2]').html('<h1>'+firstname+' '+lastname+'<h1>');
		  $("#userphoto").html('<a href="#"><img src='+img+'  width="20" height="20"> </a>');
		  $("#profile_page").html('<span class="glyphicon glyphicon-user"></span>'+username +'');*/

     });   


	$("#home").show();
	$("#posted").hide();
	$("#follow_btn").hide();
	$("#other_posted").hide();
	$("#friends").hide();
	$("#git").hide();
	$("#profile").hide();
	$("#follower_list").show();
	$("#following_list").hide();
	$("#friends_list").hide();
	$("#fof_list").hide();
	$("#search_list").hide();
	$("#search_result_fild").hide();
	$("#comment").hide();

	global.login_setting.infor_setting();
	setup();
	global.load_posts.posts_load(data,"home");
	global.load_posts.posts_load(data,"posted");
	global.load_posts.posts_load(data,"git");
	global.findfriends.friends();
	global.findfriends.get_follower();
	global.findfriends.get_following();
    //console.log( data.username);       
    //console.log( data.url);    
    //console.log( data.firstname);    
    //console.log( data.lastname);    
    //console.log( data.userphoto);    
	//console.log( global.cookie_setting.get("lastname"));
});

})(this);