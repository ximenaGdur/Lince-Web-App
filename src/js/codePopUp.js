/******************** Creating constants for script ********************/

// Button to show the codePopUp
const codePopUp = document.getElementById('join-room-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('join-button');
// Pop Up that is shown when player decides to join session.
const popUp = document.getElementById('popup-code');
//
const popupInput = document.getElementById('popup-input');

/********************** Functions used on script **********************/

/**
 * 
 */
function showCodePopUp() {
  popUp.style.display = "flex";
}

/**
 * 
 */
function verifyCode() {
  let msg = document.getElementById("room-validation-text");
  if(popupInput.value !== '1234') {
    msg.innerHTML  = "Sala no existe";
    enableJoinRoomButton(true);
  } else {
    msg.innerHTML  = "Sala encontrada";
    enableJoinRoomButton(false);
  }
  // popupInput.addEventListener('keydown', (event) => {
  //   let key = event.key;
  //   let msg = document.getElementById("room-validation-text");
  //   if (isNaN(key) || key === undefined || key === null){
  //     msg.innerHTML  = "Sala no existe";
  //   } else {
  //     msg.innerHTML  = "Sala encontrada";
  //     enableJoinRoomButton();
  //   }
  // });
}

/**
 * 
 */
function cancelPopUp() {
  popUp.style.display = 'none';
  document.getElementById('popup-input').value = '';
  document.getElementById("room-validation-text").innerHTML = '';
}

/**
 * 
 */
function joinRoom() {
  // code validation
  location.href = './waitingRoom.xhtml';
}

/**
 * 
 */
function enableJoinRoomButton(enable) {
  if(enable) {
    joinButton.disabled = true;
  } else {
    joinButton.disabled = false;
  }
}


/************************ Listeners for buttons ************************/

cancelButton.addEventListener('click', cancelPopUp);
codePopUp.addEventListener('click', showCodePopUp);
joinButton.addEventListener('click', joinRoom);
popupInput.addEventListener('input', verifyCode);
