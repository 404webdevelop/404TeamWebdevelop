(function (global) {

'use strict';
function checkfollowed(cookie,callback){      
        var url = "api/follow/"+cookie.get("userid")+"/followings";
        
        
        $.getJSON(url,function(data){
            console.log(data);
            $.each(data,function (i,value){
              console.log(data[i].followed.split("/")[5]);

              console.log("just: "+cookie.get("click_id"));
              if(data[i].followed.split("/")[5] == cookie.get("click_id")){
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
function followother(){

};

function unfollowother(){

};



function findfriends(cookie,data,page){
  var load_post = global.load_posts; 
  console.log("yoyo");
  console.log(cookie.get("userid"));
  var url = "api/friends/"+cookie.get("userid");
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

global.findfriends= {
  friends:findfriends,
  checkfollow:checkfollowed
	
}



})(this);