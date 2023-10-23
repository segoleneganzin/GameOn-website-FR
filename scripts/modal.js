// Script for modal
// **************** const
const modalBtn = document.querySelectorAll(".modal__btn");
const modalBg = document.querySelector(".modal__bground");
const modalClose = document.querySelector(".modal__close");
const formData = document.querySelectorAll(".modal__formData");
const numTournaments = document.getElementById("num-tournaments");

// **************** global variables
let screenSize = window.matchMedia("(min-width: 475px)");

// **************** page load function for events
document.addEventListener("DOMContentLoaded", function () {
  // replace text if media screen is under 475px
  if (screenSize.matches) {
    numTournaments.innerHTML =
      "À combien de tournois GameOn avez-vous déjà participé ?";
  } else {
    numTournaments.innerHTML =
      "À combien de tournois avez-vous déjà participé ?";
  }
  // **** events
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  // close modal event
  modalClose.addEventListener("click", closeModal);

  // **** functions
  // launch modal form
  function launchModal() {
    modalBg.style.display = "block";
  }
  // close modal form
  function closeModal() {
    modalBg.style.display = "none";
  }
});
