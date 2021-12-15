/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweet =   {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1639316897884
// };

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

$(document).ready(() => {

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweets').append($tweet);
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
        <p class="tweet-content">${tweet.content.text}</p>
        <footer>
          <p>${tweet.created_at}</p>
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


});