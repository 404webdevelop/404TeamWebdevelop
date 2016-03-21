(function () {
'use strict';

var postUrl = '';

function findFormData(formData, name) {
  return formData.find(function (data) {
    return data.name === name;
  });
}

function displayErrorMsg(message) {
  console.log(message);
}

function prepareImage(formData, jqForm, options) {
  var parent = findFormData(formData, 'parent_post');
  parent.value = postUrl;
  console.log(formData);
}

function imageSuccess(res, statusText, xhr, $form) {
  console.log(res);
  setTimeout(function(){
      window.location.href = "posted";
    },0
  ); 
}

function postSuccess(res, statusText, xhr, $form) {
  console.log(res);
  postUrl = res.url;
  console.log(postUrl);

 $('#image-form').ajaxSubmit({
    beforeSubmit:   prepareImage
   ,success:        imageSuccess  // post-submit callback
   ,error:          handleError
  });
}

function handleError(XMLHttpRequest, textStatus, errorThrown) {
  for (var key in XMLHttpRequest.responseJSON) {
    var message = XMLHttpRequest.responseJSON[key];
    displayErrorMsg(key + ': ' + message);
  }
}

function setup() {
    $('#post-form').ajaxForm({ 
      success:        postSuccess  // post-submit callback
     ,error:          handleError
    });
     
}

$(document).ready(function () {
  setup();
  
});

})();