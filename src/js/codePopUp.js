/******************** Creating constants for script ********************/

// Pop Up that is shown when player decides to join session.
const codePopUp = document.getElementById('popUpCode');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('btnCancel');

/********************** Functions used on script **********************/

/**
 * Close Pop Up.
 */
function closePopUp () {
  if(codePopUp && cancelButton) {
    codePopUp.style.display = 'none';
  }
}

/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', closePopUp);