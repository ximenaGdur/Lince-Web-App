/** ******************** Functions used on script ********************* */

/**
 * Closes Pop Up.
 */
export function closePopUp() {
  // Pop Up that is shown when player decides to join session.
  const exitPopUp = document.getElementById('exit-popup');
  if (exitPopUp) {
    exitPopUp.style.display = 'none';
  }
}

/**
 * Shows Pop Up.
 */
export function showExitPopup() {
  // Pop Up that is shown when player decides to join session.
  const exitPopUp = document.getElementById('exit-popup');
  // Button that allows the user to see the exit popup.
  const exitButton = document.getElementById('exit-button');
  if (exitPopUp && exitButton) {
    exitPopUp.style.display = 'flex';
  }
}

/**
 * Creates message for server indicating player has left.
 */
export function createRemovePlayerMessage() {
  const playerNickname = sessionStorage.getItem('playerNickname');
  const roomCode = sessionStorage.getItem('roomCode');
  if (playerNickname && roomCode) {
    const message = {
      type: 'removePlayer',
      from: 'client',
      to: 'server',
      when: 'when a client leaves the room',
      nickname: playerNickname,
      sessionCode: roomCode,
    };
    return JSON.stringify(message);
  }
  return null;
}
