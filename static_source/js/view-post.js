(function () {
'use strict';

var url = "/api/posts/4403dffc-dbc2-4c3b-a387-d569826e4602/",
    converter = new showdown.Converter();

function handleError(XMLHttpRequest, textStatus, errorThrown) {
  for (var key in XMLHttpRequest.responseJSON) {
    var message = XMLHttpRequest.responseJSON[key];
    displayErrorMsg(key + ': ' + message);
  }
}

function displayErrorMsg(message) {
  console.log(message);
}

function fetchPost(postUrl) {
  $.getJSON(postUrl, function (data) {
    console.log(data);
    var author   = data.username,
        title    = data.title,
        content  = data.content,
        html     = converter.makeHtml(content),
        comments = data.comments;

    $('#post-title').html(title);
    $('#post-author').html(author);
    $('#post-content').html(html);
    $.each(comments, function (index) {
      var comment = comments[index],
          poster = comment.author.displayName,
          content = comment.comment,
          date = comment.published;
      addCommentToView(poster, content, date);
    });
  });
}

function addCommentToView(poster, content, date) {
  var html =
   '<div class="comment"> \
      <div class="poster">' + poster + '</div> \
      <div class="published">' + date + '</div> \
      <div class="content">' + content + '</div> \
    </div>';
  $('#comments_list').append(html);
}

function commentSuccess(res, statusText, xhr, $form) {
  addCommentToView(res.author.displayName, res.content, '');
  console.log(res);
}

function setup() {
  $('#comment-form').attr('action', url + 'comments/');
  $('#comment-form').ajaxForm({
    success:        commentSuccess  // post-submit callback
   ,error:          handleError
  });
}

$(document).ready(function () {
  setup();
  fetchPost(url);
});

})();

/*
{
    "id": "fb1eb88c-7850-47ae-949d-0c66b6d34bb8",
    "url": "http://localhost:8000/api/posts/fb1eb88c-7850-47ae-949d-0c66b6d34bb8/",
    "title": "mysql",
    "content": "# this is a h1",
    "published": "2016-03-22T05:04:14.928142Z",
    "privacy_level": "pub",
    "privacy_host_only": false,
    "comments": [],
    "comments_list": "http://localhost:8000/api/posts/fb1eb88c-7850-47ae-949d-0c66b6d34bb8/comments/",
    "username": "yushi",
    "source": "http://localhost:8000/api/posts/fb1eb88c-7850-47ae-949d-0c66b6d34bb8/",
    "origin": "http://localhost:8000/api/posts/fb1eb88c-7850-47ae-949d-0c66b6d34bb8/"
}
*/
