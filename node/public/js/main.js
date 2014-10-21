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

});