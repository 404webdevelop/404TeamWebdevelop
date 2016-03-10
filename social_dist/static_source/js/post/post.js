(function (global) {
'use strict';

function fetchPosts(callback) {
    var url = '/api/post/posts/';
    $.getJSON(url, function (data) {
        callback(data);
    });
}

function makeListCell(post) {
    var html = '\
        <li class="list-cell">\
            <div class="title">' + post.title + '</div>\
            <div><span class="author">' + post.author + '</span>\
            <span class="date">' + post.date_created + '</span></div>\
        </li>';

    $('#post-container').append(html);
}

function reload() {
    fetchPosts(function (data) {
        $.each(data, function (index, post) {
            console.log(post);
            makeListCell(post);
        });
    }); 
}

function setup() {
    $(document).ready(function () {
        reload();
    });
}

setup();

global.PostList = {
    reload: reload
};

})(this);