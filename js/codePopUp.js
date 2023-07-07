/** ******************** Functions used on script ********************* */

/**
 * Shows code popup when button is pressed.
 */
export function showCodePopUp() {
  // Pop Up that is shown when player decides to join session.
  const popUp = document.getElementById('popup-code');
  if (popUp) {
    popUp.style.display = 'flex';
  }
}

/**
 * Closes popup when button is clicked.
 */
export function cancelPopUp() {
  // Pop Up that is shown when player decides to join session.
  const popUp = document.getElementById('popup-code');
  if (popUp) {
    popUp.style.display = 'none';
    document.getElementById('popup-input').value = '';
    document.getElementById('room-validation-text').innerHTML = '';
  }
}
