const codePopUp = document.getElementById('popUpCode');
const cancelButton = document.getElementById('btnCancel');

function closePopUp () {
  if(codePopUp && cancelButton) {
    codePopUp.style.display = 'none';
  }
}

cancelButton.addEventListener('click', closePopUp);