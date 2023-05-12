const btnAbandonar = document.getElementsByClassName('btnAbandonar');

function showPopUpFinished() {
      window.location.href = "/src/xhtml/popUpWinnerLosser.xhtml";
}
btnAbandonar[0].addEventListener('click', showPopUpFinished);

  
