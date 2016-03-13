(function (global) {
'use strict';
var cookie = global.cookie_setting;
var boolean_value = "1";


function checkfollowed(cookie,boolean_value,callback){      
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
      console.log(boolean_value);
      }


function button_click(cookie){
    var value = checkfollowed(cookie,boolean_value);

    $('#list_post_view').delegate('li', 'click', function () {
         cookie.set("click_id",$(this).attr("value"));

         setTimeout(function(){
          window.location.href = "posted";
        },0
          );

     });
    $("#follow_btn").click(function(){
      console.log($('#follow_btn').text());
      if ($('#follow_btn').text() == "UNFOLLOW"){
        $('#follow_btn').text("FOLLOW");
        $('#follow_btn').css("background","lightgreen");
      }else{
        $('#follow_btn').text("UNFOLLOW");
        $('#follow_btn').css("background","#FF6347");
      }    


    });

    $('.target').delegate('li', 'click', function () {

         cookie.set("click_id",$(this).attr("value"));
         cookie.set("click_username",$(this).attr("id"));
         setTimeout(function(){
          window.location.href = "otherposted";
        },0
          );
     });

    $("#connect_friends").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "friends";
        },0
          );
    });

    $("#connect_home").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "home";
        },0
          );
    });

    $("#connect_net").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "network";
        },0
          );
    });

    $("#connect_prof").click(function(){
        cookie.clear("click_id");
        cookie.clear("click_username");
        setTimeout(function(){
          window.location.href = "posted";
        },0
          );
    });

}



global.button_click = {
	clickbtn:button_click

}

})(this);
