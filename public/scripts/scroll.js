/***********************************************************/
// Maintain scroll position after a redirect
document.addEventListener("DOMContentLoaded", function(event) {
  let scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
  localStorage.setItem("scrollpos", window.scrollY);
};
