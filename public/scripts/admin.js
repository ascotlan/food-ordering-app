// Client facing scripts here
$(document).ready(function() {
  //When screen scolls change CSS classes so that #scroll-top link shows/hides
  $(window).scroll(function() {
    let yAxis = $(this).scrollTop();
    if (yAxis > 160) {
      $("#scroll-top").addClass("show");
      $("#scroll-top").removeClass("hide");
    } else {
      $("#scroll-top").removeClass("show");
      $("#scroll-top").addClass("hide");
    }
  });

  //when the #scroll-top link is clicked scroll top of the page
  $("#scroll-top").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: "0" }, 400);
  });
});
