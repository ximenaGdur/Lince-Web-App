/** ****************** Creating constants for script ******************* */

// Pop Up that is shown when game is finished.
const popUpFinished = document.getElementById('popup-finished');
// Button that allows player to continue session.
const continueButton = document.getElementById('continue-button');
// Button that allows player to exit session.
// const homeButton = document.getElementById('home-button');

/** ******************** Functions used on script ********************* */

/**
 * Return to waiting room.
 */
// eslint-disable-next-line import/prefer-default-export
export function continueSession() {
  if (popUpFinished && continueButton) {
    window.location.href = './waitingRoom.xhtml';
  }
}
