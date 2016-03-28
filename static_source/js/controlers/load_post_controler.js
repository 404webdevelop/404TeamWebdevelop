(function (global) {

'use strict';

function makeComBox(id){
    return string;
}

function set_com_on(id,title,contant,username,img,page,have_image){
  var comment_st='  <div class="panel panel-primary"><div class="panel-heading">'+username+'</div><div class="panel-body"> <div class="row" id="posted_item"> <div class="col-md-10">  <p>'+contant+'</p> </div> <div class="col-md-2">    <img src="/static/image/noiamge.gif" class="img-circle" alt="Cinque Terre" width="100" height="100">  </div>  </div> </div>  </div>';


    $('#comment_page_list_view').append(comment_st);
  
}
function set_post_on(id,title,contant,username,img,page,have_image){
  if(have_image == "yes"){
    var html_st = '<div class="panel panel-primary">\
              <div class="panel-heading">Post Object</div>\
              <div class="panel-body">\
                <div class="row" id="posted_item">\
                    <div class="col-md-5">\
                            <img class="img-responsive" src='+img+' alt="">\
                        </a>\
                    </div>\
                    <div class="col-md-7">\
                        <h3> Title: '+title+'</h3>\
                        <h4> Post by: '+username+'</h4>\
                        <p>'+contant+'</p>\
                        <li value ='+id+' ><button class="btn btn-primary clicked_post" >View Post <span class="glyphicon glyphicon-chevron-right"></span></button></li>\
                    </div>\
                </div>\
              </div>\
            </div>\
            <hr>';
  }else{
    var html_st = '<div class="panel panel-primary">\
          <div class="panel-heading"><strong>Post Object</strong></div>\
          <div class="panel-body">\
            <div class="row" id="posted_item">\
                <div class="col-md-12">\
                    <h3>Title: '+title+'</h3>\
                    <h4>Post by: '+username+'</h4>\
                    <p>'+contant+'</p>\
                    <li value ='+id+' ><button class="btn btn-primary clicked_post" >View Post <span class="glyphicon glyphicon-chevron-right"></span></button></li>\
                </div>\
            </div>\
          </div>\
        </div>';
    }
    var git_st='<div class="panel panel-success">\
          <div class="panel-heading"><strong>Git Activity</strong></div>\
          <div class="panel-body">\
            <div class="row" id="posted_item">\
                <div class="col-md-12">\
                    <h3>Title: '+title+'</h3>\
                    <h4> Post by: '+username+'</h4>\
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
    var url = "api/posts/";
    var request = $.ajax({
          method: "GET",
          url: url,
    });
  request.done(function (callback) {
      var postobj = callback;
      var github = global.cookie_setting.get("github");
      if(page == "home"){
        $.each(postobj.posts, function (i, value) { 
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
                     set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,page,"yes");
                    });
                  cont =1;              
              }else{
                  cont1 =2;
              }          
            });
              if (cont == 0 && cont1 == 2){
                    set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page,"no");
              }
              if (cont == 0 && cont1 == 0){
                    set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page,"no");
              }

          });
          inner_request.fail(function (callback) {
          });
        });
      }
      if(page == "posted"){
          $.each(postobj.posts, function (i, value) { 
            if(postobj.posts[i].author.displayName==data.username){
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
                          set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,page,"yes");
                          });
                        cont =1;              
                    }else{
                        cont1 =2;
                    }          
                  });
                    if (cont == 0 && cont1 == 2){
                          set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page,"no");
                          
                    }
                    if (cont == 0 && cont1 == 0){
                          set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data.no_image,page,"no");
                          
                    }
                });
                  inner_request.fail(function (callback) {
                });
             }
            });
      }
      if(page =="git"){
        var request = $.ajax({
                method: "GET",
                url: github,
        });
        request.done(function (callback) {
                  var githubobj = callback;
                  $.each(githubobj, function (i, value) {
                      set_post_on("",githubobj[i].repo.name,githubobj[i].type,githubobj[i].created_at,"",page,"git");
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

function load_other_posts(other){
  var url = "api/posts/";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  var no_iamge="/static/image/no_image.jpg";
  request.done(function (callback) {
    var postobj = callback;
      $.each(postobj.posts, function (i, value) { 
        if(postobj.posts[i].author.displayName==other){
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
                      set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,data1.url,'others',"yes");
                      });
                    cont =1;              
                }else{
                    cont1 =2;
                }          
              });
                if (cont == 0 && cont1 == 2){
                     set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,no_iamge,'others',"no");
                      
                }
                if (cont == 0 && cont1 == 0){
                      set_post_on(postobj.posts[i].id,postobj.posts[i].title,postobj.posts[i].content,postobj.posts[i].username,no_iamge,'others',"no");
                      
                }
            });
            inner_request.fail(function (callback) {
            });
           }
      });
    });
  request.fail(function (callback) {
    console.log(callback);
    });
}
function load_comments(posted_id){
  var url = "api/posts/"+posted_id+"/";
  var request = $.ajax({
          method: "GET",
          url: url,
        });
  var no_iamge="/static/image/no_image.jpg";
  request.done(function (callback) {
    var postobj = callback;
       global.cookie_setting.set("com_lhost", postobj.local_author);
      global.cookie_setting.set("com_hurl",postobj.author.host);
      set_com_header(postobj.title,postobj.username,postobj.content);
      $.each(postobj.comments, function (i, value) { 
                     set_com_on(postobj.id,postobj.comments[i].title,postobj.comments[i].content,postobj.comments[i].author.username,no_iamge,'others',"no");   
           });});
 request.fail(function (callback) {
    console.log(callback);
    });
};

function set_com_header(title, author, content){
    $('#comtitle').append(title + " - by " + author);
    $('#combody').append(content);
}
    
  


function setother_header(url){
    var request = $.ajax({
          method: "GET",
          url: url,
        });
    request.done(function (callback) {
    var img = callback.picture;
    if(img == undefined || img == 'undefined' || img == null){
        $('#other_div1').html('<img src="/static/image/noiamge.gif" class="img-circle" alt="Cinque Terre"  width="100" height="100">');
     }else{
        $('#other_div1').html('<img src='+img+' class="img-circle" alt="Cinque Terre"  width="100" height="100">');
     }
      $('#other_div2').html('<h1>'+callback.first_name+' '+callback.last_name+'<h1>');
    });
  request.fail(function (callback) {
    console.log(callback);
    });

};




function makedate(date){
	date = date.replace("T"," ");
	date = date.split(".")[0];
       	date = date.replace("Z"," ");
	return date
}

global.load_posts= {
    posts_load:getpost,
    posts_load_other:load_other_posts,
    set_other:setother_header,
    comment_load:load_comments,

}



})(this);
