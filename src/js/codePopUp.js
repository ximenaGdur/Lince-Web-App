/******************** Creating constants for script ********************/

// Button to show the codePopUp
const codePopUp = document.getElementById('join-room-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('btnCancel');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('btnJoin');
// Pop Up that is shown when player decides to join session.
const popUp = document.getElementById('popUpCode');

/********************** Functions used on script **********************/
const showCodePopUp = () => {
  popUp.style.display = "flex";
  verifyCode();
}

const verifyCode = () => {
  let codeInput = document.getElementById('popUpInput');
  codeInput.addEventListener('keydown', (event) => {
    let key = event.key;
    let msg = document.getElementById("msgCode");
    if (isNaN(key) || key === undefined || key === null){
      msg.innerHTML  = "Sala no existe";
    } else {
      msg.innerHTML  = "Sala encontrada";
    }
  });
}

const cancelPopUp = () => {
  popUp.style.display = 'none';
  document.getElementById('popUpInput').value = '';
  document.getElementById("msgCode").innerHTML = '';
}

const joinRoom = () => {
  // code validation
  location.href = './waitingRoom.xhtml';
}



/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', cancelPopUp);
codePopUp.addEventListener('click', showCodePopUp);
joinButton.addEventListener('click', joinRoom);
