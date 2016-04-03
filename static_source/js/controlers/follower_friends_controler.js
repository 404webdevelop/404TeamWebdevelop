(function (global) {

'use strict';
function check_friend_request(){

  var url="api/follow/pendingRequest/";
  $.getJSON(url,function(data){
    console.log(data.request.length);
    $(".noti_bubble").text(data.request.length);
    $.each(data.request,function (i,value){
      //console.log(data.request[i]);
      $.getJSON('api/author',function(authorobj){
        //console.log(authorobj);
        $.each(authorobj.authors,function (j, value){
          //console.log(authorobj.authors[j].id);
          if(authorobj.authors[j].id == data.request[i]){
            console.log("find it");
            if(authorobj.authors[j].picture == null){
              var img = '<img src="/static/image/noiamge.gif" class="img-circle" alt="Cinque Terre"  width="100" height="100" ></a>'
            }else{
              var img = '<img src="'+authorobj.authors[j].picture+'" class="img-circle" alt="Cinque Terre"  width="100" height="100" ></a>'
            }
            $('#request_list_view').append('<div class="panel panel-primary">\
                      <div class="panel-heading"><strong>'+authorobj.authors[j].displayName+'</strong> want to add you as a friend</div>\
                      <div class="panel-body">\
                        <div class="row" id="posted_item">\
                            <div class="col-md-5">'+img+'</div>\
                            <div class="col-md-7">\
                                <h3 id="click_url" >'+authorobj.authors[j].first_name+' '+authorobj.authors[j].last_name+'</h3>\
                                <h4 id="click_username" >'+authorobj.authors[j].displayName+'</h4>\
                                <p></p>\
                                <li id="'+authorobj.authors[j].displayName+'" value="'+authorobj.authors[j].url+'"><button   class="btn btn-primary" >View Person <span class="glyphicon glyphicon-chevron-right"></span></button></li>\
                            </div>\
                        </div>\
                      </div>\
                    </div>');
          }
        })
      });
    });
    //$(".noti_bubble").text(data.request.length);
    //$.getJSON('api/author',function(authorobj){
  });
}



function checkfollowed(id,callback){      
    var url = "api/follow/"+global.cookie_setting.get("userid")+"/localAuthorFollowings";
    $.getJSON(url,function(data){
      if(data[0] == undefined ){
        $('#follow_btn').show(); 
        $('#unfollow_btn').hide(); 
        $('#rej').hide();
      }
        $.each(data,function (i,value){
          if(data[i].followed.split("/")[5] == id){
            global.cookie_setting.set("follow_id",data[i].url);
            $('#follow_btn').hide(); 
            $('#unfollow_btn').show(); 
            $('#rej').hide(); 
            return false;
          }else{
            $('#follow_btn').show(); 
            $('#unfollow_btn').hide(); 
            //$('#rej').show();
          }
        });     
     });
    /*var url = "api/follow/"+global.cookie_setting.get("userid")+"/remoteAuthorFollowings";
    $.getJSON(url,function(data){
      if(data[0] == undefined ){
        $('#follow_btn').show(); 
        $('#unfollow_btn').hide(); 
      }
        $.each(data,function (i,value){
          if(data[i].followed.split("/")[5] == id){
            global.cookie_setting.set("follow_id",data[i].url);
            $('#follow_btn').hide(); 
            $('#unfollow_btn').show();  
            return false;
          }else{
            $('#follow_btn').show(); 
            $('#unfollow_btn').hide(); 
          }
        });     
     });*/
}

function followother(username,user_url){
    var url = 'api/follow/';
    var request = $.ajax({
      method: "POST",
      url: url,
      data:{
      "followed":user_url,
      "follower":global.cookie_setting.get("url"),
      "remote_author_id": "",
      "remote_author_name": "",
      "remote_author_url": "",
      "remote_author_host": ""
      } 
    });
    request.done(function (callback) {
      console.log(callback);
      $('#follow_btn').hide(); 
      $('#unfollow_btn').show();
      $("#following_view").empty();
      $("#friends_view").empty();
      $('#request_list_view').empty();
      getfollowings();
      findfriends();
      check_friend_request();

    });
    request.fail(function (callback) {
        console.log(callback.responseText);
     });

};

function unfollowother(username,user_url){
     var url = "/api/follow";
     $.getJSON(url,function(data) {
        $.each(data,function ( i,value ){
            if(data[i].followed == user_url && data[i].follower ==global.cookie_setting.get("url")){
              console.log("11111");
              var new_url = data[i].url;
              var request = $.ajax({
                  method: "DELETE",
                  url: new_url,
                  
              });
              request.done(function (callback) {
                $('#follow_btn').show();  
                $('#unfollow_btn').hide();
                $("#following_view").empty();
                $("#friends_view").empty();
                $('#request_list_view').empty();
                getfollowings();
                findfriends();
                check_friend_request();

              });
              request.fail(function (callback) {
                  console.log(callback);
               });
            }
        })
     });   
}
 


function getfollowers(){
  var url = "api/follow/"+global.cookie_setting.get("userid")+"/localAuthorFollowers";
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

  /*var url = "api/follow/"+global.cookie_setting.get("userid")+"/remoteauthorFollowers";
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
         });*/
}

function getfof(){
  var url = "api/friendoffriend/"+global.cookie_setting.get("userid");
  $.getJSON(url,function(data){
 
    $.each(data.fof,function (i,value){
   
      $.getJSON('api/author',function(authorobj){

        $.each(authorobj.authors,function (j, value){

          if(authorobj.authors[j].id == data.fof[i]){
            
              console.log("hoho find it");
              $("#fof_view").append('<li id= "'+authorobj.authors[j].displayName+'"value="'+authorobj.authors[j].url+'"><a href="#" class="list-group-item ">'+authorobj.authors[j].displayName+'</a></li>');
            
          }
        })
      });
    });
  });

}


function getfollowings(){
  var url = "api/follow/"+global.cookie_setting.get("userid")+"/localAuthorFollowings";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
                $.getJSON(followersobj[i].followed,function(data){     
                  $("#following_view").append('<li id= "'+data.displayName+'"value="'+data.url+'"><a href="#" class="list-group-item ">'+data.displayName+'</a></li>');
                });         
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });

  /*var url = "api/follow/"+global.cookie_setting.get("userid")+"/remoteAuthorFollowings";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
                $.getJSON(followersobj[i].followed,function(data){     
                  $("#following_view").append('<li id= "'+data.displayName+'"value="'+data.url+'"><a href="#" class="list-group-item ">'+data.displayName+'</a></li>');
                });         
            }); 
         });
  request.fail(function (callback) {
            console.log(callback);
         });*/
}



function findfriends(){
  var url = "api/friends/"+global.cookie_setting.get("userid");
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
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
      if(data.authors[i].displayName == username){
        cont =1;
        var data_iner = data.authors[i];
        console.log(data_iner);
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
                                <h3 id="click_url" value="'+data_iner.url+'"> Name:'+data_iner.first_name+' '+data_iner.last_name+'</h3>\
                                <h4 id="click_username" value="'+data_iner.displayName+'"> Username: '+data_iner.displayName+'</h4>\
                                <p></p>\
                                <button  id="search_friend_button" class="btn btn-primary" >View Person <span class="glyphicon glyphicon-chevron-right"></span></button>\
                            </div>\
                        </div>\
                      </div>\
                    </div>');
      }
      $('#search_friend_button').click(function(){
        $('#others_page_list_view').empty();
        var url = $('#click_url').attr("value");
        var othername= $('#click_username').attr("value");
        global.button_click.jump(url,othername);
      });
    })
    if (cont ==0){
      $("#search_result_fild").html('<div class="panel panel-danger">\
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
  f_request:check_friend_request,
  search:search_user,
  follow_other:followother,
  unfollow_other:unfollowother,
  get_follower:getfollowers,
  get_following:getfollowings,
  get_fof:getfof
	
}



})(this);