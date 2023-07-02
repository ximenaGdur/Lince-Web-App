/* eslint-disable class-methods-use-this */
/** ****************** Imports ******************* */
import {
  showCodePopUp,
  cancelPopUp,
// eslint-disable-next-line import/extensions
} from './codePopUp.js';

import {
  identifyMessage,
  addingEventById,
// eslint-disable-next-line import/extensions
} from './common.js';

/** ****************** Class for home page functions ******************* */

class HomePage {
  /**
   * Initializing all class atributes.
   */
  constructor() {
    // Button to create a room after entering a nickname.
    this.createRoomBtn = document.getElementById('create-room-button');
    // Credits tab content.
    this.creditsContent = document.getElementById('credits');
    // Instructions tab content.
    this.instructionsContent = document.getElementById('instructions');
    // Button to join a room after entering a nickname.
    this.joinRoomBtn = document.getElementById('show-popup-button');
    // Text field to enter player nickname.
    this.nicknameField = document.getElementById('nickname');
    // Input box inside popup
    this.popupInput = document.getElementById('popup-input');
    // Ranking tab content.
    this.rankingContent = document.getElementById('ranking');

    // Binding methods to the class instance
    this.enterNickname = this.enterNickname.bind(this);
    this.createSession = this.createSession.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.showCredits = this.showCredits.bind(this);
    this.showRanking = this.showRanking.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
  }

  /**
   * Lock or enable create room and join room buttons after entering a nickname.
   */
  enterNickname() {
    if (this.nicknameField) {
      const nickname = this.nicknameField.value;
      if (nickname.length > 0 && nickname.trim() !== '') {
        this.createRoomBtn.disabled = false;
        this.createRoomBtn.style.cursor = 'pointer';
        this.joinRoomBtn.style.cursor = 'pointer';
        this.joinRoomBtn.disabled = false;
        sessionStorage.setItem('playerNickname', nickname);
      } else {
        this.createRoomBtn.disabled = true;
        this.joinRoomBtn.disabled = true;
        this.createRoomBtn.style.cursor = 'default';
        this.joinRoomBtn.style.cursor = 'default';
      }
    }
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
  createSession(socket) {
    if (this.nicknameField) {
      const enteredNickname = this.nicknameField.value;
      const message = {
        type: 'createRoom',
        from: 'client',
        to: 'server',
        when: 'when a client presses the create room button with a valid nickname',
        nickname: enteredNickname,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Joins given room when button is clicked.
   */
  joinSession(socket) {
    if (this.nicknameField && this.popupInput) {
      const givenNickname = this.nicknameField.value;
      const givenCode = this.popupInput.value;

      const message = {
        type: 'addToRoom',
        from: 'client',
        to: 'server',
        when: 'when a client presses the join session button',
        nickname: givenNickname,
        sessionCode: givenCode,
      };
      socket.send(JSON.stringify(message));

      sessionStorage.setItem('roomCode', givenCode);
      window.location.href = './waitingRoom.xhtml';
    }
  }

  /**
   * Asks the server if room code is valid.
   */
  verifyCode(socket) {
    // Feedback given by server about given room code.
    const feedbackMessage = document.getElementById('room-validation-text');
    if (feedbackMessage && this.popupInput) {
      const givenCode = this.popupInput.value;
      if (givenCode.length === 5 && givenCode.trim() !== '') {
        const message = {
          type: 'validateCode',
          from: 'client',
          to: 'server',
          when: 'when a client types a room code',
          sessionCode: givenCode,
        };
        socket.send(JSON.stringify(message));
      } else {
        feedbackMessage.innerHTML = '';
      }
    }
  }

  /**
   * Shows credits tab.
   */
  showCredits() {
    if (this.creditsContent && this.rankingContent && this.instructionsContent) {
      this.creditsContent.style.display = 'flex';
      this.rankingContent.style.display = 'none';
      this.instructionsContent.style.display = 'none';
    }
  }

  /**
   * Shows ranking tab.
   */
  showRanking() {
    if (this.creditsContent && this.rankingContent && this.instructionsContent) {
      this.creditsContent.style.display = 'none';
      this.rankingContent.style.display = 'flex';
      this.instructionsContent.style.display = 'none';
    }
  }

  /**
   * Shows instructions tab.
   */
  showInstructions() {
    if (this.creditsContent && this.rankingContent && this.instructionsContent) {
      this.creditsContent.style.display = 'none';
      this.rankingContent.style.display = 'none';
      this.instructionsContent.style.display = 'flex';
    }
  }

  /**
   * Checks server response to whether code is valid or not.
   */
  handleCodeValidation(socket, receivedMessage) {
    // Feedback given by server about given room code.
    const feedbackMessage = document.getElementById('room-validation-text');
    // Button in codePopUp to join into a room
    const joinButton = document.getElementById('join-button');
    if (feedbackMessage && joinButton) {
      if (receivedMessage.isValid === false && receivedMessage.isStarted === false) {
        feedbackMessage.innerHTML = '¡Sala no existe!';
        joinButton.style.cursor = 'default';
        joinButton.disabled = true;
      } else if (receivedMessage.isValid === true && receivedMessage.isStarted === true) {
        feedbackMessage.innerHTML = '¡El juego en la sala ha comenzado!';
        joinButton.style.cursor = 'default';
        joinButton.disabled = true;
      } else {
        feedbackMessage.innerHTML = 'Sala encontrada';
        joinButton.style.cursor = 'pointer';
        joinButton.disabled = false;
      }
    }
  }

  /**
   * Indicates client room code.
   * @param {Object} message Message sent by the server.
   */
  handleRoomCode(socket, message) {
    sessionStorage.setItem('roomCode', message.sessionCode);
    window.location.href = './waitingRoom.xhtml';
  }
}

function addEventListeners() {
  // Socket that connects to server
  const socket = new WebSocket('ws://localhost:8009');
  // Creating instance of Home Page class.
  const page = new HomePage();

  if (socket && page) {
    /**
    * When a connection is made with server.
    */
    socket.addEventListener('open', () => {
      console.log('Conexión con Servidor');
    });

    /**
    * Event that occurs every time a message is received.
    */
    socket.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log(`Recibi del servidor: ${JSON.stringify(receivedMessage)}`);
      identifyMessage(page, socket, receivedMessage);
    });

    // Adding event for button that closes pop up.
    addingEventById('cancel-button', 'click', cancelPopUp, null);

    // Adding event for button that tells server to create room.
    addingEventById('create-room-button', 'click', page.createSession, socket);

    // Adding event for button that changes tab to Credits.
    addingEventById('credits-link', 'click', page.showCredits, null);

    // Adding event for button that changes tab to Instructions.
    addingEventById('instructions-link', 'click', page.showInstructions, null);

    // Adding event for button that changes tab to Ranking.
    addingEventById('ranking-link', 'click', page.showRanking, null);

    // Adding event for button that tells server to join to room.
    addingEventById('join-button', 'click', page.joinSession, socket);

    // Adding event for nickname field that detects when it is changed.
    addingEventById('nickname', 'input', page.enterNickname, null);

    // Adding event for code field that detects when it is changed.
    addingEventById('popup-input', 'input', page.verifyCode, socket);

    // Adding event for button that shows pop up.
    addingEventById('show-popup-button', 'click', showCodePopUp, null);
  }
}

/** ********************** Listeners for home page *********************** */

function loadPage() {
  sessionStorage.setItem('roomCode', '');
  sessionStorage.setItem('roomCode', '');
}

/**
 * When page is loaded, event listeners and page is set up
 */
function main() {
  addEventListeners();
  loadPage();
}

window.addEventListener('load', main);
