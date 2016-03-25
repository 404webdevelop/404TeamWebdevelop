(function (global) {

'use strict';




function makeComBox(id){
    return string;
}
function set_post_on(title,contant,username,img,page){
  var html_st = '<div class="panel panel-primary">\
              <div class="panel-heading">Post Object</div>\
              <div class="panel-body">\
                <div class="row" id="posted_item">\
                    <div class="col-md-5">\
                            <img class="img-responsive" src='+img+' alt="">\
                        </a>\
                    </div>\
                    <div class="col-md-7">\
                        <h3>'+title+'</h3>\
                        <h4> by: '+username+'</h4>\
                        <p>'+contant+'</p>\
                        <a class="btn btn-primary" href="http://blackrockdigital.github.io/startbootstrap-1-col-portfolio/#">View Post <span class="glyphicon glyphicon-chevron-right"></span></a>\
                    </div>\
                </div>\
              </div>\
            </div>\
            <hr>';
    var git_st='<div class="panel panel-success">\
          <div class="panel-heading"><strong>Git Activity</strong></div>\
          <div class="panel-body">\
            <div class="row" id="posted_item">\
                <div class="col-md-12">\
                    <h3>'+title+'</h3>\
                    <h4> by: '+username+'</h4>\
                    <p>'+contant+'</p>\
                </div>\
            </div>\
          </div>\
        </div>';

  if(page == 'home'){
    $('#home_page_list_view').append(html_st);
  }if(page == 'posted') {
    $('#posted_page_list_view').append(html_st);
  }if(page == 'git'){
    $('#git_page_list_view').append(git_st);
  }if(page == 'others'){
    $('#others_page_list_view').append(html_st);
  }
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
                      //var st= setdynamic(data1.url,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].published,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                       set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,page);
                      });
                    cont =1;              
                }else{
                    cont1 =2;
                }          
              });
                if (cont == 0 && cont1 == 2){
                      //var st= setdynamic(data.no_image,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].published,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                      set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page);
                }
                if (cont == 0 && cont1 == 0){
                      //var st= setdynamic(data.no_image,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].published,postobj.posts[i].username,"post",postobj.posts[i].author.id, postobj.posts[i].id, postobj.posts[i].comments);
                      set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page);
                }
            });
            inner_request.fail(function (callback) {
            });

           }
        });
      }
       if(page == "network"){
          var inner_request = $.ajax({
                  method: "GET",
                  url: "api/images/",
            });
          inner_request.done(function (callback) {
              var cont =0;
              var cont1 =0;
              $.each(callback.images, function (j, value) { 
                if(callback.images[j].parent_post == postobj.url){
                   var head  = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+callback.images[j].url+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1><i>'"+postobj.title + "'</i> by "+ postobj.username+"</h1></div><div class=\"well\"><p>" + postobj.content+ "</p></div></td></tr></table>";
                   console.log(postobj);
                   $("#info").html(head);
                   cont =1;
                   return false;
                }else{
                  cont1 =2;
                }
              });
              var img = "/static/image/no_image.jpg";
              if (cont == 0 && cont1 == 2){
                      var head  = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1><i>'"+postobj.title + "'</i> by "+ postobj.username+"</h1></div><div class=\"well\"><p>" + postobj.content+ "</p></div></td></tr></table>";
                   console.log(postobj);
                   $("#info").html(head);
                }
                if (cont == 0 && cont1 == 0){
                      var head  = "<table><tr><td id = \"holder\"><center><img id = \"user_file_image\"src=\""+img+"\"height=\"150\" width=\"150\">  </center>  </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td id=\"userintroduction\"><div class=\"page-header\"><h1><i>'"+postobj.title + "'</i> by "+ postobj.username+"</h1></div><div class=\"well\"><p>" + postobj.content+ "</p></div></td></tr></table>";
                      console.log(postobj);
                      $("#info").html(head);
                }


            });


                $.each(postobj.comments, function (i, value) {    
                       count++;       
                      var st= setdynamic(data.userphoto,"Comment #" + count,postobj.comments[i].content,postobj.comments[i].published,postobj.comments[i].local_author.username,"comment",postobj.comments[i].local_author.username);
                      $("#list_com_view").append(st);
                });
            
        }
        if(page == "posted"){

            $.each(postobj.posts, function (i, value) { 
              //console.log(postobj.posts[i].author.displayName);
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
                            set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,page);
                            });
                          cont =1;              
                      }else{
                          cont1 =2;
                      }          
                    });
                      if (cont == 0 && cont1 == 2){
                            set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page);
                            
                      }
                      if (cont == 0 && cont1 == 0){
                            set_post_on(postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page);
                            
                      }
                  });
                  inner_request.fail(function (callback) {
                  });

                 }
                 }
                });
        }

        if(page =="git"){
          var request = $.ajax({
                  method: "GET",
                  url: github,
          });
          request.done(function (callback) {
                    //console.log(callback)
                    var githubobj = callback;
                    $.each(githubobj, function (i, value) {
                        set_post_on(githubobj[i].repo.name,githubobj[i].type,githubobj[i].created_at,"",page);
                    });
                 });
          request.fail(function (callback) {
                    console.log(callback);
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
       	date = date.replace("Z"," ");
	return date
}


global.load_posts= {
    posts_load:getpost,
    set_on:set_post_on
    
    

}



})(this);
