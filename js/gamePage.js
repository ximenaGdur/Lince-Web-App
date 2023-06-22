/** ******************* Imports ******************* */

import {
  continueSession,
// eslint-disable-next-line import/extensions
} from './finishedPopUp.js';

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

// Contains information of player card to match
let firstCard = null;

// Interval that changes time each second.
let secondInterval = null;

// Current time in game
let time = 0;

// Player nickname
const playerNickname = sessionStorage.getItem('playerNickname');

// Room Code
const roomCode = sessionStorage.getItem('roomCode');

// Current player score
let score = 0;

/** ******************* Functions used on script ******************* */

/**
 * Lets server know time is up or player hand is empty.
 */
function stopGame(socket) {
  if (secondInterval) {
    clearInterval(secondInterval);
    const message = {
      type: 'finishGame',
      from: 'client',
      to: 'server',
      when: 'when a host client lets server know time is up',
      nickname: playerNickname,
      sessionCode: roomCode,
    };
    socket.send(JSON.stringify(message));
  }
}

/**
 * Updates time on screen.
 */
function updateTime() {
  time -= 1;
  const timeString = `Tiempo: ${time} segundos`;
  document.getElementById('current-time').innerHTML = timeString;
}

/**
 * Updates board with corresponding cards.
 * @param {Map} message Message from server.
 */
function handleBoardCards(message) {
  console.log(`handleBoardCards: ${message}`);
}

/**
 * Updates player hand with corresponding cards.
 * @param {Map} message Message from server.
 */
function handlePlayerCards(message) {
  console.log(`handlePlayerCards: ${message}`);
}

/**
 * Handles player list received from server.
 * @param {Object} receivedMessage Message received from server.
 */
function handlePlayerList(receivedMessage) {
  // Player table with ranking during game.
  const gamePlayerTable = document.getElementById('game-ranking');
  addToTable(receivedMessage.players, gamePlayerTable);
}

/**
 * When server sends a message with personalized waiting room.
 */
function handleGameRoom(message, socket) {
  // Player table with ranking during game.
  const gamePlayerTable = document.getElementById('game-ranking');
  time = message.maxTime;
  const matchDuration = time * 1000;
  setTimeout(() => stopGame(socket), matchDuration);
  secondInterval = setInterval(updateTime, 1000);

  handleBoardCards(message);
  handlePlayerCards(message);
  handlePlayerList(message, gamePlayerTable);
}

/**
 * When player chooses a card in hand.
 */
function storeFirstMatch(card) {
  // Contains all player cards
  const myImages = document.getElementsByClassName('my-image-container');
  for (let index = 0; index < myImages.length; index += 1) {
    const otherCard = myImages[index];
    otherCard.style.background = '';
  }
  card.style.background = '#E6CCD7';
  firstCard = card;
}

/**
 * When player chooses a card in board.
 */
function match(socket, secondCard) {
  if (firstCard) {
    const message = {
      type: 'checkMatch',
      from: 'player',
      to: 'server',
      when: 'when a player makes a match',
      nickname: sessionStorage.getItem('playerNickname'),
      sessionCode: sessionStorage.getItem('roomCode'),
      playerCard: firstCard.getAttribute('id'),
      boardCard: secondCard.getAttribute('id'),
    };
    socket.send(JSON.stringify(message));
  } else {
    console.log('Escoga ficha de su mano primero.');
  }
  firstCard.style.background = '';
  secondCard.style.background = '';
  firstCard = null;
}

/**
 * Handles response from server to player match.
 */
function handleMatchResponse(receivedMessage) {
  // Correct match sound
  const correctMatchSound = document.getElementById('correctoMatchSound');
  // Incorrect match sound
  const incorrectoMatchSound = document.getElementById('incorrectoMatchSound');
  score = receivedMessage.newScore;
  const scoreString = `Puntaje: ${score}`;
  document.getElementById('player-score').innerHTML = scoreString;
  if (receivedMessage.isCorrectMatch === true) {
    console.log('El match es correcto');
    correctMatchSound.play();
  } else {
    console.log('El match es incorrecto');
    incorrectoMatchSound.play();
  }
}

/**
 * When timer runs out or player has finished their cards...
 * @param {Map} message Message sent by server.
 */
function handleTimesUp(message) {
  // Player table with ranking in popup
  const popUpPlayerTable = document.getElementById('popup-ranking');
  // Pop Up that is shown when game is finished.
  const popUpFinished = document.getElementById('popup-finished');
  if (popUpFinished) {
    handlePlayerList(message, popUpPlayerTable);
    popUpFinished.style.display = 'flex';
  }
}

/**
 * Applies blur to player.
 */
function handleBlur() {
  // Contains all game board cards
  const boardImages = document.getElementsByClassName('board-image-container');
  if (boardImages) {
    for (let imageIndex = 0; imageIndex < boardImages.length; imageIndex += 1) {
      boardImages[imageIndex].style.filter = 'blur(2.5px)';
    }
  }
}

/**
 * Generates a random color for image border.
 */
function randomBorderColor() {
  // Código tomado de: https://www.delftstack.com/es/howto/javascript/javascript-pick-random-from-array/
  const colorsArray = ['#E6C700', '#2EB600', '#006DE2', '#DA0012'];
  const randomIndex = Math.floor(Math.random() * colorsArray.length);
  const randomColor = colorsArray[randomIndex];
  return randomColor;
}

/**
 * If image adaptation is chosen, it asigns a random border color.
 */
function changeImageColors() {
  const boardImages = document.getElementsByClassName('board-image-container');
  for (let index = 0; index < boardImages.length; index += 1) {
    boardImages[index].style.borderColor = randomBorderColor();
  }
}

/**
 * Change the pictures on the player's cards to the corresponding words.
 */
function changeImagesToWords() {
  // Contains all cards
  const myImage = document.getElementsByClassName('my-image');
  // Contains all player cards
  const myImages = document.getElementsByClassName('my-image-container');
  // Contains all word cards
  const word = document.getElementsByClassName('word');
  // Iterate through each image and replace its content with the attribute "alt"
  for (let index = 0; index < myImage.length; index += 1) {
    myImage[index].style.display = 'none';
    word[index].style.display = 'flex';
    // Changes box to fit words.
    myImages[index].style.maxWidth = 'max-content';
  }
}

/**
 *
 * @param {*} receivedMessage
 */
function handleExtraCards(receivedMessage) {
  console.log(`receivedMessage: ${receivedMessage}`);
}

/**
 * Returns user to home page when button is clicked.
 * Sends server a message to indicate player is leaving.
 */
function returnToMain(socket) {
  // send message to server letting them know player is leaving.
  socket.send(createRemovePlayerMessage());
  // Aqui se manda el msj de eliminar el jugador de la lista.
  window.location.href = './index.html';
}

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
      console.log('Conectado al servidor desde Game Page.');
      const message = {
        type: 'getGameRoom',
        from: 'client',
        to: 'server',
        when: 'when a client asks for a personalized game room',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    });

    // Contains all above functions that are called when message is received.
    const functions = [
      handleGameRoom,
      handlePlayerList,
      handleMatchResponse,
      handleTimesUp,
      handleBlur,
      handleExtraCards,
    ];
    /**
     * Event that occurs every time a message is received.
     */
    socket.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log(`Recibi del servidor: ${JSON.stringify(receivedMessage)}`);
      identifyMessage(functions, socket, receivedMessage);
    });
  }

  // Button that allows player to return to main page.
  const acceptButton = document.getElementById('accept-button');
  acceptButton.addEventListener('click', () => {
    returnToMain(socket);
  });

  // Button that allows player to close pop up.
  const cancelButton = document.getElementById('cancel-button');
  cancelButton.addEventListener('click', closePopUp);

  // Button that allows player to continue session.
  const continueButton = document.getElementById('continue-button');
  continueButton.addEventListener('click', continueSession);

  // Button that allows the user to see the exit popup.
  const exitButton = document.getElementById('exit-button');
  exitButton.addEventListener('click', showExitPopup);

  // Button that allows player to exit session.
  const homeButton = document.getElementById('home-button');
  homeButton.addEventListener('click', () => {
    returnToMain(socket);
  });

  // Contains all player cards
  const myImages = document.getElementsByClassName('my-image-container');
  // Add an event listener to each of the cards player
  for (let index = 0; index < myImages.length; index += 1) {
    const card = myImages[index];
    card.addEventListener('click', () => {
      storeFirstMatch(card);
    });
  }

  // Contains all game board cards
  const boardImages = document.getElementsByClassName('board-image-container');
  // Add an event listener to each of the cards on the game board
  for (let index = 0; index < boardImages.length; index += 1) {
    const boardCard = boardImages[index];
    boardCard.addEventListener('click', () => {
      boardCard.style.background = '#E6CCD7';
      match(socket, boardCard);
    });
  }
}

/**
 * Loads page elements with specific information.
 */
function loadPage() {
  if (roomCode) {
    const scoreString = `Puntaje: ${score}`;
    document.getElementById('player-score').innerHTML = scoreString;
  } else {
    const mainContent = document.getElementsByClassName('main-content');
    mainContent[0].innerHTML = '<h2 class="page-title" id="waiting-room-title">La sala no existe</h2>';
    mainContent[0].innerHTML += '<img class="information-icon" src="/design/images/Icons/informationIcon.png" alt="información"></img>';
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
