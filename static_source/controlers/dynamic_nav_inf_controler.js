(function (global) {

'use strict';


function setifor(img,firstname,lastname,followers, following, friends,page){
	if(page =="otherpost"){
  		var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+firstname+"  "+lastname+"</h1><button class=\" ui-btn ui-shadow ui-corner-all\" id=\"follow_btn\" type=\"button\">FOLLOW</button></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
  	}
  	else{
  		var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+firstname+"  "+lastname+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";	
  	}
  return string;



};

function nav_inf_set(data,page){

 
          global.findfriends.checkfollow();
          var head = setifor(data.userphoto,data.firstname,data.lastname,data.following, data.followers, data.friends,page);
          console.log(head);
          $("#user_name_input").text(global.cookie_setting.get("username"));
          $("#info").html(head);
          $("#connect-infor").html("<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<br>if you want to see the most recent posts please click the refresh button or the load more button at the bottom<center></div>");
          
      
}



global.nav_inf= {
  nav_inf_setting:nav_inf_set
	
}



})(this);
