/** ****************** Imports ******************* */
import {
  showCodePopUp,
  cancelPopUp,
  handleCodeValidation,
// eslint-disable-next-line import/extensions
} from './codePopUp.js';

/** ******************** Functions used on script ********************* */

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enterNickname() {
  // Text field to enter player nickname.
  const nicknameField = document.getElementById('nickname');
  const playerNickname = nicknameField.value;
  // Button to create a room after entering a nickname.
  const createRoomBtn = document.getElementById('create-room-button');
  // Button to join a room after entering a nickname.
  const joinRoomBtn = document.getElementById('show-popup-button');
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
  localStorage.setItem('playerNickname', playerNickname);
}

/**
 * Sends a message to the server to close a client's connection.
 * Should be included in common.js
 */
/* function closeTab() {
} */

/**
* Send a message to the server to create a new room with the host as the client
* that pressed the create room button and with the nickname entered.
*/
function createSession(socket) {
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
function joinSession(socket) {
  // Button in codePopUp to join into a room
  const joinButton = document.getElementById('join-button');
  const playerNickname = document.getElementById('nickname').value;
  // Input box inside popup
  const popupInput = document.getElementById('popup-input');
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

    localStorage.setItem('roomCode', popupInput.value);
    window.location.href = './waitingRoom.xhtml';
  }
}

/**
 * Asks the server if room code is valid.
 */
function verifyCode(socket) {
  // Input box inside popup
  const popupInput = document.getElementById('popup-input');
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
    // Feedback given by server about given room code.
    const feedbackMessage = document.getElementById('room-validation-text');
    feedbackMessage.innerHTML = '';
  }
}

/**
 * Shows credits tab.
 */
function showCredits() {
  // Button that changes tab to credits.
  const creditsButton = document.getElementById('credits-link');
  // Credits tab content.
  const creditsContent = document.getElementById('credits');
  // Ranking tab content.
  const rankingContent = document.getElementById('ranking');
  // Instructions tab content.
  const instructionsContent = document.getElementById('instructions');
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
  // Button that changes tab to ranking.
  const rankingButton = document.getElementById('ranking-link');
  // Credits tab content.
  const creditsContent = document.getElementById('credits');
  // Ranking tab content.
  const rankingContent = document.getElementById('ranking');
  // Instructions tab content.
  const instructionsContent = document.getElementById('instructions');
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
  // Button that changes tab to instructions.
  const instructionsButton = document.getElementById('instructions-link');
  // Credits tab content.
  const creditsContent = document.getElementById('credits');
  // Ranking tab content.
  const rankingContent = document.getElementById('ranking');
  // Instructions tab content.
  const instructionsContent = document.getElementById('instructions');
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
  localStorage.setItem('roomCode', message.sessionCode);
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
  // Socket that connects to server
  const socket = new WebSocket('ws://localhost:8009');

  /**
  * When a connection is made with server.
  */
  socket.addEventListener('open', () => {
  });

  /**
  * Event that occurs every time a message is received.
  */
  socket.addEventListener('message', (event) => {
    const receivedMessage = JSON.parse(event.data);
    identifyMessage(receivedMessage);
  });

  // Button that allows player to close pop up.
  const cancelButton = document.getElementById('cancel-button');
  /**
  * Adding event listener when cancelButton is clicked
  */
  cancelButton.addEventListener('click', cancelPopUp);

  // Button to create a room after entering a nickname.
  const createRoomBtn = document.getElementById('create-room-button');
  /**
  * Adding event listener when createRoomBtn is clicked
  */
  createRoomBtn.addEventListener('click', () => {
    createSession(socket);
  });

  // Button that changes tab to credits.
  const creditsButton = document.getElementById('credits-link');
  /**
  * Adding event listener when creditsButton is clicked
  */
  creditsButton.addEventListener('click', showCredits);

  // Button that changes tab to instructions.
  const instructionsButton = document.getElementById('instructions-link');
  /**
  * Adding event listener when instructionsButton is clicked
  */
  instructionsButton.addEventListener('click', showInstructions);

  // Button in codePopUp to join into a room
  const joinButton = document.getElementById('join-button');
  /**
  * Adding event listener when joinButton is clicked
  */
  joinButton.addEventListener('click', () => {
    joinSession(socket);
  });

  // Text field to enter player nickname.
  const nicknameField = document.getElementById('nickname');
  /**
  * Adding event listener when nicknameField is changed
  */
  nicknameField.addEventListener('input', enterNickname);

  // Input box inside popup
  const popupInput = document.getElementById('popup-input');
  /**
  * Adding event listener when popupInput is changed
  */
  popupInput.addEventListener('input', () => {
    verifyCode(socket);
  });

  // Button that changes tab to ranking.
  const rankingButton = document.getElementById('ranking-link');
  /**
  * Adding event listener when rankingButton is clicked
  */
  rankingButton.addEventListener('click', showRanking);

  // Button to show the codePopUp
  const showPopUpButton = document.getElementById('show-popup-button');
  /**
  * Adding event listener when showPopUpButton is clicked
  */
  showPopUpButton.addEventListener('click', showCodePopUp);
}

/** ********************** Listeners for home page *********************** */

window.addEventListener('load', loadAddEventListeners);
