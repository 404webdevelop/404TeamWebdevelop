


var data= {"username":getCookie("username"),
		   "userphoto":"../static/image/Yu.jpg",
		   "followers":"50",
		   "following":"77",
		   "friends":"112"
			 };

function signuppage(){
	window.location="signup";
}

function setifor(img,username,followers, following, friends){
	var string = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1>"+username+"</h1></div><div class=\"well\"><p>Following: "+following+"   Followers: "+followers+"    Friends: "+friends+"</p></div></td></tr></table>";
	return string;
};


function setup(data){
  if (data.username == "undefined" || data.username == "" ){
  	document.getElementById("loginbutton").innerHTML ="<button id=\"signup\" onclick=\"signuppage()\"type=\"button\" class=\"btn btn-lg btn-primary\">Sign up</button> <a href=\"#myPopupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"signin\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Sign in</button></a>";
  	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-danger\" ><center><strong>You do not have access to view this page</strong><br>If you are not logged in, please do so now. </center></div>";
  	$("#fot").hide();
    $("#div1").hide();
    $("#div2").hide();
  }else{
  	var head = setifor(data.userphoto,data.username,data.following, data.followers, data.friends);
  	document.getElementById("loginbutton").innerHTML ="<a href=\"posted\" id=\"user_name_input\">[ "+data.username+" ]</a>&nbsp &nbsp &nbsp<a href=\"#myProfileDialog\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"fade\" ><button id=\"edit\"onclick=\"signinbox()\"type=\"button\" class=\"btn btn-lg btn-default\">Edit Profile</button></a><button id=\"logoutbutton\" type=\"button\" class=\"btn btn-lg btn-warning\">Logout</button>";
  	document.getElementById("info").innerHTML = head;
  	document.getElementById("connect-infor").innerHTML = "<div id=\"connect-infor\" class=\"alert alert-success\" ><center><strong>Successfully loaded!</strong> You can view your friends' posts below.<br>if you want to see the most recent posts please click the refresh button or the load more button at the bottom<center></div>";
    
  };


  $("#searchbutton").click(function(){
      console.log($('#myFilter').val());
      searchfriend($('#myFilter').val());
      
  });

  $("#update_submit").click(function(){
      var username_input = $("#user-name-input").val();
      var firstname_input = $('#first-name-input').val();
      var lastname_input = $('#last-name-input').val();
      patchProfile(username_input,firstname_input, lastname_input);
  });

  $('#post_post').click(function(){
      postPost();
  });

  $("#login_submit").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      var data = {"username": username, "password": password};
      var url = "api-token/";
      var callback = "";
      getlogin(url,data,callback);
      var token=getCookie("token"); 
      setTimeout(function(){
        window.location.href = "friends";
      },1000);
  });



  $("#logoutbutton").click(function(){
      clearCookie("username");
      clearCookie("token");
      clearCookie("url");
      setTimeout(function(){
        window.location.href = "home";
      },0);
  });

  $("#connect_friends").click(function(){
      
      setTimeout(function(){
        window.location.href = "friends";
      },0);
  });

  $("#connect_home").click(function(){
      
      setTimeout(function(){
        window.location.href = "home";
      },0);
  });

  $("#connect_prof").click(function(){
      
      setTimeout(function(){
        window.location.href = "posted";
      },0);
  });

  $("#connect_net").click(function(){
      
      setTimeout(function(){
        window.location.href = "network";
      },0);
  });

};

function setCookie(key,value){
  document.cookie = key+"="+value;
};


function clearCookie(token){
  setCookie(token,"undefined",-1);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
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
      setCookie("username",username);
      setTimeout(function(){
      window.location.href = "friends";
        },1000
      );
    },
    error: function (error) {
      console.log(error);
    }
  })
}

function findfriends(){
  url = "api/follows";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            var follower_list=[];
            var following_list=[];
            var friends_list=[];
            var followersobj = callback;
            $.each(followersobj, function (i, value) {
              if (followersobj[i].followed == getCookie("url")){
                  follower_list.push(followersobj[i].follower);
                  console.log(followersobj[i].follower);
                }
              if (followersobj[i].follower == getCookie("url")){
                  following_list.push(followersobj[i].followed);
                   console.log(followersobj[i].followed);
                }
              });

            $.each(follower_list, function (i, value) {
              $.each(following_list, function (j, value) {
                if (follower_list[i] == following_list[j])
                  friends_list.push(follower_list[i]);
              });
            });
            console.log(friends_list);
            $.each(friends_list,function (i,value){
              $.getJSON(friends_list[i],function(data){
                    data = data.username;
                    console.log(data);
                    $("#friends_list_view").append("<li class=\"ui-last-child\" ><a class=\"ui-btn ui-btn-icon-right ui-icon-user\"href=\"#\">"+data+"</a></li>");
                });
            });
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}



function searchfriend(username){
  var url = "api/authors/";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  request.done(function (callback) {
            console.log(callback);
            var userobj = callback;
            for(i = 0; i < userobj.length; i++){
              if (userobj[i].username == username){
                console.log("find::"+userobj[i].username);
                $("#search_listview").html("<li id=\"searched_friend\"class =\"ui-first-child ui-last-child\"><a class=\"ui-btn ui-btn-icon-right ui-icon-plus\" href=\"#\">"+userobj[i].username+"</a></li>");
              }
            } 
         });
  request.fail(function (callback) {
            console.log(callback);
         });
}

function getlogin(url,data,callback){
  var val;
  var username = data.username;
  var password = data.password;
  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,
        });
  request.done(function (callback) {
            var token =JSON.stringify(callback);
            setCookie("username",username);
            setCookie("token",token);
         });
  request.fail(function () {
            clearCookie("username");
            clearCookie("token");
            clearCookie("url");
         });
};


function postPost(){
  var url = "api/post/posts/";
  var post_post= $("#title_input_style").val();
  var post_content= $("#content_input_style").val();
  var post_url= getCookie("url");
  var data= {
    "title": post_post,
    "content": post_content,
    "author": post_url,
  };
  var request = $.ajax({
          method: "POST",
          url: url,
          data: data,
        });
  request.done(function (callback) {
    console.log(callback)
    });
  request.fail(function (callback) {
    console.log(callback);
    });
}



setup(data);
findfriends();