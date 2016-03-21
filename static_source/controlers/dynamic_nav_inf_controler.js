(function (global) {

'use strict';


function setifor(img,firstname,lastname,followers, following, friends,page){
  console.log(img);
  if(img == "null"){
    img = "/static/image/no_image.jpg";
  }

	if(page =="otherpost"){
  		var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+firstname+"  "+lastname+"</h1><button class=\" ui-btn ui-shadow ui-corner-all\" id=\"follow_btn\" type=\"button\">FOLLOW</button></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
  	}
	else if(page =="network"){
		 var combox = "<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><center><textarea id='comment_content' type='textarea' cols='64' rows='5'></textarea><button class='btn btn-lg btn-default' id=\"list_combox_btn\" type=\"button\" style='position:relative;top:-40px;'>Submit New Comment</button></div>&nbsp;</div>";
	    
		$("#list_combox_view").append(combox);
	}
  	else{
  		var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+firstname+"  "+lastname+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";	
  	}
  return string;



};



function nav_inf_set(data,page){
          global.findfriends.checkfollow();
          var head = setifor(data.userphoto,data.firstname,data.lastname,data.following, data.followers, data.friends,page);
          //console.log(head);
          $("#user_name_input").text(global.cookie_setting.get("username"));
          $("#info").html(head);
          $("#connect-infor").html("<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<br>if you want to see the most recent posts please click the refresh button or the load more button at the bottom<center></div>");
          
      
}



global.nav_inf= {
  nav_inf_setting:nav_inf_set
	
}



})(this);
