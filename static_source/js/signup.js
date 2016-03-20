(function () {
'use strict';

function adjustLineHeight() {
  var height = '' + $(window).height() + 'px';
  $('body').css("line-height", height);
}

function findFormData(formData, name) {
  return formData.find(function (data) {
    return data.name === name;
  });
}

function displayErrorMsg(message) {
  $('#error-msg-container').append(message);
}

function validate(formData, jqForm, options) {
  $('#error-msg-container').html('');
  var pw = findFormData(formData, "password"),
      repeat = findFormData(formData, "repeat-password");
  if (pw.value !== repeat.value) {
    displayErrorMsg("Please make sure your password are the same.")
    return false;
  }
}

function postSingup(responseText, statusText, xhr, $form) {
  $('#post-signup-dialog').show();
  $('#signup-form').hide();
}

function handleError(XMLHttpRequest, textStatus, errorThrown) {
  for (var key in XMLHttpRequest.responseJSON) {
    var message = XMLHttpRequest.responseJSON[key];
    displayErrorMsg('<p>' + key + ': ' + message + '</p>');
  }
}

function setup() {
    adjustLineHeight();
    $(window).resize(function() {
      adjustLineHeight();
    });

    $('#signup-form').ajaxForm({ 
      beforeSubmit:   validate
     ,success:        postSingup  // post-submit callback
     ,error:          handleError
    }); 
}

$(document).ready(function () {
  setup();
});

})();