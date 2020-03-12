$(function() {
    
    var ref = new Firebase("https://perfect-sense-blog-7f989.firebaseio.com");
    var postRef = ref.child(slugify(window.location.pathname));

    postRef.on("child_added", function(snapshot) {
        var newPost = snapshot.val();
        $(".comments").prepend('<div class="comment">' +
        '<h4>' + escapeHtml(newPost.name) + '</h4>' +
        '<div class="profile-image"><img src="http://www.gravatar.com/avatar/' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
        '' + moment(newPost.postedAt).fromNow() + '<p>' + escapeHtml(newPost.message)  + '</p></div>');
    });

    $("#comment").submit(function() {
        postRef.push().set({
            name: $("#name").val(),
            message: $("#message").val(),
            md5Email: md5($("#email").val()),
            postedAt: Firebase.ServerValue.TIMESTAMP
        });
        $("input[type=text], textarea").val("");
        return false;
    });
});

function slugify(text) {
    return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

    

/*
$.getScript('https://www.gstatic.com/firebasejs/3.4.0/firebase.js', function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCUgInLkvSSPDqkczj7vURBP8tyPBpOVKA",
        authDomain: "perfect-sense-blog-7f989.firebaseapp.com",
        databaseURL: "https://perfect-sense-blog-7f989.firebaseio.com",
        projectId: "perfect-sense-blog-7f989",
        storageBucket: "perfect-sense-blog-7f989.appspot.com",
    };
    firebase.initializeApp(config);

    //New reference for comments
    var rootRef = firebase.database().ref();
    var postComments = rootRef.child('postComments');


    //Post Identity
    var link = $("link[rel='canonical']").attr("href");
    var pathkey = decodeURI(link.replace(new RegExp('\\/|\\.', 'g'),"_"));
    var postRef = postComments.child(pathkey);

    //Override the default submit action in JavaScript
    $("#comment").submit(function() {
        postRef.push().set({
            name: $("#name").val(),
            message: $("#message").val(),
            md5Email: md5($("#email").val()),
            postedAt: firebase.database.ServerValue.TIMESTAMP
      });
    
      $("input[type=text], textarea").val("");
      return false;
    });

    postRef.on("child_added", function(snapshot) {
        var newComment = snapshot.val();
        
        // Markdown into HTML
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        var markedMessage = converter.makeHtml(newComment.message);
        
        // HTML format
        var html = "<div class='comment'>";
        html += "<h4>" + newComment.name + "</h4>";
        html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.md5Email + "?s=100&d=retro'/></div>";
        html += "<span class='date'>" + jQuery.timeago(newComment.postedAt) + "</span>"
        html += "<p>" + markedMessage  + "</p></div>";
        
        $("#comments-container").prepend(html);
    });
    */

