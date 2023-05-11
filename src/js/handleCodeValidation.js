/* cerrrar BTN */
const btnJoin = document.getElementsByClassName('btnJoin');

function showPopUpFinished() {
    for (let i = 0; i < btnJoin.length; i++) {
      document.getElementById("isValid").innerHTML = "Numero de sala invalido";
    }
  }

/* Para tomar el boton correctamente solo funciono con un array de esta forma, igual que arriba para la function */
for (let i = 0; i < btnJoin.length; i++) {
  btnJoin[i].addEventListener('click', showPopUpFinished);
}
  

