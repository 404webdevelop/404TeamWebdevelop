


var data= {"username":"Yu",
		   "userpassworld":"123456789",
		   "userphoto":"/static/image/Yu.jpg",
		   "intro": "good luck"
			 };


var post_item={
		"post_title":"Test Data",
		"post_text" :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"post_autor":"Me!",
		"post_date":"August 1st, 2012",
		"post_image":"/static/image/Yu.jpg"
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
	window.location="signup";
}

function setdynamic(img,tit,tex,date,author){
	var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><h2 class=\"ui-li-heading\"><u>"+tit+"</u></a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal'>"+tex+"</p></div>&nbsp;</div></li>"
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
	
	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>Can't loaded!</strong> You might not signin <br> or <br> you might not connected to the server</center></div>";
	
}else{
	var number = post_list.length;
	var st= loaddynamic(number)
	var head = setifor(data.userphoto,data.username,data.intro)
	
	document.getElementById("loginbutton").innerHTML ="<a href=\"profile\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<button id=\"logoutbutton\" type=\"button\" onclick=\"logout()\" class=\"btn btn-lg btn-warning\">Logout</button>";
	document.getElementById("list_post_view").innerHTML = st;
	document.getElementById("info").innerHTML = head;
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><button id=\"AddFriendbutton\" type=\"button\" onclick=\"addFriend()\" class=\"btn btn-lg btn-success\">Add Friend</button>   Yu is following you</div>";


};




