/** ****************** Imports ******************* */
import {
  showCodePopUp,
  cancelPopUp,
  handleCodeValidation,
// eslint-disable-next-line import/extensions
} from './codePopUp.js';

/** ****************** Creating constants for script ******************* */

// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Button that changes tab to credits.
const creditsButton = document.getElementById('credits-link');
// Credits tab content.
const creditsContent = document.getElementById('credits');
// Button to create a room after entering a nickname.
const createRoomBtn = document.getElementById('create-room-button');
// Feedback given by server about given room code.
const feedbackMessage = document.getElementById('room-validation-text');
// Text field to enter player nickname.
const nicknameField = document.getElementById('nickname');
// Button that changes tab to instructions.
const instructionsButton = document.getElementById('instructions-link');
// Instructions tab content.
const instructionsContent = document.getElementById('instructions');
// Button in codePopUp to join into a room
const joinButton = document.getElementById('join-button');
// Button to join a room after entering a nickname.
const joinRoomBtn = document.getElementById('show-popup-button');
// Input box inside popup
const popupInput = document.getElementById('popup-input');
// Button that changes tab to ranking.
const rankingButton = document.getElementById('ranking-link');
// Ranking tab content.
const rankingContent = document.getElementById('ranking');
// Button to show the codePopUp
const showPopUpButton = document.getElementById('show-popup-button');
// Socket that connects to server
const socket = new WebSocket('ws://localhost:8009');

// Global variable with room code
sessionStorage.setItem('roomCode', '');
sessionStorage.setItem('roomCode', '');

/** ******************** Functions used on script ********************* */

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enterNickname() {
  const playerNickname = nicknameField.value;
  if (playerNickname.length > 0 && playerNickname.trim() !== '') {
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
  sessionStorage.setItem('playerNickname', playerNickname);
}

/**
 * Sends a message to the server to close a client's connection.
 * Should be included in common.js
 */
/* function closeTab() {
  console.log('Cerrando conexión con server.');
} */

/**
* Send a message to the server to create a new room with the host as the client
* that pressed the create room button and with the nickname entered.
*/
function createSession() {
  const playerNickname = document.getElementById('nickname').value;
  const message = {
    type: 'createRoom',
    from: 'client',
    to: 'server',
    when: 'when a client presses the create room button with a valid nickname',
    nickname: playerNickname,
  };
  socket.send(JSON.stringify(message));
}

/**
 * Joins given room when button is clicked.
 */
function joinSession() {
  const playerNickname = document.getElementById('nickname').value;
  if (joinButton) {
    const message = {
      type: 'addToRoom',
      from: 'client',
      to: 'server',
      when: 'when a client presses the join session button',
      nickname: playerNickname,
      sessionCode: popupInput.value,
    };
    socket.send(JSON.stringify(message));

    sessionStorage.setItem('roomCode', popupInput.value);
    window.location.href = './waitingRoom.xhtml';
  }
}

/**
 * Asks the server if room code is valid.
 */
function verifyCode() {
  if (popupInput.value.length === 5 && popupInput.value.trim() !== '') {
    const message = {
      type: 'validateCode',
      from: 'client',
      to: 'server',
      when: 'when a client types a room code',
      sessionCode: popupInput.value,
    };
    socket.send(JSON.stringify(message));
  } else {
    feedbackMessage.innerHTML = '';
  }
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

/**
 * Indicates client room code.
 * @param {*} receivedMessage Message sent by the server containing the room code to save.
 */
function handleRoomCode(message) {
  sessionStorage.setItem('roomCode', message.sessionCode);
  window.location.href = './waitingRoom.xhtml';
}

/**
 * Identifying message type in order to call appropiate function.
 */
function identifyMessage(receivedMessage) {
  switch (receivedMessage.type) {
    case 'handleCodeValidation':
      handleCodeValidation(receivedMessage);
      break;
    case 'handleRoomCode':
      handleRoomCode(receivedMessage);
      break;
    default:
      console.error('No se reconoce ese mensaje.');
  }
}

function loadAddEventListeners() {
  /**
  * When a connection is made with server.
  */
  socket.addEventListener('open', () => {
    console.log('Conectado al servidor desde Home Page.');
  });

  /**
  * Event that occurs every time a message is received.
  */
  socket.addEventListener('message', (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log(`Recibi del servidor: ${receivedMessage}`);
    identifyMessage(receivedMessage);
  });

  /**
  * Adding event listener when cancelButton is clicked
  */
  cancelButton.addEventListener('click', cancelPopUp);

  /**
  * Adding event listener when createRoomBtn is clicked
  */
  createRoomBtn.addEventListener('click', createSession);

  /**
  * Adding event listener when creditsButton is clicked
  */
  creditsButton.addEventListener('click', showCredits);

  /**
  * Adding event listener when instructionsButton is clicked
  */
  instructionsButton.addEventListener('click', showInstructions);

  /**
  * Adding event listener when joinButton is clicked
  */
  joinButton.addEventListener('click', joinSession);

  /**
  * Adding event listener when nicknameField is changed
  */
  nicknameField.addEventListener('input', enterNickname);

  /**
  * Adding event listener when popupInput is changed
  */
  popupInput.addEventListener('input', verifyCode);

  /**
  * Adding event listener when rankingButton is clicked
  */
  rankingButton.addEventListener('click', showRanking);

  /**
  * Adding event listener when showPopUpButton is clicked
  */
  showPopUpButton.addEventListener('click', showCodePopUp);
}

/** ********************** Listeners for home page *********************** */

window.addEventListener('load', loadAddEventListeners);

/**
 * When a connection is closed.
 */
// socket.addEventListener('close', closeTab());

/**
 * Adding event listener when window is closed
 */
// window.addEventListener('close', closeTab);
