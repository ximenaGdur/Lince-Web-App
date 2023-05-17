/******************** Creating constants for script ********************/

// Pop Up that is shown when game is finished.
const popUpFinished = document.getElementById('popUpFinished');
// Button that allows player to continue session.
const continue-button = document.getElementById('continue-button');
// Button that allows player to exit session.
const home-button = document.getElementById('home-button');

/********************** Functions used on script **********************/

/**
 * Return to waiting room.
 */
function continueSession () {
  if(popUpFinished && continue-button) {
    window.location.href = "./waitingRoom.xhtml";
  }
}

/**
 * Return to the main page.
 */
function returnToMainPage() {
    if (popUpFinished && home-button) {
        window.location.href = "./homePage.xhtml";
    }
}

/************************ Listeners for buttons ************************/

continue-button.addEventListener('click', continueSession);
home-button.addEventListener('click', returnToMainPage);