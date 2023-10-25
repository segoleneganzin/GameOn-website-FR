/*********************************************************************************
 *
 * This file contains all the functions required to display
 * and close the modal popup.
 *
 *********************************************************************************/
const modalBg = document.querySelector(".modal__bground");

/**
 * This function initializes the event listeners for the modal display.
 */
function initModal() {
  // **** const
  const modalBtn = document.querySelectorAll(".modal__btn");
  const modalClose = document.querySelectorAll(".modal__close");

  // **** events
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  // close modal event
  modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
}

/**
 * This function displays the modal popup
 */
function launchModal() {
  modalBg.style.display = "block";
}
/**
 * This function hides the modal popup
 */
function closeModal() {
  modalBg.style.display = "none";
}
