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
// eslint-disable-next-line import/extensions
} from './common.js';

/** ******************* Creating constants for script ******************* */

// Minimum amount of cards per player permitted
const cardsPlayerMin = 5;

// Maximum amount of cards per player permitted
const cardsPlayerMax = 20;

// Minimum amount of cards per round permitted
const cardsRoundMin = 5;

// Maximum amount of cards per round permitted
const cardsRoundMax = 400;

// Boolean for information Icon event listener
let infoIconClicked = true;

// Player nickname
const playerNickname = sessionStorage.getItem('playerNickname');

// Room Code
const roomCode = sessionStorage.getItem('roomCode');

// Minimum amount of time permitted
const timeMin = 20;

// Maximum amount of time permitted
const timeMax = 120;

/** ******************** Functions used on script ********************* */

/**
 * Sets ranges and radio buttons to read only.
 */
function setToReadOnly() {
  // Option 1a radio button.
  const option1a = document.getElementById('Adp1a');
  // Option 1b radio button.
  const option1b = document.getElementById('Adp1b');
  // Option 2a radio button.
  const option2a = document.getElementById('Adp2a');
  // Option 2b radio button.
  const option2b = document.getElementById('Adp2b');
  // Option 3a radio button.
  const option3a = document.getElementById('Adp3a');
  // Option 3b radio button.
  const option3b = document.getElementById('Adp3b');
  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  // Cards per player bar.
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');

  // Start game button
  const startButton = document.getElementById('start-button');
  startButton.disabled = true;
  startButton.style.cursor = 'default';

  maxTimeRange.disabled = true;
  maxTimeRange.style.cursor = 'default';

  cardsPerPlayerRange.disabled = true;
  cardsPerPlayerRange.style.cursor = 'default';

  cardsPerRoundRange.disabled = true;
  cardsPerRoundRange.style.cursor = 'default';

  option1a.disabled = true;
  option1a.style.cursor = 'default';
  option1b.disabled = true;
  option1b.style.cursor = 'default';
  option2a.disabled = true;
  option2a.style.cursor = 'default';
  option2b.disabled = true;
  option2b.style.cursor = 'default';
  option3a.disabled = true;
  option3a.style.cursor = 'default';
  option3b.disabled = true;
  option3b.style.cursor = 'default';
}

/**
 * Sets ranges and radio buttons to edit.
 */
function setToEdit() {
  // Option 1a radio button.
  const option1a = document.getElementById('Adp1a');
  // Option 1b radio button.
  const option1b = document.getElementById('Adp1b');
  // Option 2a radio button.
  const option2a = document.getElementById('Adp2a');
  // Option 2b radio button.
  const option2b = document.getElementById('Adp2b');
  // Option 3a radio button.
  const option3a = document.getElementById('Adp3a');
  // Option 3b radio button.
  const option3b = document.getElementById('Adp3b');
  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  // Cards per player bar.
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');

  // Start game button
  const startButton = document.getElementById('start-button');
  startButton.disabled = false;
  startButton.style.cursor = 'pointer';

  maxTimeRange.disabled = false;
  maxTimeRange.style.cursor = 'grab';

  cardsPerPlayerRange.disabled = false;
  cardsPerPlayerRange.style.cursor = 'grab';

  cardsPerRoundRange.disabled = false;
  cardsPerRoundRange.style.cursor = 'grab';

  option1a.disabled = false;
  option1a.style.cursor = 'pointer';
  option1b.disabled = false;
  option1b.style.cursor = 'pointer';
  option2a.disabled = false;
  option2a.style.cursor = 'pointer';
  option2b.disabled = false;
  option2b.style.cursor = 'pointer';
  option3a.disabled = false;
  option3a.style.cursor = 'pointer';
  option3b.disabled = false;
  option3b.style.cursor = 'pointer';
}

/**
 * Interprets current configuration and reflects it on screen
 * @param {*} message Message received from server.
 */
function handleConfiguration(message) {
  // Option 1a radio button.
  const option1a = document.getElementById('Adp1a');
  // Option 1b radio button.
  const option1b = document.getElementById('Adp1b');
  // Option 2a radio button.
  const option2a = document.getElementById('Adp2a');
  // Option 2b radio button.
  const option2b = document.getElementById('Adp2b');
  // Option 3a radio button.
  const option3a = document.getElementById('Adp3a');
  // Option 3b radio button.
  const option3b = document.getElementById('Adp3b');
  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  // Value for max time bar.
  const maxTimeValue = document.getElementById('max-time-value');
  // Cards per player bar.
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  // Value for cards per player bar.
  const cardsPerPlayerValue = document.getElementById('cards-per-player-value');
  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');
  // Value for cards per round bar.
  const cardsPerRoundValue = document.getElementById('cards-per-round-value');

  if (message.config) {
    const configMap = JSON.parse(message.config);
    option1a.checked = configMap.adaptation1a;
    option1b.checked = configMap.adaptation1b;
    option2a.checked = configMap.adaptation2a;
    option2b.checked = configMap.adaptation2b;
    option3a.checked = configMap.adaptation3a;
    option3b.checked = configMap.adaptation3b;

    maxTimeRange.value = configMap.maxTime;
    maxTimeValue.innerHTML = `${configMap.maxTime} s`;

    cardsPerPlayerRange.value = configMap.cardsPerPlayer;
    cardsPerPlayerValue.innerHTML = configMap.cardsPerPlayer;

    cardsPerRoundRange.value = configMap.cardsPerRound;
    cardsPerRoundValue.innerHTML = configMap.cardsPerRound;
  }
}

/**
 * Checks if current player is new host.
 * @param {Object} message Message sent by server.
 */
function changeHost(message) {
  const playerArray = JSON.parse(message.players);
  if (playerArray) {
    Object.keys(playerArray).forEach((nickname) => {
      if (Object.hasOwn(playerArray, nickname)) {
        const playerInfo = playerArray[nickname];
        if (nickname === playerNickname && playerInfo.host === true) {
          setToEdit();
        }
      }
    });
  }
}

/**
 * Handles player list received from server.
 * @param {Object} receivedMessage Message received from server.
 */
function handlePlayerList(receivedMessage) {
  // Container for all player table's rows.
  const playerTable = document.getElementById('waiting-room-ranking');
  // Player table in waiting room.
  addToTable(receivedMessage.players, playerTable);
  changeHost(receivedMessage);
}

/**
 * When server sends a message with personalized waiting room.
 */
function handleWaitingRoom(message) {
  // Container for all player table's rows.
  const playerTable = document.getElementById('waiting-room-ranking');
  if (message.isHost === false) {
    setToReadOnly();
  } else {
    setToEdit();
  }
  handlePlayerList(message, playerTable);
  handleConfiguration(message);
}

/**
 * Sends a message to the server to update the amount of cards per round.
 * @param {WebSocket} socket Socket that connects to server.
 */
function chooseCardsPerRound(socket) {
  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');
  // Value for cards per round bar.
  const cardsPerRoundValue = document.getElementById('cards-per-round-value');
  const cardsRound = cardsPerRoundRange.value;
  if (cardsPerRoundValue) {
    cardsPerRoundValue.innerHTML = cardsRound;
    if (socket) {
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
}

/**
 * Sends a message to the server to update the maximum time of the session.
 * @param {WebSocket} socket Socket that connects to server.
 */
function chooseMaxTime(socket) {
  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  // Value for max time bar.
  const maxTimeValue = document.getElementById('max-time-value');
  const time = maxTimeRange.value;
  if (maxTimeValue) {
    maxTimeValue.innerHTML = `${time} s`;
    if (socket) {
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
}

/**
 * Sends a message to the server to update the amount of cards per player.
 * @param {WebSocket} socket Socket that connects to server.
 */
function chooseCardsPerPlayer(socket) {
  // Cards per player bar.
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  // Value for cards per player bar.
  const cardsPerPlayerValue = document.getElementById('cards-per-player-value');
  const cardsPlayer = cardsPerPlayerRange.value;

  if (cardsPerPlayerRange && cardsPerPlayerValue) {
    cardsPerPlayerValue.innerHTML = cardsPlayer;
    if (socket) {
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
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 1a when the host client selects that option.
 * @param {WebSocket} socket Socket that connects to server.
 */
function chooseAdp1a(socket) {
  if (socket) {
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
function chooseAdp1b(socket) {
  if (socket) {
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
function chooseAdp2a(socket) {
  if (socket) {
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
function chooseAdp2b(socket) {
  if (socket) {
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
function chooseAdp3a(socket) {
  if (socket) {
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
function chooseAdp3b(socket) {
  if (socket) {
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
function startGame(socket) {
  if (socket) {
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
function handleAdp1a() {
  // Option 1a radio button.
  const option1a = document.getElementById('Adp1a');
  if (option1a) {
    option1a.checked = true;
  }
}

/**
 * Host has selected adaptation 1b.
 */
function handleAdp1b() {
  // Option 1b radio button.
  const option1b = document.getElementById('Adp1b');
  if (option1b) {
    option1b.checked = true;
  }
}

/**
 * Host has selected adaptation 2a.
 */
function handleAdp2a() {
  // Option 2a radio button.
  const option2a = document.getElementById('Adp2a');
  if (option2a) {
    option2a.checked = true;
  }
}

/**
 * Host has selected adaptation 2b.
 */
function handleAdp2b() {
  // Option 2b radio button.
  const option2b = document.getElementById('Adp2b');
  if (option2b) {
    option2b.checked = true;
  }
}

/**
 * Host has selected adaptation 3a.
 */
function handleAdp3a() {
  // Option 3a radio button.
  const option3a = document.getElementById('Adp3a');
  if (option3a) {
    option3a.checked = true;
  }
}

/**
 * Host has selected adaptation 3b.
 */
function handleAdp3b() {
  // Option 3b radio button.
  const option3b = document.getElementById('Adp3b');
  if (option3b) {
    option3b.checked = true;
  }
}

/**
 * When server sends a message indicating max time has to be updated
 * @param {Object} message Message received from server.
 */
function handleMaxTime(message) {
  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  // Value for max time bar.
  const maxTimeValue = document.getElementById('max-time-value');
  const time = message.maxTime;
  if (maxTimeValue && (time >= timeMin && time < timeMax)) {
    maxTimeValue.innerHTML = `${time} s`;
    maxTimeRange.value = time;
  }
}

/**
 * When server sends a message indicating cards per round has to be updated
 * @param {Object} message Message received from server.
 */
function handleCardsPerRound(message) {
  // Value for cards per round bar.
  const cardsPerRoundValue = document.getElementById('cards-per-round-value');
  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');
  const amount = message.cardsPerRound;
  if (cardsPerRoundValue && (amount >= cardsRoundMin && amount < cardsRoundMax)) {
    cardsPerRoundValue.innerHTML = amount;
    cardsPerRoundRange.value = amount;
  }
}

/**
 * Updates the value of the cards per player to the guest clients at the
 * moment in which a message from the server informing the new value is entered.
 * @param {Object} message Message received from server.
 */
function handleCardsPerPlayer(message) {
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  // Value for cards per player bar.
  const cardsPerPlayerValue = document.getElementById('cards-per-player-value');
  const amount = message.cardsPerPlayer;

  if (cardsPerPlayerValue && (amount >= cardsPlayerMin && amount < cardsPlayerMax)) {
    cardsPerPlayerValue.innerHTML = amount;
    cardsPerPlayerRange.value = amount;
  }
}

/**
 * Starts game for a player.
 */
function handleStartGame() {
  window.location.href = './game.xhtml';
}

/*
* Show the maxTimePopUp with the max time explanation
*/
function maxTimePopUp() {
  // Max Time information popUp
  const infoMaxTime = document.getElementById('infoMaxTime');
  if (infoIconClicked) {
    infoMaxTime.style.display = 'flex';
    infoIconClicked = false;
  } else {
    infoMaxTime.style.display = 'none';
    infoIconClicked = true;
  }
}

/*
* Show the cardsPerPlayer explanation
*/
function cardsPerPlayer() {
  // Max Time information popUp
  const infoCardsPlayers = document.getElementById('infoCardsPlayers');
  if (infoIconClicked) {
    infoCardsPlayers.style.display = 'flex';
    infoIconClicked = false;
  } else {
    infoCardsPlayers.style.display = 'none';
    infoIconClicked = true;
  }
}

/*
* Show the cardsPerRound explanation
*/
function cardsPerRound() {
  // Cards per Round information popUp
  const infoCardsPerRound = document.getElementById('infoCardsPerRound');
  if (infoIconClicked) {
    infoCardsPerRound.style.display = 'flex';
    infoIconClicked = false;
  } else {
    infoCardsPerRound.style.display = 'none';
    infoIconClicked = true;
  }
}

/**
 * Function that shows the explanation of the adaptions
 * @param {HTMLElement} adaptation Adaption chosen.
 */
function infoAdapPopUp(adaptation) {
  if (infoIconClicked) {
    document.getElementById(adaptation.srcElement.nextElementSibling.id).style.display = 'flex';
    infoIconClicked = false;
  } else {
    document.getElementById(adaptation.srcElement.nextElementSibling.id).style.display = 'none';
    infoIconClicked = true;
  }
}

/**
 * Returns user to home page when button is clicked.
 * Sends server a message to indicate player is leaving.
 * @param {WebSocket} socket Socket that connects to server
 */
function returnToMain(socket) {
  // Button that allows player to return to main page.
  const acceptButton = document.getElementById('accept-button');
  if (acceptButton) {
    // send message to server letting them know player is leaving.
    socket.send(createRemovePlayerMessage());
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.html';
  }
}

/** ******************* Listeners for waiting room ******************* */

/**
 * Adding event listeners to all elements.
 */
function addEventListeners() {
  // Socket that connects to server
  const socket = new WebSocket('ws://localhost:8009');
  if (socket) {
    /**
     * When a connection is made with server.
     */
    socket.addEventListener('open', () => {
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

    // Contains all above functions that are called when message is received.
    const functions = [
      handleWaitingRoom,
      handleAdp1a,
      handleAdp1b,
      handleAdp2a,
      handleAdp2b,
      handleAdp3a,
      handleAdp3b,
      handleMaxTime,
      handleCardsPerPlayer,
      handleCardsPerRound,
      handlePlayerList,
      handleStartGame,
    ];

    /**
     * Event that occurs every time a message is received.
     */
    socket.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);
      identifyMessage(functions, socket, receivedMessage);
    });
  }

  // Button that allows player to return to main page.
  const acceptButton = document.getElementById('accept-button');
  acceptButton.addEventListener('click', () => {
    returnToMain(socket);
  });

  // Cards per player bar.
  const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
  cardsPerPlayerRange.addEventListener('change', () => {
    chooseCardsPerPlayer(socket);
  });

  // Cards per round bar.
  const cardsPerRoundRange = document.getElementById('cards-per-round-range');
  cardsPerRoundRange.addEventListener('change', () => {
    chooseCardsPerRound(socket);
  });

  // Button that allows player to close pop up.
  const cancelButton = document.getElementById('cancel-button');
  cancelButton.addEventListener('click', closePopUp);

  // Button that allows the user to see the exit popup.
  const exitButton = document.getElementById('exit-button');
  exitButton.addEventListener('click', showExitPopup);

  // Information icons that display information
  const informationIcons = document.getElementsByClassName('information-icon');
  // Popup with information about adaptation 1
  const infoAdapt1 = document.getElementById('adaptation1-info');
  // Popup with information about adaptation 2
  const infoAdapt2 = document.getElementById('adaptation2-info');
  // Popup with information about adaptation 3
  const infoAdapt3 = document.getElementById('adaptation3-info');
  // Adding event listener to informationIcons[0]
  informationIcons[0].addEventListener('click', maxTimePopUp);
  // Adding event listener to informationIcons[1]
  informationIcons[1].addEventListener('click', cardsPerPlayer);
  // Adding event listener to informationIcons[2]
  informationIcons[2].addEventListener('click', cardsPerRound);
  // Adding event listener to informationIcons[3]
  informationIcons[3].addEventListener('click', infoAdapPopUp, infoAdapt1);
  // Adding event listener to informationIcons[4]
  informationIcons[4].addEventListener('click', infoAdapPopUp, infoAdapt2);
  // Adding event listener to informationIcons[5]
  informationIcons[5].addEventListener('click', infoAdapPopUp, infoAdapt3);

  // Max time bar.
  const maxTimeRange = document.getElementById('max-time-range');
  maxTimeRange.addEventListener('change', () => {
    chooseMaxTime(socket);
  });

  // Option 1a radio button.
  const option1a = document.getElementById('Adp1a');
  option1a.addEventListener('click', () => {
    chooseAdp1a(socket);
  });

  // Option 1b radio button.
  const option1b = document.getElementById('Adp1b');
  option1b.addEventListener('click', () => {
    chooseAdp1b(socket);
  });

  // Option 2a radio button.
  const option2a = document.getElementById('Adp2a');
  option2a.addEventListener('click', () => {
    chooseAdp2a(socket);
  });

  // Option 2b radio button.
  const option2b = document.getElementById('Adp2b');
  option2b.addEventListener('click', () => {
    chooseAdp2b(socket);
  });

  // Option 3a radio button.
  const option3a = document.getElementById('Adp3a');
  option3a.addEventListener('click', () => {
    chooseAdp3a(socket);
  });

  // Option 3b radio button.
  const option3b = document.getElementById('Adp3b');
  option3b.addEventListener('click', () => {
    chooseAdp3b(socket);
  });

  // Start game button
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    startGame(socket);
  });
}

/**
 * When page is loaded...
 */
function loadPage() {
  // Waiting Room Title
  const title = document.getElementById('waiting-room-title');
  if (roomCode) {
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
