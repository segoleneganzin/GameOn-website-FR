/**
 * This file contains all the functions required to manage modal form
 */

const numTournaments = document.getElementById("num-tournaments");
// **** adaptive innerHTML
let screenSize = window.matchMedia("(min-width: 475px)");
// replace text if media screen is under 475px
if (screenSize.matches) {
  numTournaments.innerText =
    "À combien de tournois GameOn avez-vous déjà participé ?";
} else {
  numTournaments.innerText = "À combien de tournois avez-vous déjà participé ?";
}
