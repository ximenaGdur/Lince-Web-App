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
  sessionStorageInitialized,
// eslint-disable-next-line import/extensions
} from './common.js';

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
  // Minimum amount of cards per player permitted
  cardsPlayerMin = 5;

  // Maximum amount of cards per player permitted
  cardsPlayerMax = 20;

  // Minimum amount of cards per round permitted
  cardsRoundMin = 5;

  // Maximum amount of cards per round permitted
  cardsRoundMax = 400;

  // Boolean for information Icon event listener
  infoIconClicked = true;

  // Minimum amount of time permitted
  timeMin = 20;

  // Maximum amount of time permitted
  timeMax = 120;

  // Option 1a radio button.
  option1a = document.getElementById('Adp1a');

  // Option 1b radio button.
  option1b = document.getElementById('Adp1b');

  // Option 2a radio button.
  option2a = document.getElementById('Adp2a');

  // Option 2b radio button.
  option2b = document.getElementById('Adp2b');

  // Option 3a radio button.
  option3a = document.getElementById('Adp3a');

  // Option 3b radio button.
  option3b = document.getElementById('Adp3b');

  // Max time bar.
  maxTimeRange = document.getElementById('max-time-range');

  // Cards per player bar.
  cardsPerPlayerRange = document.getElementById('cards-per-player-range');

  // Cards per round bar.
  cardsPerRoundRange = document.getElementById('cards-per-round-range');

  // Start game button
  startButton = document.getElementById('start-button');

  /** ******************** Functions used on script ********************* */

  /**
   * Determines if elements are initialized.
   * @returns Whether elements are initialized.
   */
  elementsInitialized() {
    let isInitialized = false;
    if (this.startButton && this.maxTimeRange && this.cardsPerPlayerRange
      && this.cardsPerRoundRange && this.option1a && this.option1b
      && this.option2a && this.option2b && this.option3a && this.option3b
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
  handlePlayerList(receivedMessage) {
    // Container for all player table's rows.
    const playerTable = document.getElementById('waiting-room-ranking');
    // Player table in waiting room.
    addToTable(receivedMessage.players, playerTable);
    this.changeHost(receivedMessage);
  }

  /**
   * When server sends a message with personalized waiting room.
   */
  handleWaitingRoom(message) {
    // Container for all player table's rows.
    const playerTable = document.getElementById('waiting-room-ranking');
    if (message.isHost === false) {
      this.setToReadOnly();
    } else {
      this.setToEdit();
    }
    this.handlePlayerList(message, playerTable);
    this.handleConfiguration(message);
  }

  /**
   * Sends a message to the server to update the amount of cards per round.
   * @param {WebSocket} socket Socket that connects to server.
   */
  chooseCardsPerRound(socket) {
    const cardsRound = this.cardsPerRoundRange.value;
    this.cardsPerRoundValue.innerHTML = cardsRound;
    if (socket && sessionStorageInitialized() === true
      && this.elementsInitialized() === true) {
      const message = {
        type: 'setCardsPerRound',
        from: 'client',
        to: 'server',
        when: 'when a host client change the amount of card per round',
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
    if (socket && sessionStorageInitialized() === true
      && this.elementsInitialized() === true) {
      const time = this.maxTimeRange.value;
      this.maxTimeValue.innerHTML = `${time} s`;
      const message = {
        type: 'setMaxTime',
        from: 'client',
        to: 'server',
        when: 'when a host client change the max time',
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
    if (socket && sessionStorageInitialized() === true
      && this.elementsInitialized() === true) {
      const cardsPlayer = this.cardsPerPlayerRange.value;
      this.cardsPerPlayerValue.innerHTML = cardsPlayer;
      const message = {
        type: 'setCardsPerPlayer',
        from: 'client',
        to: 'server',
        when: 'when a host client change the cards per player',
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
  static chooseAdp1a(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp1a',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 1a',
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
  static chooseAdp1b(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp1b',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 1b',
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
  static chooseAdp2a(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp2a',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 2a',
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
  static chooseAdp2b(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp2b',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 2b',
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
  static chooseAdp3a(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp3a',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 3a',
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
  static chooseAdp3b(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'toggleAdp3b',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the adaptation 3b',
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
  static startGame(socket) {
    if (socket && sessionStorageInitialized() === true) {
      const message = {
        type: 'startGame',
        from: 'client',
        to: 'server',
        when: 'when a host client selects the start game botton',
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
  handleMaxTime(message) {
    if (this.maxTimeRange && this.maxTimeValue) {
      const time = message.maxTime;
      if (time >= this.timeMin && time < this.timeMax) {
        this.maxTimeValue.innerHTML = `${time} s`;
        this.maxTimeRange.value = time;
      }
    }
  }

  /**
   * When server sends a message indicating cards per round has to be updated
   * @param {Object} message Message received from server.
   */
  handleCardsPerRound(message) {
    if (this.cardsPerRoundValue && this.cardsPerRoundRange) {
      const amount = message.cardsPerRound;
      if (amount >= this.cardsRoundMin && amount < this.cardsRoundMax) {
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
  handleCardsPerPlayer(message) {
    if (this.cardsPerPlayerValue && this.cardsPerPlayerRange) {
      const amount = message.cardsPerPlayer;
      if (amount >= this.cardsPlayerMin && amount < this.cardsPlayerMax) {
        this.cardsPerPlayerValue.innerHTML = amount;
        this.cardsPerPlayerRange.value = amount;
      }
    }
  }

  /**
   * Starts game for a player.
   */
  static handleStartGame() {
    window.location.href = './game.xhtml';
  }

  /**
   * Returns user to home page when button is clicked.
   * Sends server a message to indicate player is leaving.
   * @param {WebSocket} socket Socket that connects to server
   */
  static returnToMain(socket) {
    // send message to server letting them know player is leaving.
    socket.send(createRemovePlayerMessage());
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.html';
  }
}

/** ******************* Listeners for waiting room ******************* */

/**
 * Adding event listeners to information icons.
 */
function addingInfoEvents() {
  const eventList = [
    document.getElementById('infoMaxTime'),
    document.getElementById('infoCardsPlayers'),
    document.getElementById('infoCardsPerRound'),
    document.getElementById('adaptation1-info'),
    document.getElementById('adaptation2-info'),
    document.getElementById('adaptation3-info'),
  ];
  if (eventList) {
    // Information icons that display information
    const informationIcons = document.getElementsByClassName('information-icon');
    if (informationIcons) {
      // Adding event listener to informationIcons
      for (let infoIndex = 0; infoIndex < informationIcons.length; infoIndex += 1) {
        const infoIcon = informationIcons[infoIndex];
        const infoText = eventList[infoIndex];
        if (infoIcon && infoText) {
          infoIcon.addEventListener('click', () => {
            infoText.style.display = 'flex';
          });
          setTimeout(() => {
            infoText.style.display = 'none';
          }, timeInformationText);
        }
      }
    }
  }
}

/**
 * Adding event listeners to all elements.
 */
function addEventListeners() {
  // Socket that connects to server
  const socket = new WebSocket('ws://localhost:8009');
  // Creating instance of Game Page class.
  const page = new WaitingRoomPage();

  if (socket && page) {
    /**
     * When a connection is made with server.
     */
    socket.addEventListener('open', () => {
      console.log('Conexión con Servidor');
      const message = {
        type: 'getWaitingRoom',
        from: 'client',
        to: 'server',
        when: 'when a client asks for a personalized waiting room',
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

    // Adding event for button that allows player to return to main page.
    addingEventById('accept-button', 'click', page.returnToMain, socket);

    // Adding event for cards per player bar.
    addingEventById('cards-per-player-range', 'change', page.chooseCardsPerPlayer, socket);

    // Adding event for cards per round bar.
    addingEventById('cards-per-round-range', 'change', page.chooseCardsPerRound, socket);

    // Adding event for button that allows player to close pop up.
    addingEventById('cancel-button', 'click', closePopUp);

    // Adding event for button that allows the user to see the exit popup.
    addingEventById('exit-button', 'click', showExitPopup);

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
}

/**
 * When page is loaded...
 */
function loadPage() {
  // Waiting Room Title
  const title = document.getElementById('waiting-room-title');
  if (roomCode && roomCode !== '') {
    title.innerHTML += roomCode;
  } else {
    const mainContent = document.getElementsByClassName('main-content');
    mainContent[0].innerHTML = '<h2 class="page-title" id="waiting-room-title">La sala no existe</h2>';
  }
}

/**
 * When page is loaded, event listeners and page is set up
 */
function main() {
  addEventListeners();
  loadPage();
}

/** ******************* Listeners for game page ******************* */

// Adding event listeners when the window is load
window.addEventListener('load', main);
