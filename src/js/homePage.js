//import { showCodePopUp, verifyCode, cancelPopUp, joinRoom } from './codePopUp.js';

/******************** Creating constants for script ********************/

/*// Button to show the codePopUp
const showPopUpButton = document.getElementById('show-popup-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('join-button');
// Input box inside popup
const popupInput = document.getElementById('popup-input');*/

// Text field to enter player nickname.
const nicknameField = document.getElementById('nickname');
// Button to create a room after entering a nickname.
const createRoomBtn = document.getElementById('create-room-button');
// Button to join a room after entering a nickname.
const joinRoomBtn = document.getElementById('show-popup-button');

/********************** Functions used on script **********************/

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enableButtons() {
    if(nicknameField.value.length > 0 && nicknameField.value.trim() !== "") {
        createRoomBtn.disabled = false;
        createRoomBtn.style.cursor = 'pointer';
        //createRoomBtn.style.background = '';
        joinRoomBtn.style.cursor = 'pointer';
        joinRoomBtn.disabled = false;
        //joinRoomBtn.style.background = '';
    } else {
        createRoomBtn.disabled = true;
        joinRoomBtn.disabled = true;
        createRoomBtn.style.cursor = 'default';
        joinRoomBtn.style.cursor = 'default';
    }
}

/**
* Send a message to the server to create a new room with the host as the client 
* that pressed the create room button and with the nickname entered.
*/
function createSession(){
    let nickname = document.getElementById('nickname').value;
    location.href = './waitingRoom.xhtml';
    // "Type": "createRoom",  
    // "From": "client",  
    // "To": "server",
    // "When": "when a client presses the create room button with a valid nickname",  
    // "Nickname": "nickname"
}

/**
 * Sends a message to the server to close a client's connection.
 */
function closeTab() {
    // "Type": "closeTab",  
    // "From": "client",  
    // "To": "server",  
    // "When": "when a client logs off"
}

/************************ Listeners for page ************************/

/*showPopUpButton.addEventListener('click', showCodePopUp);
cancelButton.addEventListener('click', cancelPopUp);
joinButton.addEventListener('click', joinRoom);
popupInput.addEventListener('input', verifyCode);*/

nicknameField.addEventListener('input', enableButtons);
createRoomBtn.addEventListener('click', createSession);
