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

const popupInput = document.getElementById('popUpInput');

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
  let msg = document.getElementById("msgCode");
  if(popupInput.value != '1234') {
    msg.innerHTML  = "Sala no existe";
    enableJoinRoomButton(true);
  } else {
    msg.innerHTML  = "Sala encontrada";
    enableJoinRoomButton(false);
  }
  // popupInput.addEventListener('keydown', (event) => {
  //   let key = event.key;
  //   let msg = document.getElementById("msgCode");
  //   if (isNaN(key) || key === undefined || key === null){
  //     msg.innerHTML  = "Sala no existe";
  //   } else {
  //     msg.innerHTML  = "Sala encontrada";
  //     enableJoinRoomButton();
  //   }
  // });
}

/**
 * Clean the input value and the message showed in the popUp
 */
function cancelPopUp() {
  popUp.style.display = 'none';
  document.getElementById('popUpInput').value = '';
  document.getElementById("msgCode").innerHTML = '';
}

/**
 * Redirect to waiting room page
 */
function joinRoom() {
  // code validation
  location.href = './waitingRoom.xhtml';
}

/**
 * Enables or disables the join button of the popUp
 * Parameter: booolean 
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
