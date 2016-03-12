(function (global) {

'use strict';

// Variable to store your files
var files;

// Add events
$('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
function prepareUpload(event) {
  files = event.target.files;
}

function uploadFiles(event) {
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    // START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append(key, value);
    });
    data.append('user', user.username);

    $.ajax({
        url: '/api/authors/3/profile_picture/',
        type: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Token ' + global.token);
        },
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            if(typeof data.error === 'undefined') {
                // Success so call function to process the form
                console.log(data);
            } else {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log(jqXHR);
            // STOP LOADING SPINNER
        }
    });
}

$('#ajax-post').on('click', uploadFiles);

})(this);