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
  sessionStorageInitialized,
// eslint-disable-next-line import/extensions
} from './common.js';

/** ******************* Creating game page class ******************* */

// Player nickname
const playerNickname = sessionStorage.getItem('playerNickname');

// Room Code
const roomCode = sessionStorage.getItem('roomCode');

class GamePage {
  // Contains room configuration
  configMap = null;

  // Contains information of player card to match
  firstCard = null;

  // Current player score
  score = 0;

  // Interval that changes time each second.
  secondInterval = null;

  // Current time in game
  time = 0;

  // Contains all player cards
  myImages = document.getElementsByClassName('my-image-container');

  /**
   * Updates time on screen.
   */
  updateTime() {
    const timeString = `Tiempo: ${this.time} segundos`;
    const timeHTML = document.getElementById('current-time');
    if (timeHTML) {
      timeHTML.innerHTML = timeString;
    }
  }

  /**
   * Disables board images.
   * TODO: fix, still detecting click.
   */
  static disableBoard() {
    if (this.myImages) {
      // Add an event listener to each of the cards player
      for (let index = 0; index < this.myImages.length; index += 1) {
        const card = this.myImages[index];
        if (card) {
          card.disabled = true;
        }
      }
    }
  }

  /**
   * Lets server know time is up or player hand is empty.
   * @param {WebSocket} socket Socket that connects to server.
   */
  stopGame(socket) {
    if (this.secondInterval && sessionStorageInitialized() === true) {
      clearInterval(this.secondInterval);
      this.time = 0;
      this.updateTime();
      this.disableBoard();
      const message = {
        type: 'finishGame',
        nickname: playerNickname,
        sessionCode: roomCode,
      };
      socket.send(JSON.stringify(message));
    }
  }

  /**
   * Creates card element in HTML with given information.
   * @param {String} imageText Alternative text for image.
   * @param {*} route Image's route
   * @param {*} cssClassName Class name for CSS.
   * @returns Card element in HTML.
   */
  createCardElement(imageText, route, cssClassName) {
    let contentElement = null;
    const imageRoute = `/design/images/icons/board/${route}`;

    // If player has selected words
    if (this.configMap.adaptation1a === true || this.configMap.adaptation1b) {
      contentElement = document.createElement('p');
      contentElement.classList.add('word');
      contentElement.textContent = imageText;
    // If player has selected images
    } else {
      contentElement = document.createElement('img');
      contentElement.classList.add(cssClassName);
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
  match(socket, secondCard) {
    if (this.firstCard && sessionStorageInitialized() === true) {
      const message = {
        type: 'checkMatch',
        from: 'player',
        nickname: playerNickname,
        sessionCode: roomCode,
        playerCard: this.firstCard.getAttribute('id'),
        boardCard: secondCard.getAttribute('id'),
      };
      socket.send(JSON.stringify(message));
      this.firstCard.style.background = '';
      secondCard.style.background = '';
      this.firstCard = null;
    } else {
      console.log('Escoga ficha de su mano primero.');
    }
  }

  /**
   * Updates board with corresponding cards.
   * @param {Map} message Message from server.
   */
  handleBoardCards(message, socket) {
    const boardCards = JSON.parse(message.boardCards);
    const gameBoard = document.getElementById('game-board');
    if (gameBoard) {
      Object.keys(boardCards).forEach((cardId) => {
        const cardData = boardCards[cardId];
        if (cardData) {
          const imageText = cardData.description;
          if (this.configMap) {
            const cardElement = document.createElement('li');
            cardElement.classList.add('board-image-container');
            cardElement.setAttribute('id', imageText);

            const contentElement = this.createCardElement(imageText, cardData.route, 'board-image');
            if (contentElement) {
              // If player has selected colored border
              if (this.configMap.adaptation2a === true || this.configMap.adaptation2b === true) {
                cardElement.style.borderColor = cardData.border;
              }
              // Adding content element to card element
              cardElement.appendChild(contentElement);
              // Adding card element to game board
              gameBoard.appendChild(cardElement);

              // Add an event listener to each of the cards on the game board
              cardElement.addEventListener('click', () => {
                cardElement.style.background = '#E6CCD7';
                this.match(socket, cardElement);
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
  storeFirstMatch(card) {
    // Contains all player cards
    const myImages = document.getElementsByClassName('my-image-container');
    // Restores board to unclicked state.
    for (let index = 0; index < myImages.length; index += 1) {
      const otherCard = myImages[index];
      otherCard.style.background = '';
    }
    // Indicates to user, the card was clicked.
    card.style.background = '#E6CCD7';
    this.firstCard = card;
  }

  /**
   * Updates player hand with corresponding cards.
   * @param {Map} message Message from server.
   */
  handlePlayerCards(message) {
    const cardsReceived = JSON.parse(message.playerCards);
    const playerCards = document.getElementById('player-cards');
    playerCards.innerHTML = '';
    if (cardsReceived && playerCards) {
      Object.keys(cardsReceived).forEach((cardId) => {
        const cardData = cardsReceived[cardId];
        if (cardData) {
          const imageText = cardData.description;
          if (this.configMap) {
            const cardElement = document.createElement('li');
            cardElement.classList.add('my-image-container');
            cardElement.setAttribute('id', imageText);

            const contentElement = this.createCardElement(imageText, cardData.route, 'my-image');
            if (contentElement) {
              // If player has selected colored border
              if (this.configMap.adaptation2a === true || this.configMap.adaptation2b === true) {
                cardElement.style.borderColor = cardData.border;
              }
              // Adding content element to card element
              cardElement.appendChild(contentElement);
              // Adding card element to game board
              playerCards.appendChild(cardElement);

              // Add an event listener to each of the cards player
              cardElement.addEventListener('click', () => {
                this.storeFirstMatch(cardElement);
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
  static handlePlayerList(receivedMessage) {
    // Player table with ranking during game.
    const gamePlayerTable = document.getElementById('game-ranking');
    addToTable(receivedMessage.players, gamePlayerTable);
  }

  /**
   * Handles configuration of game.
   * @param {Object} message Message received from server.
   * @param {WebSocket} socket Socket that connects to server.
   */
  handleConfig(message, socket) {
    // Setting configuration up
    this.configMap = JSON.parse(message.config);
    if (this.configMap) {
      // Setting time configuration
      this.time = this.configMap.maxTime;
      const matchDuration = this.time * 1000;
      setTimeout(() => this.stopGame(socket), matchDuration);
      this.secondInterval = setInterval(() => {
        this.time -= 1;
        this.updateTime();
      }, 1000);
    }
  }

  /**
   * When server sends a message with personalized waiting room.
   * @param {Object} message Message received from server.
   * @param {WebSocket} socket Socket that connects to server.
   */
  handleGameRoom(message, socket) {
    this.handleConfig(message, socket);
    this.handleBoardCards(message, socket);
    this.handlePlayerCards(message);
    this.handlePlayerList(message);
  }

  /**
   * Handles response from server to player match.
   * @param {Object} receivedMessage Message sent by server.
   */
  handleMatchResponse(receivedMessage) {
    // Correct match sound
    const correctMatchSound = document.getElementById('correctoMatchSound');
    // Incorrect match sound
    const incorrectoMatchSound = document.getElementById('incorrectoMatchSound');
    this.score = receivedMessage.newScore;
    const scoreString = `Puntaje: ${this.score}`;
    document.getElementById('player-score').innerHTML = scoreString;
    if (receivedMessage.isCorrectMatch === true) {
      correctMatchSound.play();
      this.handlePlayerCards(receivedMessage);
    } else {
      incorrectoMatchSound.play();
    }
  }

  /**
   * Checks in list who is winner.
   * @param {Object} message Message sent by server.
   * @returns Map with highest score.
   */
  static checkWinner(message) {
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
  showCorrectTitle(message) {
    const highestScore = this.checkWinner(message);
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
  handleTimesUp(message) {
    // Player table with ranking in popup
    const popUpPlayerTable = document.getElementById('popup-ranking');
    // Pop Up that is shown when game is finished.
    const popUpFinished = document.getElementById('popup-finished');
    if (popUpFinished) {
      addToTable(message.players, popUpPlayerTable);
      this.showCorrectTitle(message);
      popUpFinished.style.display = 'flex';
    }
  }

  handlePlayerWon(message) {
    // Player table with ranking in popup
    const popUpPlayerTable = document.getElementById('popup-ranking');
    // Pop Up that is shown when game is finished.
    const popUpFinished = document.getElementById('popup-finished');
    if (popUpFinished) {
      this.handlePlayerList(message, popUpPlayerTable);
      popUpFinished.style.display = 'flex';
    }
  }

  /**
   * Applies blur to player.
   */
  static changeBlurImages(blurString) {
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
  handleBlur() {
    const blurDuration = (this.time / 8) * 1000;
    this.changeBlurImages('blur(2.5px)');
    setTimeout(() => {
      this.changeBlurImages('blur(0px)');
    }, blurDuration);
  }

  /**
   * Returns user to home page when button is clicked.
   * Sends server a message to indicate player is leaving.
   * @param {WebSocket} socket Socket that connects to server.
   */
  static returnToMain(socket) {
    // send message to server letting them know player is leaving.
    socket.send(createRemovePlayerMessage());
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.html';
  }
}

/**
 * Adding event listeners to all elements.
 */
function addEventListeners() {
  // Socket that connects to server
  const socket = new WebSocket('ws://localhost:8009');
  // Creating instance of Game Page class.
  const page = new GamePage();
  if (socket && page && sessionStorageInitialized() === true) {
    /**
     * When a connection is made with server.
     */
    socket.addEventListener('open', () => {
      const message = {
        type: 'getGameRoom',
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

  // Button that allows player to return to main page.
  const acceptButton = document.getElementById('accept-button');
  acceptButton.addEventListener('click', () => {
    page.returnToMain(socket);
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
    page.returnToMain(socket);
  });
}

/**
 * Loads page elements with specific information.
 */
function loadPage() {
  if (roomCode) {
    const scoreString = `Puntaje: ${this.score}`;
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
