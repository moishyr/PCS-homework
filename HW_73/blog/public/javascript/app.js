/* global $ */
(function () {
    'use strict';

    const commentsDiv = $('.commentsDiv span'),
        addCommentButton = $('.addComment');


    commentsDiv.click(() => {
        let selectedPost = $(event.target),
            outerDivId = $(selectedPost.parents('.outerPostDiv')).attr('id'),
            commentContainer = $('#commentContainer' + outerDivId),
            myDisplay = commentContainer.css('display');

        if (myDisplay !== 'none') {
            commentContainer.hide();
            selectedPost.html('click here to show comments');
        } else {
            commentContainer.show();
            selectedPost.html('click here to hide comments');
        }
    });

    addCommentButton.click(() => {
        var theTarget = $(event.target);
        if(theTarget.siblings('form').css('display') !== 'none') {
            theTarget.siblings('form').hide();
        } else {
            theTarget.siblings('form').show();
        }
    });
}());