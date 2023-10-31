/**
 * This file contains all the functions required to manage responsive menu
 */
// ****************** Responsive menu (<=1024px)
function editNav() {
  let nav = document.getElementById("main-nav");
  if (nav.className === "main-navbar") {
    nav.className = "main-navbar--responsive";
  } else {
    nav.className = "main-navbar";
  }
}
