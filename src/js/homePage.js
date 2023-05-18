/******************** Imports ********************/

import * as codePopup from './codePopUp.js'

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


// Button that changes tab to credits.
const creditsButton = document.getElementById('credits-link');
// Credits tab content.
const creditsContent = document.getElementById('credits');
// Button that changes tab to ranking.
const rankingButton = document.getElementById('ranking-link');
// Ranking tab content.
const rankingContent = document.getElementById('ranking');
// Button that changes tab to instructions.
const instructionsButton = document.getElementById('instructions-link');
// Instructions tab content.
const instructionsContent = document.getElementById('instructions');

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

/**
 * Shows credits tab.
 */
function showCredits() {
    if (creditsButton) {
        creditsContent.style.display = "flex";
        rankingContent.style.display = "none";
        instructionsContent.style.display = "none";
    }
}

/**
 * Shows ranking tab.
 */
function showRanking() {
    if (rankingButton) {
        creditsContent.style.display = "none";
        rankingContent.style.display = "flex";
        instructionsContent.style.display = "none";
    }
}

/**
 * Shows instructions tab.
 */
function showInstructions() {
    if (instructionsButton) {
        creditsContent.style.display = "none";
        rankingContent.style.display = "none";
        instructionsContent.style.display = "flex";
    }
}
/************************ Listeners for page ************************/

/*showPopUpButton.addEventListener('click', showCodePopUp);
cancelButton.addEventListener('click', cancelPopUp);
joinButton.addEventListener('click', joinRoom);
popupInput.addEventListener('input', verifyCode);*/

nicknameField.addEventListener('input', enableButtons);
createRoomBtn.addEventListener('click', createSession);

creditsButton.addEventListener('click', showCredits);
rankingButton.addEventListener('click', showRanking);
instructionsButton.addEventListener('click', showInstructions);