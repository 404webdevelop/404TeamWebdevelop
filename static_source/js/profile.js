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

function success(res, statusText, xhr, $form) {
  console.log(res);
}

function handleError(XMLHttpRequest, textStatus, errorThrown) {
  for (var key in XMLHttpRequest.responseJSON) {
    var message = XMLHttpRequest.responseJSON[key];
    displayErrorMsg(key + ': ' + message);
  }
}

function setup() {
    $('#image-form').ajaxForm({ 
      success:        success  // post-submit callback
     ,error:          handleError
    });
    $('#author-form').ajaxForm({
      success:        success  // post-submit callback
     ,error:          handleError
    });
}

$(document).ready(function () {
  setup();
});

})();