// Script for menu
// ****************** Responsive menu
function editNav() {
  var x = document.getElementById("main-nav");
  if (x.className === "main-navbar") {
    x.className = "main-navbar--responsive";
  } else {
    x.className = "main-navbar";
  }
}
