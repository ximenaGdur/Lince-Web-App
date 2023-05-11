const btnClose = document.getElementsByClassName('btnPopUpClose');

function closePopUp() {
  for (let i = 0; i < btnClose.length; i++) {
    window.location.href = "/src/xhtml/game.xhtml";   
  }
}

/* Para tomar el boton correctamente solo funciono con un array de esta forma igual que arriba para la function */
for (let i = 0; i < btnClose.length; i++) {
  btnClose[i].addEventListener('click', closePopUp);
}

  