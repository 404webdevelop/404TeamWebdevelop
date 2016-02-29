


var data= {"username":"Yu",
		   "userpassworld":"123456789",
		   "userphoto":"image/Yu.jpg",
		   "intro": "good luck"
			 };


var post_item={
		"post_title":"good",
		"post_text" :"good is god",
		"post_autor":"hoho",
		"post_date":"2012",
		"post_image":"image/Yu.jpg"
};


var post_list=[];

function setpostitem(title,text,image,date,autor){
	post_item.post_title = title;
	post_item.post_text = text;
	post_item.post_image = image;
	post_item.post_date = date;
	post_item.post_autor=autor;
	post_list.push(post_item);

};


setpostitem(post_item.post_title,post_item.post_text,post_item.post_image,post_item.post_date,post_item.post_autor);
setpostitem(post_item.post_title,post_item.post_text,post_item.post_image,post_item.post_date,post_item.post_autor);
setpostitem(post_item.post_title,post_item.post_text,post_item.post_image,post_item.post_date,post_item.post_autor);
setpostitem(post_item.post_title,post_item.post_text,post_item.post_image,post_item.post_date,post_item.post_autor);




function logout(){
	

};

function signinbox(){

}
function signuppage(){
	window.location="signup.html";
}

function setdynamic(img,tit,tex,date,autor){
	var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><h2 class=\"ui-li-heading\"><u>"+tit+"</u>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">[posted-by: "+autor+" post-date: "+date+"]</span></h2><p class=\"ui-li-desc\"><em>"+tex+"</em></p></a></div>&nbsp;</div></li>"
	return string;
};

function setifor(img,username,intro){
	var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+username+"</h1></div><div class=\"well\"><p>"+intro+"</p></div></td></tr></table>";
	return string;
};

function loaddynamic(number){
	var st="";
	for(i = 0 ;i<number;i++){
		st = st+setdynamic(post_list[i].post_image,post_list[i].post_title,post_list[i].post_text,post_list[i].post_date,post_list[i].post_autor);

	}
	return st
};



if (data.username == "None"){
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"connect.html\">Connect</a></li>";
	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>Can't loaded!</strong> You might not signin <br> or <br> you might not connected to the server</center></div>";
	
}else{
	var number = post_list.length;
	var st= loaddynamic(number)
	var head = setifor(data.userphoto,data.username,data.intro)
	document.getElementById("welcomeitem").innerHTML ="<li class=\"active\"><a href=\"home.html\">Home</a></li><li><a href=\"posted.html\">Posted</a></li><li><a href=\"about.html\">About us</a></li><li><a href=\"connect.html\">Connect</a></li>";
	document.getElementById("loginbutton").innerHTML ="<a href=\"profile.html\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<button id=\"logoutbutton\" type=\"button\" onclick=\"logout()\" class=\"btn btn-lg btn-warning\">Logout</button>";
	document.getElementById("list_post_view").innerHTML = st;
	document.getElementById("info").innerHTML = head;
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can veiw your friends' posts below.<br>if you want to see the most recent posts please click the refresh button or the load more button at the bottom<center></div>";

      //<li class=\"ui-block-a\"><a  href=\"#\" id=\"load\" data-icon=\"refresh\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Load more</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-b\"><a class=\"ui-btn ui-btn-up-a\" href=\"porfile.html\" id=\"pro\" data-icon=\"star\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Porfile</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-c\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"posted.html\" id=\"skull\" data-icon=\"edit\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Posted</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-d\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"friends.html\" id=\"beer\" data-icon=\"user\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\>&nbsp;</span></span></a></li>
     // <li class=\"ui-block-e\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"addfriends.html\" id=\"coffee\" data-icon=\"plus\"><span class=\"ui-btn-inner\"><span class=\ui-btn-text\">Add Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>

};




