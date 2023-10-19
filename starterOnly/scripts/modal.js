// Script for modal
// **************** const
const modalBtn = document.querySelectorAll(".modal__btn");
const modalBg = document.querySelector(".modal__bground");
const modalClose = document.querySelector(".modal__close");
const formData = document.querySelectorAll(".modal__formData");

// **************** global variables

// **************** page load function for events
document.addEventListener("DOMContentLoaded", function () {
  console.log("HTML prêt !");
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
