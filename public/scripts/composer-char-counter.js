$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const value = $(this).val();
    let counter;
    if (value.length > 140) {
      counter = (value.length - 140) * -1;
      $(this).siblings().children('.counter').css('color', 'red');
    } else {
      $(this).siblings().children('.counter').css('color', 'black');
      counter = 140 - value.length;
    }
    $(this).siblings().children('.counter').text(counter);

  });
});