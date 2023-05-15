/******************** Creating constants for script ********************/

// Pop Up that is shown when player decides to join session.
const codePopUp = document.getElementById('popUpCode');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('btnCancel');

const showCodePopUp = () => {
  let popUp = document.getElementById('popUpCode');
  popUp.style.display = "flex";
  verifyCode();
}

const verifyCode = () => {
  let codeInput = document.getElementById('popUpInput');
  codeInput.addEventListener('keydown', (event) => {
    let key = event.key;
    let msg = document.getElementById("msgCode");
    if (isNaN(key)){
      msg.innerHTML  = "Sala no existe";
    } else {
      msg.innerHTML  = "Sala encontrada";
    }
  });
}

const cancelPopUp = () => {
  let popUp = document.getElementById('popUpCode');
  popUp.style.display = "none";
  document.getElementById('popUpInput').value = '';
  document.getElementById("msgCode").innerHTML = '';
}

const joinRoom = () => {
  // code validation
  location.href = './waitingRoom.xhtml';
}


/********************** Functions used on script **********************/

/**
 * Close Pop Up.
 */
function closePopUp () {
  if(codePopUp && cancelButton) {
    codePopUp.style.display = 'none';
  }
}

/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', closePopUp);
