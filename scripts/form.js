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

  // // ** hide the validation message if user has already send a reservation and want to add another
  // hideReservationValidation();
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
    // ** check firstName (at least 2 characters)
    checkName(firstName);
    // ** check lastName (at least 2 characters)
    checkName(lastName);
    // ** check email
    checkEmail(email);
    // ** check birthdate
    checkBirthDate(birthdate);
    // ** check the numerical value of the "number of tournament participations" field
    checkQuantity(quantity);
    // ** check if a radio button is checked
    checkSelectedRadioButtons("location", locationRadioContainer);
    // ** check if gcu are checked
    checkCheckbox("gcu", checkboxLabel);
    // show validation message to user
    displayReservationValidation();
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * This function check if names fields are at least 2 characters
 * @param {object} name
 * @throws {Error}
 */
function checkName(name) {
  let nameValue = name.value;
  if (nameValue.length < 2) {
    printErrorMessage(
      "Veuillez entrer 2 caractères ou plus pour ce champs.",
      name
    );
    throw new Error(`le champs ${name.id} a moins de 2 lettres.`);
  } else {
    // clear the error message if exists
    clearErrorMessage(name);
  }
}

/**
 * This function validates that it is in the correct format.
 * @param {object} email
 * @throws {Error}
 */
function checkEmail(email) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  let emailValue = email.value;
  if (!emailRegExp.test(emailValue)) {
    printErrorMessage("Veuillez entrer une adresse email valide.", email);
    throw new Error(`le champs ${email.id} n'est pas valide`);
  } else {
    // clear the error message if exists
    clearErrorMessage(email);
  }
}

/**
 * This function validates if birthdate is not null
 * @param {object} birthdate
 * @throws {Error}
 */
function checkBirthDate(birthdate) {
  let birthdateValue = birthdate.value;
  if (!birthdateValue) {
    printErrorMessage("Veuillez entrer votre date de naissance.", birthdate);
    throw new Error(`le champs ${birthdate.id} est vide`);
  } else {
    // clear the error message if exists
    clearErrorMessage(birthdate);
  }
}

/**
 * This function validates that it is in the correct format.
 * @param {object} quantity
 * @throws {Error}
 */
function checkQuantity(quantity) {
  // an integer between 0 and 99
  const quantityRegExp = new RegExp("^[1-9]{0,1}[0-9]$");
  let quantityValue = quantity.value;
  if (!quantityRegExp.test(quantityValue)) {
    printErrorMessage(
      "Veuillez entrer un chiffre compris entre 0 et 99",
      quantity
    );
    throw new Error(`le champs ${quantity.id} n'est pas valide`);
  } else {
    // clear the error message if exists
    clearErrorMessage(quantity);
  }
}
/**
 * This functions verify if one radio button is checked
 * @param {string} radioButtonName
 * @param {object} radioButtonsContainer
 */
function checkSelectedRadioButtons(radioButtonName, radioButtonsContainer) {
  const radioButtonCheck = document.querySelector(
    `input[name=${radioButtonName}]:checked`
  );
  if (radioButtonCheck === null) {
    printErrorMessage("Veuillez choisir une option", radioButtonsContainer);
    throw new Error("Aucun bouton radio n'est coché");
  } else {
    // clear the error message if exists
    clearErrorMessage(radioButtonsContainer);
  }
}
/**
 * This functions verify if the checkbox is checked
 * @param {object} checkbox
 */
function checkCheckbox(checkboxName, checkboxLabel) {
  const checkboxCheck = document.querySelector(
    `input[name=${checkboxName}]:checked`
  );
  if (checkboxCheck === null) {
    printErrorMessage(
      "Veuillez accepter les termes et conditions.",
      checkboxLabel
    );
    throw new Error("Les CGU ne sont pas acceptées");
  } else {
    // clear the error message if exists
    clearErrorMessage(checkboxLabel);
  }
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
// function clearErrorMessage(parentElement) {
//   let spanErreurMessage = document.getElementById(`erreur-${parentElement.id}`);
//   if (spanErreurMessage) {
//     printErrorMessage("", parentElement);
//     spanErreurMessage.classList.remove("error-message");
//     parentElement.classList.remove("input-error");
//   }
// }
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

/**
 * this function reinitialize the form and hide the validation message
 */
function hideReservationValidation() {
  const modalForm = document.querySelector(".modal__body form");
  let reservationValidationDiv = document.querySelector(
    ".modal__reservation-validation"
  );
  modalForm.style.display = "block";
  reservationValidationDiv.style.display = "none";
}
