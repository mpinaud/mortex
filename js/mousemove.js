
// $(document).ready(function() {
//   ($'h1').mousemove(function(event) {
//   var x =
//   var y =
//   $('h1').css('text-shadow' +
//
//   });
// });

$(document).ready(function() {
  $('h1').mousemove(function(event) {
    $(".test").text(event.pageX + "," + event.pageY);

  });
});
