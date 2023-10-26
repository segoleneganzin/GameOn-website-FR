/**
 * This file contains all the functions required to manage responsive menu
 */
// ****************** Responsive menu (<=1024px)
function editNav() {
  var x = document.getElementById("main-nav");
  if (x.className === "main-navbar") {
    x.className = "main-navbar--responsive";
  } else {
    x.className = "main-navbar";
  }
}
