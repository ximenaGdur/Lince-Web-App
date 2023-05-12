const popUpFinished = document.getElementById('popUpFinished');
const btnContinue = document.getElementsByClassName('btnContinue');

function continueSession () {
  if(popUpFinished && btnContinue) {
    window.location.href = "./waitingRoom.xhtml";
  }
}

btnContinue[0].addEventListener('click', continueSession);