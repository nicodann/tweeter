/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeCode = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {

  $('section.tweets').empty();

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('section.tweets').prepend($tweet);
  }

};

const createTweetElement = function(tweet) {

  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="avatarName">
          <img src="${tweet.user.avatars}" alt="Avatar Picture">
          <p>${tweet.user.name}</p>
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>
      <p class="tweet-content">${escapeCode(tweet.content.text)}</p>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet;

};

$('#tweet-text').on('focus', function() {
  $('.error').css('display', 'none');
});

const loadTweets = function() {

  $.ajax({
    method: "GET",
    dataType: "json",
    url: "/tweets",
    success: tweets => {
      renderTweets(tweets);
    }
  }).then(function() {
    $('.tweet').hover(
      function() {
        $(this).find('.icons').css('display', 'inline');
      },
      function() {
        $(this).find('.icons').css('display', 'none');
      }
      // function() {
      //   $('.icons').css('display', 'inline');
      // },
      // function() {
      //   $('.icons').css('display', 'none');
      // }
    );
  });

};

$(document).ready(function() {

  $('#newTweetForm').on('submit', function(e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $('#tweet-text').val().length;
    if (tweetLength === 0) {
      $('.error p').text("Your tweet is empt_"),
      $('.error').css('display', 'flex');
      return;
    } else if (tweetLength > 140) {
      $('.error p').text(` Your tweet is tooooooo looooooooooong!!!! `);
      $('.error').css('display', 'flex');
      return;
    } else {
      $.post("/tweets", serializedData)
        .then(() => {
          $('#tweet-text').val("");
          $('.new-tweet .counter').val(140);
          loadTweets();
        });
    }

  });

  $('#tweet-text').on('focus', function() {
    $('.error').css('display', 'none');
  });

  $('.navRight').hover(
    function() {
      $('.navRight').css('outline', 'solid thin lightgrey');
    },
    function() {
      $('.navRight').css('outline', 'none');
    }
  );

  $('.navRight').on('click', function() {
    const scrollPos = $(window).scrollTop();
    if (scrollPos === 0) {
      $('.new-tweet').toggle(400);
    } else {
      $('.new-tweet').show(400);
    }
    $('html, body').animate({
      scrollTop: $("html,body").offset().top
    }, 500);
  });

  loadTweets();

});