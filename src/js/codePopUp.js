/******************** Creating constants for script ********************/

// Button to show the codePopUp
const codePopUp = document.getElementById('join-room-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('btnCancel');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('btnJoin');
// Pop Up that is shown when player decides to join session.
const popUp = document.getElementById('popUpCode');
// Input of the code popUp 
const codeInput = document.getElementById('popUpInput');
// Code popUp input message result
const inputMsg = document.getElementById("msgCode");


/********************** Functions used on script **********************/
let showCodePopUp = () => {
  popUp.style.display = "flex";
  verifyCode();
}

let verifyCode = () => {
  let result = false;
  codeInput.addEventListener('keydown', (event) => {
    let key = event.key;    
    if (isNaN(key) || key === undefined || key === null){
      inputMsg.innerHTML  = "Sala no existe";
    } else {
      inputMsg.innerHTML  = "Sala encontrada";
      console.log('Sala encontrada')
      this.result =  true;
    }
  });
  return result;
}

let cancelPopUp = () => {
  popUp.style.display = 'none';
  document.getElementById('popUpInput').value = '';
  document.getElementById("msgCode").innerHTML = '';
}

let joinRoom = () => {
  location.href = './waitingRoom.xhtml';    
}




/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', cancelPopUp);
codePopUp.addEventListener('click', showCodePopUp);
joinButton.addEventListener('click', joinRoom);
