(function (global) {

'use strict';

var cookie = global.cookie_setting;
var clicks = global.button_click;

var uploadFrame = document.getElementsByName('upload_frame')[0];

function handleResponseReceived() {
    console.log('this should be called when the form finishes upload and respone is committed');
}

if (uploadFrame.addEventListener) {
    uploadFrame.addEventListener('load', handleResponseReceived, false);
}
else {
    uploadFrame.attachEvent('onload', handleResponseReceived);
}

handleResponseReceived();
clicks.clickbtn(cookie);

})(this);
