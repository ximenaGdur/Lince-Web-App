/** ******************** Functions used on script ********************* */

/**
 * Return to waiting room.
 */
// eslint-disable-next-line import/prefer-default-export
export function continueSession() {
  // Pop Up that is shown when game is finished.
  const popUpFinished = document.getElementById('popup-finished');
  // Button that allows player to continue session.
  const continueButton = document.getElementById('continue-button');
  if (popUpFinished && continueButton) {
    window.location.href = './waitingRoom.xhtml';
  }
}
