/*********************************************************************************
* 
* This file contains all the functions required to manage modal form
* 
/*********************************************************************************/

/**
 * This function initialize the form depends on screen size and manage form submit event
 */
const form = document.querySelector("#form");

function initForm() {
  const quantityTournaments = document.getElementById("quantityTournaments");
  // **** adaptive innerHTML
  const screenSize = window.matchMedia("(min-width: 475px)");

  // replace text if media screen is under 475px
  if (screenSize.matches) {
    quantityTournaments.innerText =
      "À combien de tournois GameOn avez-vous déjà participé ?";
  } else {
    quantityTournaments.innerText =
      "À combien de tournois avez-vous déjà participé ?";
  }

  //manage form when submit
  form.addEventListener("submit", (event) => {
    // prevents default behavior (reload)
    event.preventDefault();
    manageForm();
  });
}

/**
 * This function retrieves information from the reservation form
 * and tests whether the fields are valid.
 */
function manageForm() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locationRadioContainer = document.getElementById(
    "locationRadioContainer"
  );
  const checkboxLabel = document.querySelector("input[name='gcu'] + label");
  try {
    console.log("test envoi du formulaire");
    // for print errors messages if necessary
    checkName(firstName);
    checkName(lastName);
    checkEmail(email);
    checkBirthDate(birthdate);
    checkQuantity(quantity);
    checkSelectedRadioButtons("location", locationRadioContainer);
    checkCheckbox("gcu", checkboxLabel);
    // for check if all is ok
    if (
      checkName(firstName) &&
      checkName(lastName) &&
      checkEmail(email) &&
      checkBirthDate(birthdate) &&
      checkQuantity(quantity) &&
      checkSelectedRadioButtons("location", locationRadioContainer) &&
      checkCheckbox("gcu", checkboxLabel)
    ) {
      // show validation message to user
      displayReservationValidation();
    }
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * This function check if names fields are at least 2 characters
 * @param {object} name
 */
function checkName(name) {
  let res = true;
  let nameValue = name.value;
  if (nameValue.length < 2) {
    printErrorMessage(
      "Veuillez entrer 2 caractères ou plus pour ce champs.",
      name
    );
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(name);
  }
  return res;
}

/**
 * This function validates if it is in the correct format.
 * @param {object} email
 */
function checkEmail(email) {
  let res = true;
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  let emailValue = email.value;
  if (!emailRegExp.test(emailValue)) {
    printErrorMessage("Veuillez entrer une adresse email valide.", email);
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(email);
  }
  return res;
}

/**
 * This function validates if birthdate is not null and if user is over 6 years old
 * @param {object} birthdate
 */
function checkBirthDate(birthdate) {
  let res = true;
  let birthdateValue = birthdate.value;
  let now = new Date();
  let dayMinAge = now.getDate();
  // in js, month start at 0
  let monthMinAge = now.getMonth() + 1;
  // reservation is only for people over 6 years old
  let yearMinAge = now.getFullYear() - 6;
  let minAge = yearMinAge + "-" + monthMinAge + "-" + dayMinAge;
  if (!birthdateValue) {
    printErrorMessage(
      "Veuillez entrer une date de naissance valide",
      birthdate
    );
    res = false;
  } else if (birthdateValue > minAge) {
    printErrorMessage(
      "Vous devez avoir au moins 6 ans pour vous inscrire",
      birthdate
    );
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(birthdate);
  }
  return res;
}

/**
 * This function validates if it is in the correct format.
 * @param {object} quantity
 */
function checkQuantity(quantity) {
  let res = true;
  // an integer between 0 and 99
  const quantityRegExp = new RegExp("^[1-9]{0,1}[0-9]$");
  let quantityValue = quantity.value;
  if (!quantityRegExp.test(quantityValue)) {
    printErrorMessage(
      "Veuillez entrer un chiffre compris entre 0 et 99",
      quantity
    );
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(quantity);
  }
  return res;
}
/**
 * This functions verify if one radio button is checked
 * @param {string} radioButtonName
 * @param {object} radioButtonsContainer
 */
function checkSelectedRadioButtons(radioButtonName, radioButtonsContainer) {
  let res = true;
  const radioButtonCheck = document.querySelector(
    `input[name=${radioButtonName}]:checked`
  );
  if (radioButtonCheck === null) {
    printErrorMessage("Veuillez choisir une option", radioButtonsContainer);
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(radioButtonsContainer);
  }
  return res;
}
/**
 * This functions verify if the checkbox is checked
 * @param {object} checkbox
 */
function checkCheckbox(checkboxName, checkboxLabel) {
  let res = true;
  const checkboxCheck = document.querySelector(
    `input[name=${checkboxName}]:checked`
  );
  if (checkboxCheck === null) {
    printErrorMessage(
      "Veuillez accepter les termes et conditions.",
      checkboxLabel
    );
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(checkboxLabel);
  }
  return res;
}

/**
 * This function displays the error message passed as a parameter
 * in the span created below the problematic element.
 * If the span already exists, it is reused to avoid multiplying error messages.
 * @param {string} message
 * @param {object} parentElement
 */
function printErrorMessage(message, parentElement) {
  let spanErreurMessage = document.getElementById(`erreur-${parentElement.id}`);
  if (!spanErreurMessage) {
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = `erreur-${parentElement.id}`;
    spanErreurMessage.classList.add("error-message");
    if (parentElement.tagName === "INPUT") {
      parentElement.classList.add("input-error");
    }
    // insert span after parent
    parentElement.insertAdjacentElement("afterend", spanErreurMessage);
  }
  spanErreurMessage.innerText = message;
}
/**
 * This function clears the error message if exists
 * @param {object} parentElement
 */
function clearErrorMessage(parentElement) {
  let spanErreurMessage = document.getElementById(`erreur-${parentElement.id}`);
  if (spanErreurMessage) {
    spanErreurMessage.remove();
    parentElement.classList.remove("input-error");
  }
}

/**
 * this function hide the form and show a validation message
 */
function displayReservationValidation() {
  const modalForm = document.querySelector(".modal__body form");
  let reservationValidationDiv = document.querySelector(
    ".modal__reservation-validation"
  );
  modalForm.style.display = "none";
  reservationValidationDiv.style.display = "flex";
}
