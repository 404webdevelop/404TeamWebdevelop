(function (global) {

'use strict';
function checkfollowed(callback){      
        var url = "api/follow/"+global.cookie_setting.get("userid")+"/followings";
        $.getJSON(url,function(data){
            console.log(data);
            $.each(data,function (i,value){

              console.log(data[i].followed.split("/")[5]);
              
              console.log("just: "+global.cookie_setting.get("click_id"));
              if(data[i].followed.split("/")[5] == global.cookie_setting.get("click_id")){
                global.cookie_setting.set("follow_id",data[i].url);
                console.log("wo de tiam");
                $('#follow_btn').text("UNFOLLOW");
                $('#follow_btn').css("background","#FF6347");
                return false;
              }else{
                $('#follow_btn').text("FOLLOW");
                $('#follow_btn').css("background","lightgreen");
              }
            });     
         });
      }
function followother(cookie){

  $.getJSON('api/author/',function(data){
    $.each(data.data,function (i , value){
      if(data.data[i].username == global.cookie_setting.get("click_username")){

        var url = 'api/follow/';
        
        var request = $.ajax({
          method: "POST",
          url: url,
          data:{
          "followed":data.data[i].url,
          "follower":global.cookie_setting.get("url")
          } 
        });
        request.done(function (callback) {
          $('#follow_btn').text("UNFOLLOW");
          $('#follow_btn').css("background","#FF6347");

        });
        request.fail(function (callback) {
            console.log(callback);
         });
        console.log("hoeee:  "+data.data[i].url);
      }
    })
    
  })

};

function unfollowother(cookie){

  $.getJSON('api/author/',function(data){
    $.each(data.data,function (i , value){
      if(data.data[i].username == global.cookie_setting.get("click_username")){

        var url = global.cookie_setting.get("follow_id"); 
        
       var request = $.ajax({
          method: "DELETE",
          url: url,
          data:{
          "followed":data.data[i].url,
          "follower":global.cookie_setting.get("url")
          } 
        });
        request.done(function (callback) {
          $('#follow_btn').text("FOLLOW");
          $('#follow_btn').css("background","lightgreen");
          //console.log(callback);

        });
        request.fail(function (callback) {
            console.log(callback);
         });
      }
    })
    
  })


};



function findfriends(data,page){
  var load_post = global.load_posts; 
  console.log("yoyo");
  console.log(global.cookie_setting.get("userid"));
  var url = "api/friends/"+global.cookie_setting.get("userid");
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            console.log(callback);
            var friendsobj = callback;

            $.each(friendsobj.authors,function (i,value){
              //console.log("sm++++");
              //console.log(i);
              var auturl = "api/author/"+friendsobj.authors[i];
              $.getJSON(auturl,function(data){
                    
                    //console.log(data);
                    if(page == "network"){
                      $("#f2").append("<li id = \""+data.username+"\"value=\""+data.id+"\" class=\"ui-last-child\" ><a  class=\"ui-btn ui-btn-icon-right ui-icon-user\">"+data.username+"</a></li>");
                    }
                    if(page =="friends" ){
                      $("#friends_list_view").append("<li id = \""+data.username+"\"value=\""+data.id+"\" class=\"ui-last-child\" ><a  class=\"ui-btn ui-btn-icon-right ui-icon-user\">"+data.username+"</a></li>");
                    }           
                });
            }); 

         });
  request.fail(function (callback) {
            console.log(callback);
         });
};

function search_user(username){
  $.getJSON('api/author/',function(data){
    $.each(data.data,function (i , value){
      console.log(data.data[i].username);
      if(data.data[i].username == username){
        var data_iner = data.data[i];
        $("#search_listview").append("<li id = \""+data_iner.username+"\"value=\""+data_iner.id+"\" class=\"ui-last-child\" ><a  class=\"ui-btn ui-btn-icon-right ui-icon-plus\">"+data_iner.username+"</a></li>");

      }
    })
    
  })



}

global.findfriends= {
  friends:findfriends,
  checkfollow:checkfollowed,
  search:search_user,
  follow_other:followother,
  unfollow_other:unfollowother
	
}



})(this);