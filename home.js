var data= "None";

username = data;

function logout(){
	

};

function signinbox(){


}
function signuppage(){
	window.location="signup.html";
}


if (username == "None"){
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"connect.html\">Connect</a></li>";
	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";

	
}else{
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"posted.html\">Posted</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"connect.html\">Connect</a></li>";
	document.getElementById("loginbutton").innerHTML ="<a href=\"profile.html\" id=\"user_name_input\">[ "+username+" ]</a>&nbsp &nbsp &nbsp<button id=\"logoutbutton\" type=\"button\" onclick=\"logout()\" class=\"btn btn-lg btn-warning\">Logout</button>";
	

      //<li class=\"ui-block-a\"><a  href=\"#\" id=\"load\" data-icon=\"refresh\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Load more</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-b\"><a class=\"ui-btn ui-btn-up-a\" href=\"porfile.html\" id=\"pro\" data-icon=\"star\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Porfile</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-c\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"posted.html\" id=\"skull\" data-icon=\"edit\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Posted</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-d\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"friends.html\" id=\"beer\" data-icon=\"user\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\>&nbsp;</span></span></a></li>
     // <li class=\"ui-block-e\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"addfriends.html\" id=\"coffee\" data-icon=\"plus\"><span class=\"ui-btn-inner\"><span class=\ui-btn-text\">Add Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>

};




