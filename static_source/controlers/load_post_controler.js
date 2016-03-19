(function (global) {

'use strict';


function setdynamic(img,tit,tex,date,author,type,id,postid,comments){
  //console.log("this is chekck1111: "+global.cookie_setting.get("check"));
  if (type == "git"){
    var string = "<li id=\"view_list_style\" value =\""+id+"\"class=\"ui-btn ui-btn-b ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
    return string;
  }
  if (type == "post"){
    var string = "<li id=\"view_list_style\"value =\""+postid+"\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"posted\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p></a><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a><button class='commentnav' style='position:relative;float:right;top:-5px;'>"+ " Comments</button></div>&nbsp;</div></li>"
    return string;
  }
  if (type == "comment"){
    var string = "<li id=\"view_com_style\"value =\""+postid+"\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"posted\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2></a><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
    return string;
  }
  return string;
};

function makeComBox(id){
   
    return string;
}

  function getpost(data,page,cookie){
    var url = "";
    if(page == "network"){
	url = "api/posts/" + data.postid;
    } else {
	url = "api/posts/";
}
    var request = $.ajax({
          method: "GET",
          url: url,
    });
  request.done(function (callback) {
      var postobj = callback;
      var github = global.cookie_setting.get("github");
	    var count = 0;
            //console.log(github);
      if(page == "home"){
        //console.log(postobj.posts[0].author.id);
        $.each(postobj.posts, function (i, value) { 
    			if(count < 100){
    				count++;
            var inner_request = $.ajax({
                  method: "GET",
                  url: "api/images/",
            });
            inner_request.done(function (callback) {
              var cont =0;
              var cont1 =0;
              $.each(callback.images, function (j, value) { 
                if(callback.images[j].parent_post == postobj.posts[i].url){
                    $.getJSON(callback.images[j].json_url, function(data1){
                      var st= setdynamic(data1.url,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                      $("#list_post_view").append(st);
                      });
                    cont =1;              
                }else{
                    cont1 =2;
                }          
              });
                if (cont == 0 && cont1 == 2){
                      var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                      $("#list_post_view").append(st);
                }
            });
            inner_request.fail(function (callback) {
            });

	         }
        });
      }
	     if(page == "network"){
		      var head  = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+data.userphoto+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1><i>'"+postobj.title + "'</i> by "+ postobj.username+"</h1></div><div class=\"well\"><p>" + postobj.content+ "</p></div></td></tr></table>";
		      $("#info").html(head);

                $.each(postobj.comments, function (i, value) {    
			                 count++;       
                      var st= setdynamic(data.userphoto,"Comment #" + count,postobj.comments[i].content,postobj.comments[i].date_created,postobj.comments[i].local_author.username,"comment",postobj.comments[i].local_author.username);
                      $("#list_com_view").append(st);
                });
            
        }
        if(page == "posted"){

            $.each(postobj.posts, function (i, value) { 
              console.log(postobj.posts[i].author.displayName);
              if(postobj.posts[i].author.displayName==data.username){
                if(count < 100){
                  count++;
                  var inner_request = $.ajax({
                        method: "GET",
                        url: "api/images/",
                  });
                  inner_request.done(function (callback) {
                    var cont =0;
                    var cont1 =0;

                    $.each(callback.images, function (j, value) { 
                      if(callback.images[j].parent_post == postobj.posts[i].url){
                          $.getJSON(callback.images[j].json_url, function(data1){
                            var st= setdynamic(data1.url,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                            $("#list_post_view").append(st);
                            });
                          cont =1;              
                      }else{
                          cont1 =2;
                      }          
                    });
                      if (cont == 0 && cont1 == 2){
                            var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                            $("#list_post_view").append(st);
                      }
                  });
                  inner_request.fail(function (callback) {
                  });

                 }
                 }
                });
              



          var request = $.ajax({
                  method: "GET",
                  url: github,
          });
          request.done(function (callback) {
                    console.log(callback)
                    var githubobj = callback;
                    $.each(githubobj, function (i, value) {

                        if (global.cookie_setting.get("click_id") == "undefined" ||global.cookie_setting.get("click_id") == "" || global.cookie_setting.get("click_id")== global.cookie_setting.get("userid")){
                            var st= setdynamic("/static/image/git.png",githubobj[i].type,githubobj[i].repo.name,githubobj[i].created_at,"github user - "+githubobj[i].actor.login,"git",global.cookie_setting.get("userid"));
                        }else{
                            var st= setdynamic("/static/image/git.png",githubobj[i].type,githubobj[i].repo.name,githubobj[i].created_at,"github user - "+githubobj[i].actor.login,"git",global.cookie_setting.get("click_id"));
                        }
                        $("#list_post_view").append(st);
                    });
                 });
          request.fail(function (callback) {
                    console.log(callback);
                 });
        }
        if(page == "otherpost"){
          $.each(postobj.posts, function (i, value) {
                if(data.username == postobj.posts[i].username){
                    //console.log();
                    console.log(postobj.posts[i].author.displayName);
              if(postobj.posts[i].author.displayName==data.username){
                if(count < 100){
                  count++;
                  var inner_request = $.ajax({
                        method: "GET",
                        url: "api/images/",
                  });
                  inner_request.done(function (callback) {
                    var cont =0;
                    var cont1 =0;

                    $.each(callback.images, function (j, value) { 
                      if(callback.images[j].parent_post == postobj.posts[i].url){
                          $.getJSON(callback.images[j].json_url, function(data1){
                            var st= setdynamic(data1.url,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                            $("#list_post_view").append(st);
                            });
                          cont =1;              
                      }else{
                          cont1 =2;
                      }          
                    });
                      if (cont == 0 && cont1 == 2){
                            var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                            $("#list_post_view").append(st);
                      }
                  });
                  inner_request.fail(function (callback) {
                  });

                 }
                }
              }
              });
        }




         });
  request.fail(function (callback) {
            console.log(callback);
         });
}

function makedate(date){
	date = date.replace("T"," ");
	date = date.split(".")[0];
	return date
}


global.load_posts= {
    posts_load:getpost
    
    

}



})(this);
