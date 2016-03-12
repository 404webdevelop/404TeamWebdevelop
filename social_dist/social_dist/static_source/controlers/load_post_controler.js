(function (global) {

'use strict';

function setdynamic(img,tit,tex,date,author){
  var string = "<li id=\"view_list_style\" class=\"ui-btn ui-li ui-li-has-thumb  ui-btn-up-c\"  ><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" href=\"#\"><img  style='height:2em;width:2em;' id=\"imagetag\"class=\"ui-li-thumb\" src=\""+img+"\"><p style='display:inline;float:left;position:relative;left:3em'> by "+author+"</p><h2 style='display:inline;' class=\"ui-li-heading\">\""+tit+"\"</a>&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp<span id=\"test\">["+date+"]</span></h2><p class=\"ui-li-desc\" style='white-space:normal;'>"+tex+"</p></a></div>&nbsp;</div></li>"
  return string;
};

function getpost(friends_url,data,page){
  var url = "api/post/posts/";
  var request = $.ajax({
          method: "GET",
          url: url,
  });
  request.done(function (callback) {
            //console.log(callback);
            console.log(callback);
            var postobj = callback;



            if(page == "posted"){
	            $.each(postobj, function (i, value) {
	              if (postobj[i].author == data.url){
	                //var data = {};
	                $.getJSON(postobj[i].author,function(data){
	                    console.log("that"+i+"f   ="+postobj[i].author);
	                    console.log("that"+i+"f   ="+postobj[i].title);
	                    console.log("that"+i+"f   ="+postobj[i].content);
	                    console.log("that"+i+"f   ="+postobj[i].date_created);
	                   
	                    data = data.username;
	                    console.log("this"+i+"f   ="+data);
	                    var st= setdynamic("/static/image/Yu.jpg",postobj[i].title,postobj[i].content,postobj[i].date_created,data);
	                    $("#list_post_view").append(st);
	                });
	              }
	            });
            }

            if(page == "home"){
	            $.each(postobj, function (i, value) {
	              if (postobj[i].author == friends_url){
	                var data = {};
	                $.getJSON(postobj[i].author,function(data){
	                    data = data.username;
	                    var st= setdynamic("/static/image/Yu.jpg",postobj[i].title,postobj[i].content,postobj[i].date_created,data);
	                    $("#list_post_view").append(st);
	                });
	              }
	            });
            }
            





         });
  request.fail(function (callback) {
            //console.log(callback);
            console.log(callback);
         });
}


global.load_posts= {
	posts_load:getpost
	

}



})(this);