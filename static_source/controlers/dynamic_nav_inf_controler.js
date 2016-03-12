(function (global) {

'use strict';

function setifor(img,username,followers, following, friends){
  var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+username+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
  return string;
};

function nav_inf_set(data,page){
    
    var cookie = global.cookie_setting;

    if (data.username == "undefined" || data.username == undefined ){
    document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
    document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>You do not have access to view this page</strong><br>If you are not logged in, please do so now. </center></div>";
    $("#fot").hide();
    if(page == "friends"){
      $("#div1").hide();
      $("#div2").hide();
      $("#div_space").hide();
    }
    if(page=="network"){
      $("#Following").hide();
      $("#Followers").hide();
      $("#Friends").hide();
    }
    
  }else{
    var head = setifor(data.userphoto,data.username,data.following, data.followers, data.friends);
    document.getElementById("loginbutton").innerHTML ="<a href=\"posted\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<a href=\"#myProfileDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"edit\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Edit Profile</button></a><button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
    document.getElementById("info").innerHTML = head;
    document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<br>if you want to see the most recent posts please click the refresh button or the load more button at the bottom<center></div>";
    
  };

    

}



global.nav_inf= {
  nav_inf_setting:nav_inf_set
	
}



})(this);
