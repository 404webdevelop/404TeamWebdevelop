(function (global) {

'use strict';


function setdynamic(img,tit,tex,date,author,type,id,url,comments){
  if (type == "git"){
    var string = "<li id=\"view_list_style\" value =\""+id+"\"class=\"ui-btn ui-btn-b ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
    return string;
  }
  if (type == "post"){
    var string = "<li id=\"view_list_style\"value =\""+id+"\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p></a><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a><button class='commentnav' style='position:relative;float:right;top:-5px;' onClick='window.location.href=" + url + "'>" + comments.length+ " Comments</button></div>&nbsp;</div></li>"
    return string;
  }
  if (type == "comment"){
    var string = "<li id=\"view_list_style\"value =\""+id+"\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+makedate(date)+"]</span></h2></a><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
    return string;
  }
  return string;
};

  function getpost(data,page,cookie){
    var url = "api/posts/";
    var request = $.ajax({
          method: "GET",
          url: url,
  });
  request.done(function (callback) {
            var postobj = callback;
            var github = global.cookie_setting.get("github");
            //console.log(github);
            if(page == "home"){
                //console.log(postobj.posts[0].author.id);
                $.each(postobj.posts, function (i, value) {             
                        var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].url, postobj.posts[i].comments);
                        $("#list_post_view").append(st);
                });
            }
	    if(page == "network"){
		var count = 0;
                //console.log(postobj.posts[0].author.id);
                $.each(postobj.posts, function (i, value) {    
			count++;       
                        var st= setdynamic(data.userphoto,"Comment #" + count,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"comment",postobj.posts[i].author.id);
                        $("#list_post_view").append(st);
                });
            }
            if(page == "posted"){
                $.each(postobj.posts, function (i, value) {
                    if(data.username == postobj.posts[i].username){
                        var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].url, postobj.posts[i].comments);
                        console.log(postobj.posts[0].author.github);
                        $("#list_post_view").append(st);
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

                        var st= setdynamic(data.userphoto,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].date_created,postobj.posts[i].username,"post",postobj.posts[i].author.id);
                        //console.log(postobj.posts[0].author.github);
                        $("#list_post_view").append(st);
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