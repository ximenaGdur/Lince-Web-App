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

// Contains room configuration
let configMap = null;

// Contains information of player card to match
let firstCard = null;

// Player nickname
const playerNickname = localStorage.getItem('playerNickname');

// Room Code
const roomCode = localStorage.getItem('roomCode');

// Current player score
let score = 0;

// Interval that changes time each second.
let secondInterval = null;

// Current time in game
let time = 0;

/** ******************* Functions used on script ******************* */

/**
 * Updates time on screen.
 * @param {Number} currentTime Current time to show on screen.
 */
function updateTime(currentTime) {
  const timeString = `Tiempo: ${currentTime} segundos`;
  document.getElementById('current-time').innerHTML = timeString;
}

/**
 * Disables board images.
 * TODO: fix, still detecting click.
 */
function disableBoard() {
  // Contains all player cards
  const boardImage = document.getElementsByClassName('board-image-container');
  // const myImages = document.getElementsByClassName('my-image-container');
  // Add an event listener to each of the cards player
  for (let index = 0; index < boardImage.length; index += 1) {
    const card = boardImage[index];
    console.log(card);
    card.removeEventListener('click', () => {});
  }
  const exitButton = document.getElementById('exit-button');
  exitButton.disabled = true;
}

// BLOQUEAR EL EVENTO CLICK EN TODAS LAS CARTAS AL TERMINAR UNA PARTIDA

/**
 * Lets server know time is up or player hand is empty.
 * @param {WebSocket} socket Socket that connects to server.
 */
function stopGame(socket) {
  if (secondInterval) {
    clearInterval(secondInterval);
    updateTime(0);
    disableBoard();
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

function createContentElement(imageText, route, className, type) {
  let contentElement = null;
  const imageRoute = `/design/images/icons/board/${route}`;

  // If player has selected words
  if (configMap.adaptation1a && type === 'player') {
    contentElement = document.createElement('p');
    contentElement.classList.add('word');
    contentElement.textContent = imageText;
  } else if (configMap.adaptation1b && type === 'player') {
    contentElement = document.createElement('p');
    contentElement.classList.add('word');
    const imgText = imageText.replace(/[aeiou]/g, '_');
    contentElement.textContent = imgText;
  // If player has selected images
  } else {
    contentElement = document.createElement('img');
    contentElement.classList.add(className);
    contentElement.src = imageRoute;
    contentElement.alt = `Icono de ${imageText}`;
  }
  return contentElement;
}

/**
 * When player chooses a card in board.
 * @param {WebSocket} socket Socket that connects to server.
 * @param {HTMLElement} secondCard Second card player has clicked.
 */
function match(socket, secondCard) {
  if (firstCard) {
    const message = {
      type: 'checkMatch',
      from: 'player',
      to: 'server',
      when: 'when a player makes a match',
      nickname: localStorage.getItem('playerNickname'),
      sessionCode: localStorage.getItem('roomCode'),
      playerCard: firstCard.getAttribute('id'),
      boardCard: secondCard.getAttribute('id'),
    };
    socket.send(JSON.stringify(message));
    firstCard.style.background = '';
    secondCard.style.background = '';
    firstCard = null;
  } else {
    console.log('Escoga ficha de su mano primero.');
  }
}

/**
 * Updates board with corresponding cards.
 * @param {Map} message Message from server.
 */
function handleBoardCards(message, socket) {
  const boardCards = JSON.parse(message.boardCards);
  const gameBoard = document.getElementById('game-board');
  if (gameBoard) {
    Object.keys(boardCards).forEach((cardId) => {
      const cardData = boardCards[cardId];
      if (cardData) {
        const imageText = cardData.description;
        if (configMap) {
          const cardElement = document.createElement('li');
          cardElement.classList.add('board-image-container');
          cardElement.setAttribute('id', imageText);

          const contentElement = createContentElement(imageText, cardData.route, 'board-image', 'board');
          if (contentElement) {
            // If player has selected colored border
            if (configMap.adaptation2a === true || configMap.adaptation2b === true) {
              cardElement.style.borderColor = cardData.border;
            }
            // Adding content element to card element
            cardElement.appendChild(contentElement);
            // Adding card element to game board
            gameBoard.appendChild(cardElement);

            // Add an event listener to each of the cards on the game board
            cardElement.addEventListener('click', () => {
              cardElement.style.background = '#E6CCD7';
              match(socket, cardElement);
            });
          }
        }
      }
    });
  }
}

/**
 * When player chooses a card in hand.
 * @param {HTMLElement} card First card player chooses.
 */
function storeFirstMatch(card) {
  // Restores board to unclicked state.
  const myImages = document.getElementsByClassName('my-image-container');
  for (let index = 0; index < myImages.length; index += 1) {
    const otherCard = myImages[index];
    otherCard.style.background = '';
  }
  // Indicates to user, the card was clicked.
  card.style.background = '#E6CCD7';
  firstCard = card;
}

/**
 * Updates player hand with corresponding cards.
 * @param {Map} message Message from server.
 */
function handlePlayerCards(message) {
  const cardsReceived = JSON.parse(message.playerCards);
  const playerCards = document.getElementById('player-cards');
  playerCards.innerHTML = '';
  if (cardsReceived && playerCards) {
    Object.keys(cardsReceived).forEach((cardId) => {
      const cardData = cardsReceived[cardId];
      if (cardData) {
        const imageText = cardData.description;
        if (configMap) {
          const cardElement = document.createElement('li');
          cardElement.classList.add('my-image-container');
          cardElement.setAttribute('id', imageText);

          const contentElement = createContentElement(imageText, cardData.route, 'my-image', 'player');
          if (contentElement) {
            // If player has selected colored border
            if (configMap.adaptation2a === true || configMap.adaptation2b === true) {
              cardElement.style.borderColor = cardData.border;
            }
            // Adding content element to card element
            cardElement.appendChild(contentElement);
            // Adding card element to game board
            playerCards.appendChild(cardElement);

            // Add an event listener to each of the cards player
            cardElement.addEventListener('click', () => {
              storeFirstMatch(cardElement);
            });
          }
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
  // Player table with ranking during game.
  const gamePlayerTable = document.getElementById('game-ranking');
  addToTable(receivedMessage.players, gamePlayerTable);
}

/**
 * Handles configuration of game.
 * @param {Object} message Message received from server.
 */
function handleConfig(message, socket) {
  // Setting configuration up
  configMap = JSON.parse(message.config);
  if (configMap) {
    // Setting time configuration
    time = configMap.maxTime;
    const matchDuration = time * 1000;
    setTimeout(() => stopGame(socket), matchDuration);
    secondInterval = setInterval(() => {
      time -= 1;
      updateTime(time);
    }, 1000);
  }
}

/**
 * When server sends a message with personalized waiting room.
 * @param {Object} message Message received from server.
 * @param {WebSocket} socket Socket that connects to server.
 */
function handleGameRoom(message, socket) {
  handleConfig(message, socket);
  handleBoardCards(message, socket);
  handlePlayerCards(message);
  handlePlayerList(message);
}

/**
 * Handles response from server to player match.
 * @param {Object} receivedMessage Message sent by server.
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
    correctMatchSound.play();
    handlePlayerCards(receivedMessage);
  } else {
    incorrectoMatchSound.play();
  }
}

/**
 * Checks in list who is winner.
 * @param {Object} message Message sent by server.
 * @returns Map with highest score.
 */
function checkWinner(message) {
  const playerArray = JSON.parse(message.players);
  const playerNicknames = Object.keys(playerArray);
  let highestScore = null;
  if (playerArray && playerNicknames) {
    let nickname = playerNicknames[0];
    let playerInfo = playerArray[nickname];
    if (playerInfo) {
      let playerPoints = playerInfo.points;
      highestScore = new Map([
        ['nickname', nickname],
        ['score', playerPoints],
      ]);
      for (let playerIndex = 1; playerIndex < playerNicknames.length; playerIndex += 1) {
        nickname = playerNicknames[playerIndex];
        playerInfo = playerArray[nickname];
        playerPoints = playerInfo.points;
        if ((playerPoints && highestScore) && highestScore.get('score') < playerPoints) {
          highestScore.set('nickname', nickname);
          highestScore.set('score', playerPoints);
        }
      }
    }
  }
  return highestScore;
}

/**
 * Shows correct title if player is winner or loser.
 * @param {Object} message Message sent by server.
 */
function showCorrectTitle(message) {
  const highestScore = checkWinner(message);
  let hiddenTitle = null;
  if (highestScore.get('nickname') === playerNickname) {
    hiddenTitle = document.getElementById('loser-title');
  } else {
    hiddenTitle = document.getElementById('winner-title');
  }
  hiddenTitle.style.display = 'none';
}

/**
 * When timer runs out or player has finished their cards...
 * @param {Map} message Message sent by server.
 */
function handleTimesUp(message) {
  // disableBoard();
  // Player table with ranking in popup
  const popUpPlayerTable = document.getElementById('popup-ranking');
  // Pop Up that is shown when game is finished.
  const popUpFinished = document.getElementById('popup-finished');
  if (popUpFinished) {
    addToTable(message.players, popUpPlayerTable);
    showCorrectTitle(message);
    popUpFinished.style.display = 'flex';
  }
}

// function handlePlayerWon(message) {
//   // Player table with ranking in popup
//   const popUpPlayerTable = document.getElementById('popup-ranking');
//   // Pop Up that is shown when game is finished.
//   const popUpFinished = document.getElementById('popup-finished');
//   if (popUpFinished) {
//     handlePlayerList(message, popUpPlayerTable);
//     popUpFinished.style.display = 'flex';
//   }
// }

/**
 * Applies blur to player.
 */
function changeBlurImages(blurString) {
  // Contains all game board cards
  const boardImages = document.getElementsByClassName('board-image-container');
  if (boardImages) {
    for (let imageIndex = 0; imageIndex < boardImages.length; imageIndex += 1) {
      boardImages[imageIndex].style.filter = blurString;
    }
  }
}

/**
 * Applies blur to player.
 */
function handleBlur() {
  const blurDuration = (time / 8) * 1000;
  changeBlurImages('blur(2.5px)');
  setTimeout(() => {
    changeBlurImages('blur(0px)');
  }, blurDuration);
}

/**
 * Handles extra cards sent by server.
 * @param {Object} receivedMessage Message sent by server.
 */
function handleExtraCards(receivedMessage) {
}

/**
 * Returns user to home page when button is clicked.
 * Sends server a message to indicate player is leaving.
 * @param {WebSocket} socket Socket that connects to server.
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
      // handlePlayerWon,
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
  const correctMatchSound = document.getElementById('correctoMatchSound');
  correctMatchSound.volume = 0.1;
  const incorrectoMatchSound = document.getElementById('incorrectoMatchSound');
  incorrectoMatchSound.volume = 0.1;
}

/** ******************* Listeners for game page ******************* */
// Adding event listeners when the window is load
window.addEventListener('load', main);
