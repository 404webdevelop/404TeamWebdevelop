var username="YU"

if (username =="None"){
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"connect.html\">Connect</a></li>";
	document.getElementById("loginbutton").innerHTML ="<li><button id=\"signup\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button></li> <li><span>fg</span></li>li><button id=\"signin\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></li>";
}else{
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"posted.html\">Posted</a></li><li><a href=\"connect.html\">Connect</a></li>";
}


