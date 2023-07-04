/* eslint-disable class-methods-use-this */
/** ******************* Imports ******************* */

import {
  closePopUp,
  showExitPopup,
  createRemovePlayerMessage,
// eslint-disable-next-line import/extensions
} from './exitPopUp.js';

import {
  addToTable,
  identifyMessage,
  addingEventById,
  storageInitialized,
// eslint-disable-next-line import/extensions
} from './common.js';

import {
  serverIp,
  serverPort,
// eslint-disable-next-line import/extensions
} from './configClient.js';

/** ******************* Creating constants for script ******************* */

// Player nickname
const playerNickname = sessionStorage.getItem('playerNickname');

// Room Code
const roomCode = sessionStorage.getItem('roomCode');

// Player's favorite configuration
const roomConfig = localStorage.getItem('roomConfig');

// Maximum time information text is on screen
const timeInformationText = 10 * 1000;

class WaitingRoomPage {
  /**
   * Initializing all class atributes.
   */
  constructor() {
    // Minimum amount of cards per player permitted
    this.cardsPlayerMin = 5;
    // Maximum amount of cards per player permitted
    this.cardsPlayerMax = 20;
    // Minimum amount of cards per round permitted
    this.cardsRoundMin = 5;
    // Maximum amount of cards per round permitted
    this.cardsRoundMax = 400;
    // Boolean for information Icon event listener
    this.infoIconClicked = true;
    // Minimum amount of time permitted
    this.timeMin = 20;
    // Maximum amount of time permitted
    this.timeMax = 120;

    // Option 1a radio button.
    this.option1a = document.getElementById('Adp1a');
    // Option 1b radio button.
    this.option1b = document.getElementById('Adp1b');
    // Option 2a radio button.
    this.option2a = document.getElementById('Adp2a');
    // Option 2b radio button.
    this.option2b = document.getElementById('Adp2b');
    // Option 3a radio button.
    this.option3a = document.getElementById('Adp3a');
    // Option 3b radio button.
    this.option3b = document.getElementById('Adp3b');
    // Max time bar.
    this.maxTimeRange = document.getElementById('max-time-range');
    // Value for max time bar.
    this.maxTimeValue = document.getElementById('max-time-value');
    // Cards per player bar.
    this.cardsPerPlayerRange = document.getElementById('cards-per-player-range');
    // Value for cards per player bar.
    this.cardsPerPlayerValue = document.getElementById('cards-per-player-value');
    // Cards per round bar.
    this.cardsPerRoundRange = document.getElementById('cards-per-round-range');
    // Value for cards per round bar.
    this.cardsPerRoundValue = document.getElementById('cards-per-round-value');
    // Start game button
    this.startButton = document.getElementById('start-button');

    // Binding methods to the class instance
    this.returnToMain = this.returnToMain.bind(this);
    this.chooseCardsPerPlayer = this.chooseCardsPerPlayer.bind(this);
    this.chooseCardsPerRound = this.chooseCardsPerRound.bind(this);
    this.chooseMaxTime = this.chooseMaxTime.bind(this);
    this.chooseAdp1a = this.chooseAdp1a.bind(this);
    this.chooseAdp1b = this.chooseAdp1b.bind(this);
    this.chooseAdp2a = this.chooseAdp2a.bind(this);
    this.chooseAdp2b = this.chooseAdp2b.bind(this);
    this.chooseAdp3a = this.chooseAdp3a.bind(this);
    this.chooseAdp3a = this.chooseAdp3a.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  /** ******************** Functions used on script ********************* */

  /**
   * Determines if elements are initialized.
   * @returns Whether elements are initialized.
   */
  elementsInitialized() {
    let isInitialized = false;
    if (this.startButton && this.maxTimeRange && this.maxTimeValue
      && this.cardsPerPlayerRange && this.cardsPerPlayerValue
      && this.cardsPerRoundRange && this.cardsPerRoundValue
      && this.option1a && this.option1b
      && this.option2a && this.option2b
      && this.option3a && this.option3b
    ) {
      isInitialized = true;
    }
    return isInitialized;
  }

  /**
   * Sets ranges and radio buttons to read only.
   */
  setToReadOnly() {
    if (this.elementsInitialized() === true) {
      this.startButton.disabled = true;
      this.startButton.style.cursor = 'default';

      this.maxTimeRange.disabled = true;
      this.maxTimeRange.style.cursor = 'default';

      this.cardsPerPlayerRange.disabled = true;
      this.cardsPerPlayerRange.style.cursor = 'default';

      this.cardsPerRoundRange.disabled = true;
      this.cardsPerRoundRange.style.cursor = 'default';

      this.option1a.disabled = true;
      this.option1a.style.cursor = 'default';

      this.option1b.disabled = true;
      this.option1b.style.cursor = 'default';

      this.option2a.disabled = true;
      this.option2a.style.cursor = 'default';

      this.option2b.disabled = true;
      this.option2b.style.cursor = 'default';

      this.option3a.disabled = true;
      this.option3a.style.cursor = 'default';

      this.option3b.disabled = true;
      this.option3b.style.cursor = 'default';
    }
  }

  /**
   * Sets ranges and radio buttons to edit.
   */
  setToEdit() {
    if (this.elementsInitialized() === true) {
      this.startButton.disabled = false;
      this.startButton.style.cursor = 'pointer';

      this.maxTimeRange.disabled = false;
      this.maxTimeRange.style.cursor = 'grab';

      this.cardsPerPlayerRange.disabled = false;
      this.cardsPerPlayerRange.style.cursor = 'grab';

      this.cardsPerRoundRange.disabled = false;
      this.cardsPerRoundRange.style.cursor = 'grab';

      this.option1a.disabled = false;
      this.option1a.style.cursor = 'pointer';

      this.option1b.disabled = false;
      this.option1b.style.cursor = 'pointer';

      this.option2a.disabled = false;
      this.option2a.style.cursor = 'pointer';

      this.option2b.disabled = false;
      this.option2b.style.cursor = 'pointer';

      this.option3a.disabled = false;
      this.option3a.style.cursor = 'pointer';

      this.option3b.disabled = false;
      this.option3b.style.cursor = 'pointer';
    }
  }

  /**
   * Interprets current configuration and reflects it on screen
   * @param {Object} message Message received from server.
   */
  handleConfiguration(message) {
    const configMap = JSON.parse(message.config);
    if (configMap && this.elementsInitialized() === true) {
      this.option1a.checked = configMap.adaptation1a;
      this.option1b.checked = configMap.adaptation1b;

      this.option2a.checked = configMap.adaptation2a;
      this.option2b.checked = configMap.adaptation2b;

      this.option3a.checked = configMap.adaptation3a;
      this.option3b.checked = configMap.adaptation3b;

      this.maxTimeRange.value = configMap.maxTime;
      this.maxTimeValue.innerHTML = `${configMap.maxTime} s`;

      this.cardsPerPlayerRange.value = configMap.cardsPerPlayer;
      this.cardsPerPlayerValue.innerHTML = configMap.cardsPerPlayer;

      this.cardsPerRoundRange.value = configMap.cardsPerRound;
      this.cardsPerRoundValue.innerHTML = configMap.cardsPerRound;
    }
  }

  /**
   * Checks if current player is new host.
   * @param {Object} message Message sent by server.
   */
  changeHost(message) {
    const playerArray = JSON.parse(message.players);
    if (playerArray && playerNickname) {
      Object.keys(playerArray).forEach((nickname) => {
        if (Object.hasOwn(playerArray, nickname)) {
          const playerInfo = playerArray[nickname];
          if (nickname === playerNickname && playerInfo.host === true) {
            this.setToEdit();
          }
        }
      });
    }
  }

  /**
   * Handles player list received from server.
   * @param {Object} receivedMessage Message received from server.
   */
  handlePlayerList(socket, receivedMessage) {
    // Container for all player table's rows.
    const playerTable = document.getElementById('waiting-room-ranking');
    // Player table in waiting room.
    addToTable(receivedMessage.players, playerTable, playerNickname);
    this.changeHost(receivedMessage);
  }

  /**
   * When server sends a message with personalized waiting room.
   */
  handleWaitingRoom(socket, message) {
    if (message.isHost === false) {
      this.setToReadOnly();
    } else {
      this.setToEdit();
    }
    this.handlePlayerList(null, message);
    this.handleConfiguration(message);
  }

  /**
   * Sends a message to the server to update the amount of cards per round.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseCardsPerRound(socket) {
    const cardsRound = this.cardsPerRoundRange.value;
    this.cardsPerRoundValue.innerHTML = cardsRound;
    if (socket && storageInitialized() === true
      && this.elementsInitialized() === true) {
      const message = {
        type: 'setCardsPerRound',
        nickname: playerNickname,
        sessionCode: roomCode,
        cardsPerRound: cardsRound,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the maximum time of the session.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseMaxTime(socket) {
    if (socket && storageInitialized() === true
      && this.elementsInitialized() === true) {
      const time = this.maxTimeRange.value;
      this.maxTimeValue.innerHTML = `${time} s`;
      const message = {
        type: 'setMaxTime',
        nickname: playerNickname,
        sessionCode: roomCode,
        maxTime: time,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the amount of cards per player.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseCardsPerPlayer(socket) {
    if (socket && storageInitialized() === true
      && this.elementsInitialized() === true) {
      const cardsPlayer = this.cardsPerPlayerRange.value;
      this.cardsPerPlayerValue.innerHTML = cardsPlayer;
      const message = {
        type: 'setCardsPerPlayer',
        nickname: playerNickname,
        sessionCode: roomCode,
        cardsPerPlayer: cardsPlayer,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 1a when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp1a(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp1a',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 1b when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp1b(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp1b',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 2a when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp2a(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp2a',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 2b when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp2b(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp2b',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 3a when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp3a(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp3a',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Sends a message to the server to update the value of the first own
   * adaptation as 3b when the host client selects that option.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseAdp3b(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'toggleAdp3b',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Starts game for all players.
   * @param {WebSocket} socket Socket that connects to server.
   */
  startGame(socket) {
    if (socket && storageInitialized() === true) {
      const message = {
        type: 'startGame',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
      window.location.href = './game.xhtml';
    }
  }

  /**
   * Host has selected adaptation 1a.
   */
  handleAdp1a() {
    if (this.option1a) {
      this.option1a.checked = true;
    }
  }

  /**
   * Host has selected adaptation 1b.
   */
  handleAdp1b() {
    if (this.option1b) {
      this.option1b.checked = true;
    }
  }

  /**
   * Host has selected adaptation 2a.
   */
  handleAdp2a() {
    if (this.option2a) {
      this.option2a.checked = true;
    }
  }

  /**
   * Host has selected adaptation 2b.
   */
  handleAdp2b() {
    if (this.option2b) {
      this.option2b.checked = true;
    }
  }

  /**
   * Host has selected adaptation 3a.
   */
  handleAdp3a() {
    if (this.option3a) {
      this.option3a.checked = true;
    }
  }

  /**
   * Host has selected adaptation 3b.
   */
  handleAdp3b() {
    if (this.option3b) {
      this.option3b.checked = true;
    }
  }

  /**
   * When server sends a message indicating max time has to be updated
   * @param {Object} message Message received from server.
   */
  handleMaxTime(socket, message) {
    if (this.maxTimeRange && this.maxTimeValue) {
      const time = message.maxTime;
      if (time >= this.timeMin && time <= this.timeMax) {
        this.maxTimeValue.innerHTML = `${time} s`;
        this.maxTimeRange.value = time;
      }
    }
  }

  /**
   * When server sends a message indicating cards per round has to be updated
   * @param {Object} message Message received from server.
   */
  handleCardsPerRound(socket, message) {
    if (this.cardsPerRoundValue && this.cardsPerRoundRange) {
      const amount = message.cardsPerRound;
      if (amount >= this.cardsRoundMin && amount <= this.cardsRoundMax) {
        this.cardsPerRoundValue.innerHTML = amount;
        this.cardsPerRoundRange.value = amount;
      }
    }
  }

  /**
   * Updates the value of the cards per player to the guest clients at the
   * moment in which a message from the server informing the new value is entered.
   * @param {Object} message Message received from server.
   */
  handleCardsPerPlayer(socket, message) {
    if (this.cardsPerPlayerValue && this.cardsPerPlayerRange) {
      const amount = message.cardsPerPlayer;
      if (amount >= this.cardsPlayerMin && amount <= this.cardsPlayerMax) {
        this.cardsPerPlayerValue.innerHTML = amount;
        this.cardsPerPlayerRange.value = amount;
      }
    }
  }

  /**
   * Starts game for a player.
   */
  handleStartGame() {
    window.location.href = './game.xhtml';
  }

  /**
   * Returns user to home page when button is clicked.
   * Sends server a message to indicate player is leaving.
   * @param {WebSocket} socket Socket that connects to server
   */
  returnToMain(socket) {
    console.log('ESTOY SALIENDO');
    if (socket) {
      // send message to server letting them know player is leaving.
      const message = createRemovePlayerMessage();
      if (message) {
        socket.send(message);
      }
    }
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.html';
  }
}

/** ******************* Listeners for waiting room ******************* */

/**
 * Adding event listeners to information icons.
 */
function addingInfoEvents() {
  // Information icons that display information
  const informationIcons = document.getElementsByClassName('information-icon');
  const informationText = document.getElementsByClassName('option-description');
  if (informationIcons.length === informationText.length) {
    // Adding event listener to informationIcons
    for (let infoIndex = 0; infoIndex < informationIcons.length; infoIndex += 1) {
      const infoIcon = informationIcons[infoIndex];
      const infoText = informationText[infoIndex];
      if (infoIcon && infoText) {
        infoIcon.addEventListener('click', () => {
          infoText.style.display = 'flex';
          setTimeout(() => {
            infoText.style.display = 'none';
          }, timeInformationText);
        });
      }
    }
  }
}

/**
 * Adding event listeners to all elements.
 */
function addEventListeners() {
  // Socket that connects to server
  const socket = new WebSocket(`ws://${serverIp}:${serverPort}`);
  // Creating instance of Game Page class.
  const page = new WaitingRoomPage();

  if (socket && page && storageInitialized() === true) {
    /**
     * When a connection is made with server.
     */
    socket.addEventListener('open', () => {
      console.log('Conexión con Servidor');
      const message = {
        type: 'getWaitingRoom',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    });

    /**
     * Event that occurs every time a message is received.
     */
    socket.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage) {
        console.log(`Recibi del servidor: ${JSON.stringify(receivedMessage)}`);
        identifyMessage(page, socket, receivedMessage);
      }
    });
  }

  // Adding event for button that allows player to return to main page.
  addingEventById('accept-button', 'click', page.returnToMain, socket);

  // Adding event for cards per player bar.
  addingEventById('cards-per-player-range', 'change', page.chooseCardsPerPlayer, socket);

  // Adding event for cards per round bar.
  addingEventById('cards-per-round-range', 'change', page.chooseCardsPerRound, socket);

  // Adding event for button that allows player to close pop up.
  addingEventById('cancel-button', 'click', closePopUp, null);

  // Adding event for button that allows the user to see the exit popup.
  addingEventById('exit-button', 'click', showExitPopup, null);

  // Adding event for informationIcons
  addingInfoEvents();

  // Adding event for max time bar.
  addingEventById('max-time-range', 'change', page.chooseMaxTime, socket);

  // Adding event for radio button.
  addingEventById('Adp1a', 'click', page.chooseAdp1a, socket);

  // Adding event for radio button.
  addingEventById('Adp1b', 'click', page.chooseAdp1b, socket);

  // Adding event for radio button.
  addingEventById('Adp2a', 'click', page.chooseAdp2a, socket);

  // Adding event for radio button.
  addingEventById('Adp2b', 'click', page.chooseAdp2b, socket);

  // Adding event for radio button.
  addingEventById('Adp3a', 'click', page.chooseAdp3a, socket);

  // Adding event for radio button.
  addingEventById('Adp3b', 'click', page.chooseAdp3b, socket);

  // Adding event for button that allows player to start game
  addingEventById('start-button', 'click', page.startGame, socket);
}

/**
 * When page is loaded...
 */
function loadPage() {
  // Waiting Room Title
  const title = document.getElementById('waiting-room-title');
  if (title) {
    if (storageInitialized() === true) {
      title.innerHTML += roomCode;
    } else {
      const mainContent = document.getElementsByClassName('main-content');
      mainContent[0].innerHTML = `<h2 class="page-title" id="waiting-room-title">
                                    La sala no existe
                                  </h2>`;
      mainContent[0].innerHTML
      += `<ul class="buttons">
            <li class="large-button-container">
              <button class="large-button" id="exit-button" type="button">
                Salir
              </button>
            </li>
          </ul>`;
      mainContent[0].innerHTML
      += `<article class="popup" id="exit-popup">
            <h2 class="popup-title">
                ¿Seguro que quieres abandonar la partida y regresar a la página de inicio?
            </h2>
            <ul class="buttons">
                <li class="small-button-container">
                  <button class="small-button" id="accept-button" type="button">
                      Aceptar
                  </button>
                </li>
            </ul>
          </article>`;
    }
  }
}

/**
 * When page is loaded, event listeners and page is set up
 */
function main() {
  loadPage();
  addEventListeners();
}

/** ******************* Listeners for game page ******************* */

// Adding event listeners when the window is load
window.addEventListener('load', main);
