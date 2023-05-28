/** ****************** Creating constants for script ******************* */

// Feedback given by server about given room code.
const feedbackMessage = document.getElementById('room-validation-text');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('join-button');
// Pop Up that is shown when player decides to join session.
const popUp = document.getElementById('popup-code');

/** ******************** Functions used on script ********************* */

/**
 * Shows code popup when button is pressed.
 */
export function showCodePopUp() {
  popUp.style.display = 'flex';
}

/**
 * Checks server response to whether code is valid or not.
 */
export function handleCodeValidation(receivedMessage) {
  console.log('Recibi mensaje de validacion');
  if (!receivedMessage.isValid) {
    feedbackMessage.innerHTML = 'Sala no existe';
    joinButton.style.cursor = 'pointer';
    joinButton.disabled = true;
  } else {
    feedbackMessage.innerHTML = 'Sala encontrada';
    joinButton.style.cursor = 'default';
    joinButton.disabled = false;
  }
}

/**
 * Closes popup when button is clicked.
 */
export function cancelPopUp() {
  popUp.style.display = 'none';
  document.getElementById('popup-input').value = '';
  document.getElementById('room-validation-text').innerHTML = '';
}

/**
 * Joins given room when button is clicked.
 */
export function joinRoom() {
  if (joinButton) {
    window.location.href = './waitingRoom.xhtml';
  }
}
