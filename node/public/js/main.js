$(function() {
  var ref = new Firebase('https://poofytoo.firebaseio.com/infoloungelet');

  // Force Reset Page
  ref.child('refresh').on('value', function(s) {
    console.log(s.val());
    if (s.val() == 1) {
      ref.child('refresh').set(0);
      location.reload();
    }
  })

  var action = function() {
    slideOverlay();
  }

  var randomColor = function() {
    var colors = ['green', 'purple', 'blue', 'pink', 'white'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  var randomGreeting = function() {
    var greetings = ['HELLO!', 'HI!'];
    if (Math.random() < 0.1) {
      return greetings[1];
    } else {
      return greetings[0];
    }
  }

  var slideOverlay = function() {
    var dir = Math.random() > 0.5 ? 'HOR' : 'VER';
    var fValue = dir == 'VER' ? $(document).height() : $(document).width();

    $('.a1').clone()
      .addClass('c1')
      .removeClass('a1')
      .addClass(randomColor())
      .css('f', 0)
      .css('clip', 'rect(0px, auto, auto, auto)')
      .appendTo('body')
      .show();

    $('.c1').find('h1').text(randomGreeting());
    $('.c1').animate({f: fValue},
    {
      step: function(now, fx) {
        if (dir == 'VER') {
          $(this).css('clip', 'rect(0px, auto, '+(now)+'px, 0px)')
        } else {
          $(this).css('clip', 'rect(0px, auto, auto, '+(fValue - now)+'px)')
        }
      },
      easing: 'easeInCubic',
      duration: 500,
      complete: function() {
        $('.b1').remove();
        $(this)
          .removeClass('c1')
          .addClass('b1');
      }
    });

  }

  var INTERVAL = 10000;

  action();
  var timer = window.setInterval(action, INTERVAL);
});