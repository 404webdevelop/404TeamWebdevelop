(function (global) {
'use strict';

var PostList = global.PostList;

function setup() {
    $('#new-post').submit(function (event) {
        console.log(123);
        event.preventDefault();
        PostList.reload();
    });
}

setup();

})(this);