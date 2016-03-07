


var data= {"username":getCookie("username"),
		   "userphoto":"../static/image/Yu.jpg",
		   "intro": "good luck"
			 };

console.log(getCookie("username"));
var post_item={
		"post_title":"Lorem",
		"post_text" :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		"post_autor":"hoho",
		"post_date":"October 14, 2012",
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






function signuppage(){
	window.location="signup";
}

function setdynamic(img,tit,tex,date,author){
	var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
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



if (data.username == "undefined" || data.username == "" ){
	
	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>Can't loaded!</strong> You might not signin <br> or <br> you might not connected to the server</center></div>";
	
}else{
	var number = post_list.length;
	var st= loaddynamic(number)
	var head = setifor(data.userphoto,data.username,data.intro)
	
	document.getElementById("loginbutton").innerHTML ="<a href=\"profile\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
	document.getElementById("info").innerHTML = head;
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<center><button id=\"Reloadbutton\" type=\"button\" onclick=\"javascript:history.go(0)\" class=\"btn btn-lg btn-success\">Refresh Feed</button> </div></div>";
	document.getElementById("list_post_view").innerHTML = st;

      //<li class=\"ui-block-a\"><a  href=\"#\" id=\"load\" data-icon=\"refresh\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Load more</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-b\"><a class=\"ui-btn ui-btn-up-a\" href=\"porfile.html\" id=\"pro\" data-icon=\"star\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Porfile</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-c\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"posted.html\" id=\"skull\" data-icon=\"edit\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Posted</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>
      //<li class=\"ui-block-d\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"friends.html\" id=\"beer\" data-icon=\"user\"><span class=\"ui-btn-inner\"><span class=\"ui-btn-text\">Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\>&nbsp;</span></span></a></li>
     // <li class=\"ui-block-e\"><a class=\"ui-btn ui-btn-inline ui-btn-icon-top ui-btn-up-a\" data-inline="true" data-theme=\"a\" data-iconpos=\"top\" data-wrapperels=\"span\" data-iconshadow=\"true\" data-shadow=\"false\" data-corners=\"false\" href=\"addfriends.html\" id=\"coffee\" data-icon=\"plus\"><span class=\"ui-btn-inner\"><span class=\ui-btn-text\">Add Friends</span><span class=\"ui-icon ui-icon-custom ui-icon-shadow\">&nbsp;</span></span></a></li>

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




