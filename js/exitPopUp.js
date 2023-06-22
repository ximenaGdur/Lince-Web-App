/** ****************** Creating constants for script ******************* */

// Pop Up that is shown when player decides to join session.
const exitPopUp = document.getElementById('exit-popup');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Button that allows the user to see the exit popup.
const exitButton = document.getElementById('exit-button');

/** ******************** Functions used on script ********************* */

/**
 * Closes Pop Up.
 */
export function closePopUp() {
  if (exitPopUp && cancelButton) {
    exitPopUp.style.display = 'none';
  }
}

/**
 * Shows Pop Up.
 */
export function showExitPopup() {
  if (exitPopUp && exitButton) {
    exitPopUp.style.display = 'flex';
  }
}

/**
 * Creates message for server indicating player has left.
 */
export function createRemovePlayerMessage() {
  console.log('Cerrando conexión con server.');
  const message = {
    type: 'removePlayer',
    from: 'client',
    to: 'server',
    when: 'when a client leaves the room',
    nickname: localStorage.getItem('playerNickname'),
    sessionCode: localStorage.getItem('roomCode'),
  };
  return JSON.stringify(message);
}
