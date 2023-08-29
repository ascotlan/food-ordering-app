/***********************************************************/
// Maintain scroll position after a redirect
document.addEventListener("DOMContentLoaded", function(event) {
  let scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos)
    window.scrollTo({
      top: scrollpos,
      left: 0
    });
});

window.onbeforeunload = function(e) {
  localStorage.setItem("scrollpos", window.scrollY);
};
