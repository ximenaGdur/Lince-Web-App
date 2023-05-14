/******************** Creating constants for script ********************/

// Pop Up that is shown when game is finished.
const popUpFinished = document.getElementById('popUpFinished');
// Button that allows player to continue session.
const btnContinue = document.getElementsById('btnContinue');
// Button that allows player to exit session.
const btnHome = document.getElementsById('btnHome');

/********************** Functions used on script **********************/

/**
 * Return to waiting room.
 */
function continueSession () {
  if(popUpFinished && btnContinue) {
    window.location.href = "./waitingRoom.xhtml";
  }
}

/**
 * Return to the main page.
 */
function returnToMainPage() {
    if (popUpFinished && btnHome) {
        window.location.href = "./homePage.xhtml";
    }
}

/************************ Listeners for buttons ************************/

btnContinue.addEventListener('click', continueSession);
btnHome.addEventListener('click', returnToMainPage);