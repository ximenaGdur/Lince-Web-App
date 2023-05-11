const btnAbandonar = document.getElementsByClassName('btnAbandonar');

function showPopUpFinished() {
    for (let i = 0; i < btnAbandonar.length; i++) {
      window.location.href = "/src/xhtml/popUpWinnerLosser.xhtml";
    }
  }

/* Para tomar el boton correctamente solo funciono con un array de esta forma, igual que arriba para la function */
for (let i = 0; i < btnAbandonar.length; i++) {
    btnAbandonar[i].addEventListener('click', showPopUpFinished);
}
  
