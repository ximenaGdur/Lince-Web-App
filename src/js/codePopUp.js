const codePopUp = document.getElementById('popUpCode');
const cancelButton = document.getElementsByClassName('btnCancel');

function closePopUp () {
  if(codePopUp && cancelButton) {
    codePopUp.style.display = 'none';
  }
}

cancelButton[0].addEventListener('click', closePopUp);