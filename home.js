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
	document.getElementById("loginbutton").innerHTML ="<a href=\"profile.html\"><u>[ "+username+" ]</u></a><a href=\"profile.html\"> <img id=\"userimage\" src=\"image/Yu.jpg\"></a><button id=\"logoutbutton\" type=\"button\" onclick=\"logout()\" class=\"btn btn-xs btn-warning\">Logout</button>";
};




