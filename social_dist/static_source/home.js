


var data= {"username":getCookie("username"),
		   "userphoto":"../static/image/Yu.jpg",
		   "followers":"50",
		   "following":"77",
		   "friends":"112"
			 };

console.log(getCookie("username"));
console.log(getCookie("token"));
console.log(getCookie("url"));
console.log(getCookie("username"));






//var post_list=[];

/*function setpostitem(title,text,image,date,autor){
	post_item.post_title = title;
	post_item.post_text = text;
	post_item.post_image = image;
	post_item.post_date = date;
	post_item.post_autor=autor;
	post_list.push(post_item);

};*/


getpost();




function signuppage(){
	window.location="signup";
}



function setdynamic(img,tit,tex,date,author){
	var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
	return string;
};

function setifor(img,username,following, follower, friends){
	var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
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

	var head = setifor(data.userphoto,data.username,data.intro)
	
	document.getElementById("loginbutton").innerHTML ="<a href=\"posted\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<a href=\"#myProfileDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"edit\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Edit Profile</button></a><button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
	document.getElementById("info").innerHTML = head;
	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<center><button id=\"Reloadbutton\" type=\"button\" onclick=\"javascript:history.go(0)\" class=\"btn btn-lg btn-success\">Refresh Feed</button> </div></div>";



};

function setCookie(key,value){
  document.cookie = key+"="+value;
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





function getpost(){

  var url = "api/post/posts/";
  var request = $.ajax({
          method: "GET",
          url: url,

        });

  request.done(function (callback) {
            //console.log(callback);
            console.log(callback);
            var postobj = callback;
            $.each(postobj, function (i, value) {
              if (postobj[i].author == getCookie("url")){
                var data = {};
                
                
                $.getJSON(postobj[i].author,function(data){
                    console.log("that"+i+"f   ="+postobj[i].author);
                  console.log("that"+i+"f   ="+postobj[i].title);
                  console.log("that"+i+"f   ="+postobj[i].content);
                  console.log("that"+i+"f   ="+postobj[i].date_created);
                   
                    data = data.username;
                    console.log("this"+i+"f   ="+data);
                    //setpostitem(postobj[i].title,postobj[i].content,"/static/image/Yu.jpg",postobj[i].date_created,data);
                    //var number = post_list.length;
                    var st= setdynamic("/static/image/Yu.jpg",postobj[i].title,postobj[i].content,postobj[i].date_created,data);
                    $("#list_post_view").append(st);
                    //document.getElementById("list_post_view").innerHTML = st;

                });
              }
            });
         });
  request.fail(function (callback) {
            //console.log(callback);
            console.log(callback);
         });

}




function getuserurl(callback){

  var url = "api/authors/";
  var request = $.ajax({
          method: "GET",
          url: url,

        });
  request.done(function (callback) {
            //console.log(callback);
            console.log(callback);
            var userobj = callback;
            for(i = 0; i < userobj.length; i++){
              if (userobj[i].username == getCookie("username")){
                console.log(userobj[i].url);
                setCookie("url",userobj[i].url);
              }
            }

         });
  request.fail(function (callback) {
            //console.log(callback);
            console.log(callback);
         });

}




//need to copy patchprofile and click button to each page.

function patchProfile(username,firstName, lastName, callback) {

  var token = JSON.parse(getCookie("token"));
  console.log(token.token);


  $.ajax({
    method: 'PATCH',
    url: getCookie("url"),
    contentType:"application/json; charset=utf-8",
    data: JSON.stringify({
      'username': username,
      'first_name': firstName,
      'last_name': lastName

    }),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token ' + token.token);
    },
    success: function (data) {
      //callback(data);
      clearCookie("username");
      clearCookie("token");
      clearCookie("url");
      setTimeout(function(){
      window.location.href = "home";
        },1000
      );


    },
    error: function (error) {
      console.log(error);
    }
  })
}




$("#update_submit").click(function(){

    var username_input = $("#user-name-input").val();
    var firstname_input = $('#first-name-input').val();
    var lastname_input = $('#last-name-input').val();

    patchProfile(username_input,firstname_input, lastname_input);
    //$("#response").html(token);  
    
});








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

            getuserurl();
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
    getuserurl();
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





