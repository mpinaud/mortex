
// countdown timer function
var timer = 5;

var interval = setInterval(function() {
  $(".countdown").text(timer);
  if (timer === 0) {
    clearInterval(interval);
  }, 5000ms);
