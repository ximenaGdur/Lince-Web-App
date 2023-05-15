/******************** Creating constants for script ********************/

// Pop Up that is shown when player decides to join session.
const exitPopUp = document.getElementById('popUpExit');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('btnCancel');
// Button that allows player to return to main page.
const acceptButton = document.getElementById('btnAccept');
// .
const exitButton = document.getElementById('exitButton');


/********************** Functions used on script **********************/

/**
 * Close Pop Up.
 */
function closePopUp () {
  if(exitPopUp && cancelButton) {
    exitPopUp.style.display = 'none';
  }
}

/**
 * Close Pop Up.
 */
function showExitPopup () {
  if(exitPopUp && exitButton) {
    exitPopUp.style.display = 'flex';
  }
}

/** Function: Accept
 * return to home page when clicked **/
function accept() {
  if( acceptButton ){
      window.location.href = "/src/xhtml/homePage.xhtml";
  }
}

/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', closePopUp);
exitButton.addEventListener('click', showExitPopup);
acceptButton.addEventListener('click', accept);