const popUpFinished = document.getElementById('popUpFinished');
const btnHome = document.getElementsByClassName('btnHome');

/**
 * Return to the main page when the accept button on pop up finishe is clicked.
 */
function returnToMainPage() {
  if(popUpFinished && btnHome) {
    window.location.href = "./homePage.xhtml";
  }
}

btnHome[0].addEventListener('click', returnToMainPage);