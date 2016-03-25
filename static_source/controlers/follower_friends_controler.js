(function (global) {

'use strict';
function checkfollowed(callback){      
        var url = "api/follow/"+global.cookie_setting.get("userid")+"/followings";
        $.getJSON(url,function(data){
            //console.log(data);
            $.each(data,function (i,value){
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
function followother(){

  $.getJSON('api/author/',function(data){
    $.each(data.authors,function (i , value){
      if(data.authors[i].displayName == global.cookie_setting.get("click_username")){

        var url = 'api/follow/';
        
        var request = $.ajax({
          method: "POST",
          url: url,
          data:{
          "followed":data.authors[i].url,
          "follower":global.cookie_setting.get("url"),
          } 
        });
        request.done(function (callback) {
          $('#follow_btn').text("UNFOLLOW");
          $('#follow_btn').css("background","#FF6347");
          setTimeout(function(){
                window.location.href = "otherposted";
              },0
                ); 

        });
        request.fail(function (callback) {
            console.log(callback.responseText);
         });
        console.log("hoeee:  "+data.authors[i].url);
      }
    })
    
  })
  global.findfriends.checkfollow();

};

function unfollowother(){
  global.findfriends.checkfollow();
  $.getJSON('api/author/',function(data){
    $.each(data.authors,function (i , value){
      if(data.authors[i].displayName == global.cookie_setting.get("click_username")){

        var url = global.cookie_setting.get("follow_id"); 
        
       var request = $.ajax({
          method: "DELETE",
          url: url,
          data:{
          "followed":data.authors[i].url,
          "follower":global.cookie_setting.get("url")
          } 
        });
        request.done(function (callback) {
          $('#follow_btn').text("FOLLOW");
          $('#follow_btn').css("background","lightgreen");
        });
        request.fail(function (callback) {
            console.log(callback);
         });
      }
    })
    
  })


};

function getfollowers(){
  //console.log(global.cookie_setting.get("userid"));
  var url = "api/follow/"+global.cookie_setting.get("userid")+"/followers";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
                $.getJSON(followersobj[i].follower,function(data){
                    $("#follower_view").append('<li id= "'+data.displayName+'"value="'+data.url+'"><a href="#" class="list-group-item ">'+data.displayName+'</a></li>'); 
                });
              
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}


function getfollowings(){
  //var friends_list=[];
  //console.log(global.cookie_setting.get("userid"));
  var url = "api/follow/"+global.cookie_setting.get("userid")+"/followings";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
                $.getJSON(followersobj[i].followed,function(data){     
                  //console.log(data.url);
                  $("#following_view").append('<li id= "'+data.displayName+'"value="'+data.url+'"><a href="#" class="list-group-item ">'+data.displayName+'</a></li>');
                });         
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}

function findfriends(){
  var url = "api/friends/"+global.cookie_setting.get("userid");
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            //console.log(callback);
            var friendsobj = callback;
            $.each(friendsobj.authors,function (i,value){
              var auturl = "api/author/"+friendsobj.authors[i];
              $.getJSON(auturl,function(data){
                    $("#friends_view").append('<li id= "'+data.displayName+'"value="'+data.url+'"><a href="#" class="list-group-item ">'+data.displayName+'</a></li>');       
                });
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });
};




function search_user(username){
  $.getJSON('api/author/',function(data){
    console.log(data);
    var cont =0;
    $.each(data.authors,function (i , value){
      //console.log(data.authors[i].username);
      if(data.authors[i].displayName == username){
        cont =1;
        var data_iner = data.authors[i];
        var image = data_iner.picture;
        if(image == undefined || image == 'undefined'){
          image = "/static/image/noiamge.gif"

        };
        $("#search_result_fild").html('<div class="panel panel-primary">\
                      <div class="panel-heading">Search result</div>\
                      <div class="panel-body">\
                        <div class="row" id="posted_item">\
                            <div class="col-md-5">\
                                    <img src='+image+' class="img-circle" alt="Cinque Terre"  width="100" height="100" >\
                                </a>\
                            </div>\
                            <div class="col-md-7">\
                                <h3> Name:'+data_iner.first_name+' '+data_iner.last_name+'</h3>\
                                <h4> Username: '+data_iner.displayName+'</h4>\
                                <p></p>\
                                <a class="btn btn-primary" href="http://blackrockdigital.github.io/startbootstrap-1-col-portfolio/#">View Person <span class="glyphicon glyphicon-chevron-right"></span></a>\
                            </div>\
                        </div>\
                      </div>\
                    </div>');
      }
    })
    if (cont ==0){
      $("#search_result_fild").html('<div class="panel panel-primary">\
                      <div class="panel-heading">Search result</div>\
                      <div class="panel-body">\
                        <div class="row" id="posted_item">\
                            <div class="col-md-5">\
                                    <img src="/static/image/noiamge.gif" class="img-circle" alt="Cinque Terre"  width="100" height="100" >\
                                </a>\
                            </div>\
                            <div class="col-md-7">\
                                <h3> NOT FIND</h3>\
                                <h4> NOTHING IN THERE</h4>\
                                <p></p>\
                                <a class="btn btn-primary" href="http://blackrockdigital.github.io/startbootstrap-1-col-portfolio/#">View Person <span class="glyphicon glyphicon-chevron-right"></span></a>\
                            </div>\
                        </div>\
                      </div>\
                    </div>');
    }
    
  })



}

global.findfriends= {
  friends:findfriends,
  checkfollow:checkfollowed,
  search:search_user,
  follow_other:followother,
  unfollow_other:unfollowother,
  get_follower:getfollowers,
  get_following:getfollowings,
	
}



})(this);