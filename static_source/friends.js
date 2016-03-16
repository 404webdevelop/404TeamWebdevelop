(function (global) {

'use strict';


function setup(data){
  var page="friends";
  

  $("#searchbutton").click(function(){
      global.findfriends.search($('#myFilter').val());
  });

  global.nav_inf.nav_inf_setting(data,page);
  global.button_click.clickbtn();
  global.findfriends.friends(data,"friends");
  $('#folloer_list_view').hide();
  $('#following_list_view').hide();
  $('#f_f_list_view').hide();
};


$( document ).ready(function() {
  var data= {"username":global.cookie_setting.get("username"),
       "url":global.cookie_setting.get("url"),
       "token":global.cookie_setting.get("token"),
       "firstname":global.cookie_setting.get("firstname"),
       "lastname": global.cookie_setting.get("lastname"),
       "userphoto":"/static/image/no_image.jpg",
       "followers":"50",
       "following":"77",
       "friends":"112"
       };
  $('#folloer_list_view').hide();
  $('#following_list_view').hide();
  $('#f_f_list_view').hide();
  setup(data);
});
})(this);