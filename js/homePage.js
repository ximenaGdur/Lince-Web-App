/** ****************** Imports ******************* */
import * as codePopup from './codePopUp.js';

const socket = new WebSocket('ws://localhost:009');

socket.addEventListener('open', () => {
  console.log('Conectado al servidor.');

  socket.send('Hola, servidor');
});

socket.addEventListener('message', (event) => {
  console.log(`Recibi: ${event.data}`);
});

/** ****************** Creating constants for script ******************* */

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

/** ******************** Functions used on script ********************* */

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enableButtons() {
  if (nicknameField.value.length > 0 && nicknameField.value.trim() !== '') {
    createRoomBtn.disabled = false;
    createRoomBtn.style.cursor = 'pointer';
    joinRoomBtn.style.cursor = 'pointer';
    joinRoomBtn.disabled = false;
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
function createSession() {
  const nickname = document.getElementById('nickname').value;
  window.location.href = './waitingRoom.xhtml';
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
    creditsContent.style.display = 'flex';
    rankingContent.style.display = 'none';
    instructionsContent.style.display = 'none';
  }
}

/**
 * Shows ranking tab.
 */
function showRanking() {
  if (rankingButton) {
    creditsContent.style.display = 'none';
    rankingContent.style.display = 'flex';
    instructionsContent.style.display = 'none';
  }
}

/**
 * Shows instructions tab.
 */
function showInstructions() {
  if (instructionsButton) {
    creditsContent.style.display = 'none';
    rankingContent.style.display = 'none';
    instructionsContent.style.display = 'flex';
  }
}
/** ********************** Listeners for page *********************** */

nicknameField.addEventListener('input', enableButtons);
createRoomBtn.addEventListener('click', createSession);
creditsButton.addEventListener('click', showCredits);
rankingButton.addEventListener('click', showRanking);
instructionsButton.addEventListener('click', showInstructions);
