/*********************************************************************************
* 
* This file contains all the functions required to manage modal form
* 
/*********************************************************************************/

function initForm() {
  let quantityTournaments = document.getElementById("quantityTournaments");
  let form = document.querySelector(".form");

  // **** adaptive innerHTML
  let screenSize = window.matchMedia("(min-width: 475px)");

  // replace text if media screen is under 475px
  if (screenSize.matches) {
    quantityTournaments.innerText =
      "À combien de tournois GameOn avez-vous déjà participé ?";
  } else {
    quantityTournaments.innerText =
      "À combien de tournois avez-vous déjà participé ?";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let field = "";
    checkField(field);
  });
  form.addEventListener("change", () => {
    let field = "";
    checkField(field);
  });
}

/**
 * This function check if form fields are ok
 * @param {string} field
 */
function checkField(field) {
  let errorMessage = document.createElement("p");
  errorMessage.textContent = "données invalides";
  console.log("check");
}
