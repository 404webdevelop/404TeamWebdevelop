(function (global) {
'use strict';

var validator = global.validate,
    formHelper = global.form,
    view = {},
    model = {};
    // post = undefined,
    // images = [];

function init() {
  model.images = [];
  view.msgDisplayer = $('#msg-feedback-displayer');

  view.postForm = $('#post-form');
  view.newPostBtn = $('#post-btn');
  view.updatePostBtn = $('#update-btn');
  view.postTitle = $('#post-title');
  view.postType = $('#post-type');
  view.postCotnent = $('#post-content');
  view.postPrivacy = $('#post-privacy');
  view.postLocalHostOnly = $('#post-local');
  view.postTips = $('#post-tips');

  view.imageForm = $('#image-form');
  formHelper.setLogger(showMsg);
}

function loadPost(loadCallback, errorCallback) {
  var hash = location.hash.substring(1, 999),
      postID = hash.split('/').filter(validator.notEmpty)[0];
  if (postID === undefined) {
    errorCallback();
    return;
  }
  $.getJSON('/api/posts/' + postID, function (data) {
    if (data.detail && data.detail === "Not found") {
      return errorCallback();
    }
    loadCallback(data);
  });
}

function setup() {
  loadPost(function (data) {
    // load post, edit mode
    model.post = data;

    updateView();
  }, function () {
    // can not load post, new post mode
    updateView();
  });
}

function updateView() {
  if (model.post === undefined) {
    view.newPostBtn.show();
    view.postTips.show();
    view.updatePostBtn.hide();
    view.updatePostBtn.unbind('click');
      view.postForm.ajaxForm({ 
      success:        postSuccess
     ,error:          formHelper.error
    });

  } else {
    view.newPostBtn.hide();
    view.postTips.hide();
    view.updatePostBtn.show();
    view.updatePostBtn.click(updatePost);
    view.imageForm.css('display', 'block');
    view.imageForm.ajaxForm({
      beforeSubmit:   prepareImage
     ,success:        imageSuccess
     ,error:          formHelper.error
    });
    bindModel();
  }
}
function back_btn(){
  $("#check_back").click(function(){
    setTimeout(function(){
        window.location.href = "/";
      },0
        );  
  });
}

function bindModel() {
  if (model.post === undefined) {
    console.error('post undefined, should not reach here');
    return;
  }
  view.postTitle.text(model.post.title);
  view.postType.val(model.post.contentType);
  view.postCotnent.text(model.post.content);
  view.postPrivacy.val(model.post.privacy_level);
  view.postLocalHostOnly.val(model.post.privacy_host_only);
}

function showMsg(message) {
  view.msgDisplayer.css('display', 'block');
  view.msgDisplayer.text(message);
}

function prepareImage(formData, jqForm, options) {
  if (model.post === undefined) {
    return false;
  }
  var parent = formHelper.findData(formData, 'parent_post');
  parent.value = model.post.url;
  return true;
}

function imageSuccess(res, statusText, xhr, $form) {
  model.images.push(res);
  if (model.post.contentType === "text/x-markdown") {
    var markdown = '\n![cotent_description](' + res.url + ')\n';
    view.postCotnent.val(view.postCotnent.val() + markdown);
    view.imageForm.resetForm();
    updatePost(function (data) {
      showMsg('Successfully uploaded the image and udpate post!');
    });
  } else {
    updatePost(function (data) {
      showMsg('Your image is uploaded, but in plain text mode, your image may not link to your post');
    });
  }
}

function postSuccess(res, statusText, xhr, $form) {
  if (model.post === undefined) {
    // init a post
    model.post = res;
    updateView();
  } else {
    // edit a post
  }
  showMsg('Successfully made a new post!');
}

function updatePost(callback) {
  callback = callback || function () {};
  if (model.post === undefined) {
    console.error('post is undefined, can not update');
    return;
  }
  model.post.title = view.postTitle.val();
  model.post.content = view.postCotnent.val();
  $.ajax({
    type:"PUT",
    url: model.post.url,
    data: model.post,
    success: function (data, textStatus, jqXHR) {
      showMsg('Successfully updated the post!');
      callback(data, textStatus, jqXHR);
    },
    error: function (jqXHR, textStatus, error) {
      showMsg('error:' + textStatus);
    }
  });
}


init();
$(document).ready(function () {
  $("#post_select").hide();
  back_btn();
  setup();
});

})(this);