/* eslint-disable linebreak-style */
/** ******************* Imports ******************* */

import {
  continueSession,
  returnToMainPage,
// eslint-disable-next-line import/extensions
} from './finishedPopUp.js';

import {
  closePopUp,
  showExitPopup,
  createRemovePlayerMessage,
// eslint-disable-next-line import/extensions
} from './exitPopUp.js';

/** ******************* Creating constants for script ******************* */

// Button that allows player to return to main page.
const acceptButton = document.getElementById('accept-button');

// Contains all game board cards
const boardImages = document.getElementsByClassName('board-image-container');

// Percentage of time when blur happens
const blurPorcentage = 95;

// Time when blur happens
let blurTime = null;

// Button that allows player to continue session.
const continueButton = document.getElementById('continue-button');

// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');

// Button that allows the user to see the exit popup.
const exitButton = document.getElementById('exit-button');

// Contains information of player card to match
let firstCard = null;

// Button that allows player to exit session.
const homeButton = document.getElementById('home-button');

// Maximum time chosen
const maxTime = 5000;

// Contains all cards
const myImage = document.getElementsByClassName('my-image');

// Contains all player cards
const myImages = document.getElementsByClassName('my-image-container');

// Pop Up that is shown when game is finished.
const popUpFinished = document.getElementById('popUpFinished');

// Socket that connects to server
const socket = new WebSocket('ws://localhost:8009');

// Contains all word cards
const word = document.getElementsByClassName('word');

/** ******************* Functions used on script ******************* */

/**
 * When page is loaded...
 */
function loadPage() {
  // blurTime = (maxTime * 100) / blurPorcentage;
  // applyBlurTimeout = setTimeout(handleBlur, blurTime);
}

/**
 * When player chooses a card .
 */
function match(secondCard) {
  if (firstCard) {
    const message = {
      type: 'checkMatch',
      from: 'player',
      to: 'server',
      when: 'when a player makes a match',
      nickname: sessionStorage.getItem('playerNickname'),
      roomCode: sessionStorage.getItem('roomCode'),
      playerCard: firstCard.getAttribute('id'),
      boardCard: secondCard.getAttribute('id'),
    };
    socket.send(JSON.stringify(message));
    console.log(sessionStorage.getItem('playerNickname'));
    console.log(sessionStorage.getItem('roomCode'));
    console.log(firstCard.getAttribute('id'));
    console.log(secondCard.getAttribute('id'));
  } else {
    console.log('Escoga ficha de su mano primero.');
  }
}

/**
 * Handles response from server to player match.
 */
function handleMatchResponse(receivedMessage) {
  if (receivedMessage.match === true) {
    console.log('El match es correcto');
  } else {
    console.log('El match es incorrecto');
  }
}

/**
 * Applies blur to player.
 */
function handleBlur() {
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
 * If image adaption is chosen, it asigns a random border color.
 */
function changeImageColors() {
  for (let index = 0; index < boardImages.length; index += 1) {
    boardImages[index].style.borderColor = randomBorderColor();
  }
}

function storeFirstMatch(card) {
  firstCard = card;
}



/**
 * Change the pictures on the player's cards to the corresponding words.
 */
function changeImagesToWords() {
  // Iterate through each image and replace its content with the attribute "alt"
  for (let index = 0; index < myImage.length; index += 1) {
    myImage[index].style.display = 'none';
    word[index].style.display = 'flex';
    // Changes box to fit words.
    myImages[index].style.maxWidth = 'max-content';
  }
}

/*
*   Handles scores of the players
*   players => array of players
*   scores => map with (player, score)
*/
function handleScores() {
  const players = [];
  const scores = new Map();
  players.forEach((player) => {
    player.updateScore(scores.get(player));
  });
}

/** ******************* TIME FUNCTIONS ******************* */

/** handleMaxTime
 * when changing max time, update
 */
function updateTime(time) {
  const timeLeft = time;
  let timer = 'Tiempo';
  timer += 'time'; // hay que acomodar el dato para mostrarlo en la vista ( 0:00 )
  document.getElementById('isValid').innerHTML = timer;
  updateScreen();
}

/** handleTimesUp
 * if time runs out the game is over
 */
function TimesUp(time) {
  if (time === 0) {
    popUpFinished.style.display = 'flex';
  }
  // block everything later
}

/**
 * Returns user to home page when button is clicked.
 * Sends server a message to indicate player is leaving.
 */
function returnToMain() {
  if (acceptButton) {
    // send message to server letting them know player is leaving.
    socket.send(createRemovePlayerMessage());
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.html';
  }
}

/**
 * Identifying message type in order to call appropiate function.
 */
function identifyMessage(receivedMessage) {
  switch (receivedMessage.type) {
    case 'handleMatchResponse':
      handleMatchResponse(receivedMessage);
      break;
    case 'handleScores':
      handleScores(receivedMessage);
      break;
    case 'handleTimesUp':
      handleTimesUp(receivedMessage);
      break;
    case 'handleBlur':
      handleBlur(receivedMessage);
      break;
    case 'handleExtraCards':
      handleExtraCards(receivedMessage);
      break;
    default:
      console.error('No se reconoce ese mensaje.');
  }
}

/** ******************* Listeners for game page ******************* */

// Adding event listeners when the window is load
window.addEventListener('load', loadPage);

/**
 * When a connection is made with server.
 */
socket.addEventListener('open', () => {
  console.log('Conectado al servidor desde Game Page.');
});

/**
 * When a connection is made with server.
 */
// socket.addEventListener('close', closeTab());

/**
 * Event that occurs every time a message is received.
 */
socket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log(`Recibi del servidor: ${JSON.stringify(receivedMessage)}`);
  identifyMessage(receivedMessage);
});

// Adding event listener to cancelButton
cancelButton.addEventListener('click', closePopUp);

// Adding event listener to continueButton
continueButton.addEventListener('click', continueSession);

// Adding event listener to exitButton
exitButton.addEventListener('click', showExitPopup);

// Adding event listener to homeButton
homeButton.addEventListener('click', returnToMainPage);

for (let index = 0; index < myImages.length; index += 1) {
  const card = myImages[index];
  card.addEventListener('click', () => {
    storeFirstMatch(card);
  });
}

for (let index = 0; index < boardImages.length; index += 1) {
  const boardCard = boardImages[index];
  //const imageCard = boardImages[index].getElementsByClassName('board-image');
  boardCard.addEventListener('click', () => {
    match(boardCard);
  });
}
