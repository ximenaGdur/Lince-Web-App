/******************** Creating constants for script ********************/
// Button to show the codePopUp
const showPopUpButton = document.getElementById('show-popup-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Input box inside popup
const popupInput = document.getElementById('popup-input');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('join-button');
// Pop Up that is shown when player decides to join session.
const popUp = document.getElementById('popUpCode');
// Input of the code popUp 
const codeInput = document.getElementById('popUpInput');
// Code popUp input message result
const inputMsg = document.getElementById("msgCode");


/********************** Functions used on script **********************/

/**
 * Shows code popup when button is pressed.
 */
function showCodePopUp() {
  popUp.style.display = "flex";
}

/**
 * Verifies if given code is correct
 */
function verifyCode() {
  let msg = document.getElementById("room-validation-text");
  if(popupInput.value !== '1234') {
    msg.innerHTML  = "Sala no existe";
    createRoomBtn.style.cursor = 'pointer';
    joinButton.disabled = true;
  } else {
    msg.innerHTML  = "Sala encontrada";
    createRoomBtn.style.cursor = 'default';
    joinButton.disabled = false;
  }
}

/**
 * Closes popup when button is clicked.
 */
function cancelPopUp() {
  popUp.style.display = 'none';
  document.getElementById('popup-input').value = '';
  document.getElementById("room-validation-text").innerHTML = '';
}

/**
 * Joins given room when button is clicked.
 */
function joinRoom() {
  if (joinButton) {
    // code validation
    location.href = './waitingRoom.xhtml';
  }
}

//export { showCodePopUp, verifyCode, cancelPopUp, joinRoom };

showPopUpButton.addEventListener('click', showCodePopUp);
cancelButton.addEventListener('click', cancelPopUp);
joinButton.addEventListener('click', joinRoom);
popupInput.addEventListener('input', verifyCode);