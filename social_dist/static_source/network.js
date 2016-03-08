


var data= {"username":getCookie("username"),
		   "userphoto":"../static/image/Yu.jpg",
		   "followers":"50",
		   "following":"77",
		   "friends":"112",
		   "followlist":["Following1","Following2"],
		   "friendlist":["Friend1","Friend2"],
		   "fanlist":["Follower1","Follower2"]
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

function setifor(img,username,followers, following, friends){
	var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+username+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
	return string;
};

function loaddynamic(number){
	var st="";
	for(i = 0 ;i<number;i++){
		st = st+setdynamic(post_list[i].post_image,post_list[i].post_title,post_list[i].post_text,post_list[i].post_date,post_list[i].post_autor);

	}
	return st
};



if (data.username == "undefined" || data.username == "" ){
	
	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>You do not have access to view this page</strong><br>If you are not logged in, please do so now. </center></div>";
	
	
}else{
	var number = post_list.length;
	var st= loaddynamic(number)
	var head = setifor(data.userphoto,data.username,data.intro)
	
	document.getElementById("loginbutton").innerHTML ="<a href=\"posted\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<a href=\"#myProfileDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"edit\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Edit Profile</button></a><button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
	document.getElementById("list_post_view").innerHTML = st;
	document.getElementById("info").innerHTML = head;
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><button id=\"AddFriendbutton\" type=\"button\" onclick=\"addFriend()\" class=\"btn btn-lg btn-success\">Add Friend</button>   Yu is following you</div>";


};

function setCookie(key,value){
  document.cookie = key+"="+value;
  //document.cookie = "username = "+username;
};


function clearCookie(token){
  setCookie(token,"undefined",-1);
}

function getCookie(cname) {
    var name = cname + "=";
    //console.log(name);
    var ca = document.cookie.split(';');
    //console.log(ca);
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getlogin(url,data,callback){
  var val;
  var username = data.username;
  //console.log(username);
  var password = data.password;
  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,

        });
  request.done(function (callback) {
            //console.log(callback);
            var token =JSON.stringify(callback);

            
            setCookie("username",username);
            setCookie("token",token);
            
         });
  request.fail(function () {
            //console.log(callback);
            clearCookie("username");
            clearCookie("token");
            clearCookie("url");
         });
  //return callback;

};

$("#login_submit").click(function(){
    var username = $("#username").val();
    var password = $("#password").val();

    var data = {"username": username, "password": password};
    //console.log(data);
    var url = "api-token/";
    var callback = "";
    getlogin(url,data,callback);
    var token=getCookie("token");
   
    //console.log(token);
    //$("#response").html(token);  
    setTimeout(function(){
      window.location.href = "home";
    },1000
      );
});




$("#logoutbutton").click(function(){
 	  clearCookie("username");
    clearCookie("token");
    clearCookie("url");
  	
    setTimeout(function(){
      window.location.href = "home";
    },1000
      );


});

$("#connect_friends").click(function(){
    
    setTimeout(function(){
      window.location.href = "friends";
    },1000
      );


});

$("#connect_home").click(function(){
    
    setTimeout(function(){
      window.location.href = "home";
    },1000
      );


});




