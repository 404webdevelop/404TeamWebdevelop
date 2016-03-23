(function (global) {

'use strict';


function set_post_on(){
	$('#home_page_list_view').append('<div class="panel panel-primary">\
              <div class="panel-heading">Post Object</div>\
              <div class="panel-body">\
                <div class="row" id="posted_item">\
                    <div class="col-md-5">\
                        <a href="http://blackrockdigital.github.io/startbootstrap-1-col-portfolio/#">\
                            <img class="img-responsive" src="./1 Col Portfolio - Start Bootstrap Template_files/700x300" alt="">\
                        </a>\
                    </div>\
                    <div class="col-md-7">\
                        <h3>Project Four</h3>\
                        <h4>Subheading</h4>\
                        <p>\
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?\
                        </p>\
                        <a class="btn btn-primary" href="http://blackrockdigital.github.io/startbootstrap-1-col-portfolio/#">View Post <span class="glyphicon glyphicon-chevron-right"></span></a>\
                    </div>\
                </div>\
              </div>\
            </div>\
            <hr>');
}




function setup(){
	$('#home_page').click(function(){
        $("#home").show(800);
		$("#posted").hide();
		$("#follow_btn").hide();
		$("#other_posted").hide();
		$("#friends").hide();
		$("#git").hide();
		$("#profile").hide();
    });
    $('#posted_page').click(function(){
        $("#home").hide();
		$("#posted").show(800);
		$("#follow_btn").hide();
		$("#other_posted").hide();
		$("#friends").hide();
		$("#git").hide();
		$("#profile").hide();
    });
    $('#other_page').click(function(){
        $("#home").hide();
		$("#posted").hide();
		$("#follow_btn").hide();
		$("#other_posted").show(800);
		$("#friends").hide();
		$("#git").hide();
		$("#profile").hide();
    });
    $('#friends_page').click(function(){
        $("#home").hide();
		$("#posted").hide();
		$("#follow_btn").hide();
		$("#other_posted").hide();
		$("#friends").show(800);
		$("#git").hide();
		$("#profile").hide();
    });
    $('#git_page').click(function(){
        $("#home").hide();
		$("#posted").hide();
		$("#follow_btn").hide();
		$("#other_posted").hide();
		$("#friends").hide();
		$("#git").show(800);
		$("#profile").hide();
    });
    $('#profile_page').click(function(){
        $("#home").hide();
		$("#posted").hide();
		$("#follow_btn").hide();
		$("#other_posted").hide();
		$("#friends").hide();
		$("#git").hide();
		$("#profile").show(800);
    });

    $('#display_follower').click(function(){
    	$("#follower_list").show(800);
		$("#following_list").hide();
		$("#friends_list").hide();
		$("#fof_list").hide();
		$("#search_list").hide();
        
    });
    $('#display_following').click(function(){
    	$("#follower_list").hide();
		$("#following_list").show(800);
		$("#friends_list").hide();
		$("#fof_list").hide();
		$("#search_list").hide();
        
    });
    $('#display_friends').click(function(){
    	$("#follower_list").hide();
		$("#following_list").hide();
		$("#friends_list").show(800);
		$("#fof_list").hide();
		$("#search_list").hide();
        
    });
    $('#display_fof').click(function(){
    	$("#follower_list").hide();
		$("#following_list").hide();
		$("#friends_list").hide();
		$("#fof_list").show(800);
		$("#search_list").hide();
        
    });
    $('#display_search').click(function(){
    	$("#follower_list").hide();
		$("#following_list").hide();
		$("#friends_list").hide();
		$("#fof_list").hide();
		$("#search_list").show(800);
        
    });
    $('#search_button').click(function(){
        $("#search_result_fild").show(800);
    });
};




$( document ).ready(function() {
	$("#home").show();
	$("#posted").hide();
	$("#follow_btn").hide();
	$("#other_posted").hide();
	$("#friends").hide();
	$("#git").hide();
	$("#profile").hide();
	$("#follower_list").show();
	$("#following_list").hide();
	$("#friends_list").hide();
	$("#fof_list").hide();
	$("#search_list").hide();
	$("#search_result_fild").hide();


	setup();
	set_post_on();


});

})(this);