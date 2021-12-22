/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1639316897884
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1639403297884
  }
];

const escapeCode = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {

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

  renderTweets(data);
  $('#tweet-text').on('focus', function() {
    $('.error').css('display', 'none');
  })

  $('#newTweetForm').on('submit', function(e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $('#tweet-text').val().length;
    if (tweetLength === 0) {
      // console.log("length:",tweetLength)
      // console.log("errorText:",$('.error p').text())
      $('.error p').text("Your tweet is empt_");
      // console.log("errorText:",$('.error p').text())
      $('.error').css('display', 'flex');
      return
    } else if (tweetLength > 140) {
      $('.error p').text(`&nbspYour tweet is tooooooo looooooooooong!!!! `);
      $('.error').css('display', 'flex');
      return
    } else {
      $.post("/tweets", serializedData)
      .then(() => {
        $('#tweet-text').val("");
        $('.new-tweet .counter').val(0);
        loadTweets();
      })
    }
    
  });

  const loadTweets = function() {

    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/tweets",
      success: tweets => {
        renderTweets(tweets);
      }
    });

  };

  loadTweets();

  

});