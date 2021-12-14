$(document).ready(() => {
  let count = 0;
  $('#tweet-text').on('input', function(e) {
    const value = $(this).val();
    let counter;
    if (value.length > 140) {
      counter = (value.length - 140) * -1;
      $(this).siblings().children('.counter').css('color', 'red');
    } else {
      $(this).siblings().children('.counter').css('color', 'black');
      counter = value.length;
    }
    $(this).siblings().children('.counter').text(counter);

  })
})

// a;oseruhg382ha;sdkjvaxcmnva;ksjhfa;oweuhpfaousihdg;akjshd;fakjsdhf;ajsdhf;ajsdhg;ajseh;gowuiheoauhdf;ajhdsf;jahsd;lfkajs;dgjhe;ihga;;;aslkd