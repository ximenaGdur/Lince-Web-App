/* eslint-disable class-methods-use-this */
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
  addingEventById,
  storageInitialized,
// eslint-disable-next-line import/extensions
} from './common.js';

/** ******************* Creating game page class ******************* */

// Player nickname
const playerNickname = sessionStorage.getItem('playerNickname');

// Room Code
const roomCode = sessionStorage.getItem('roomCode');

class GamePage {
  /**
   * Initializing all class atributes.
   */
  constructor() {
    // Contains room configuration
    this.configMap = null;
    // Contains information of player card to match
    this.firstCard = null;
    // Current player score
    this.score = 0;
    // Interval that changes time each second.
    this.secondInterval = null;
    // Current time in game
    this.time = 0;

    // Contains all player cards
    this.myImages = document.getElementsByClassName('my-image-container');
  }

  /**
   * Creates a container element with given id and class.
   * @param {String} containerId Id of HTML element.
   * @param {String} containerClass Class of HTML element.
   * @returns Container HTML element.
   */
  createContainerElement(containerId, containerClass) {
    let cardElement = null;
    cardElement = document.createElement('li');
    if (cardElement) {
      cardElement.classList.add(containerClass);
      cardElement.setAttribute('id', containerId);
    }
    return cardElement;
  }

  /**
   * Creates card element in HTML with given information.
   * @param {String} imageText Alternative text for image.
   * @param {String} route Image's route
   * @param {Boolean} isPlayerCard Class name for CSS.
   * @returns Card element in HTML.
   */
  createCardElement(imageText, route, isPlayerCard) {
    let contentElement = null;
    const imageRoute = `/design/images/icons/board/${route}`;
    const cssClassName = (isPlayerCard === true) ? 'my-image' : 'board-image';

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
    if (contentElement) {
      // If player has selected words
      if (isPlayerCard === true
        && (this.configMap.adaptation1a === true || this.configMap.adaptation1b)) {
        contentElement.classList.add('word');
        contentElement.textContent = imageText;
      // If player has selected images
      } else {
        contentElement = document.createElement('img');
        contentElement.classList.add(cssClassName);
        contentElement.src = imageRoute;
        contentElement.alt = `Icono de ${imageText}`;
      }
    }
    return contentElement;
  }

  /**
   * Creates player card HTML element.
   * @param {Object} cardData Card's details.
   * @returns The created HTML element.
   */
  createBoardCard(cardData) {
    let cardElement = null;
    if (cardData) {
      const imageText = cardData.description;
      cardElement = this.createContainerElement(imageText, 'board-image-container');
      if (cardElement) {
        // Creating inner element
        const contentElement = this.createCardElement(imageText, cardData.route, false);
        if (contentElement) {
          // If player has selected colored border
          if (this.configMap.adaptation2a === true || this.configMap.adaptation2b === true) {
            cardElement.style.borderColor = cardData.border;
          }
          // Adding content element to card element
          cardElement.appendChild(contentElement);
        }
      }
    }
    return cardElement;
  }

  /**
   * Updates board with corresponding cards.
   * @param {Object} message Message from server.
   */
  handleBoardCards(socket, message) {
    const boardCards = JSON.parse(message.boardCards);
    const gameBoard = document.getElementById('game-board');
    if (boardCards && gameBoard && this.configMap) {
      Object.keys(boardCards).forEach((cardData, cardIndex) => {
        const cardElement = this.createBoardCard(boardCards[cardIndex]);
        if (cardElement) {
          // Adding card element to game board
          gameBoard.appendChild(cardElement);

          // Add an event listener to each of the cards on the game board
          cardElement.addEventListener('click', () => {
            cardElement.style.background = '#E6CCD7';
            this.match(socket, cardElement);
          });
        }
      });
    }
  }

  /**
   * Creates player card HTML element.
   * @param {*} cardData Card's details.
   * @returns The created HTML element.
   */
  createPlayerCard(cardData) {
    let cardElement = null;
    if (cardData) {
      const imageText = cardData.description;
      cardElement = this.createContainerElement(imageText, 'my-image-container');
      if (cardElement) {
        // Creating inner element
        const contentElement = this.createCardElement(imageText, cardData.route, true);
        if (contentElement) {
          // If player has selected colored border
          if (this.configMap.adaptation2a === true || this.configMap.adaptation2b === true) {
            cardElement.style.borderColor = cardData.border;
          }
          // Adding content element to card element
          cardElement.appendChild(contentElement);
        }
      }
    }
    return cardElement;
  }

  /**
   * Updates player hand with corresponding cards.
   * @param {Object} message Message from server.
   */
  handlePlayerCards(socket, message) {
    const cardsReceived = JSON.parse(message.playerCards);
    const playerCards = document.getElementById('player-cards');
    if (cardsReceived && playerCards && this.configMap) {
      console.log("cardsReceived: " + message.playerCards);
      playerCards.innerHTML = '';
      Object.keys(cardsReceived).forEach((cardData) => {
        console.log("cardData: " + cardData);
        console.log("cardsReceived[cardIndex]: " + cardsReceived[cardData]);
        const cardElement = this.createPlayerCard(cardsReceived[cardData]);
        if (cardElement) {
          // Adding card element to game board
          playerCards.appendChild(cardElement);

          // Add an event listener to each of the cards player
          cardElement.addEventListener('click', () => {
            this.storeFirstMatch(cardElement);
          });
        }
      });
    }
  }

  /**
   * Handles player list received from server.
   * @param {Object} receivedMessage Message received from server.
   */
  handlePlayerList(socket, receivedMessage) {
    // Player table with ranking during game.
    const gamePlayerTable = document.getElementById('game-ranking');
    if (gamePlayerTable) {
      addToTable(receivedMessage.players, gamePlayerTable);
    }
  }

  /**
   * Updates time on screen.
   */
  updateTime() {
    const timeString = `Tiempo: ${this.time} segundos`;
    const timeHTML = document.getElementById('current-time');
    if (timeString && timeHTML) {
      timeHTML.innerHTML = timeString;
    }
  }

  /**
   * Disables board images.
   * TODO: fix, still detecting click.
   */
  disableBoard() {
    if (this.myImages) {
      // Removing event listener to each of the cards player
      for (let index = 0; index < this.myImages.length; index += 1) {
        const card = this.myImages[index];
        card.removeEventListener('click', () => { });
      }
      const exitButton = document.getElementById('exit-button');
      exitButton.disabled = true;
    }
  }

  /**
   * Lets server know time is up or player hand is empty.
   * @param {WebSocket} socket Socket that connects to server.
   */
  stopGame(socket) {
    if (this.secondInterval && storageInitialized() === true) {
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
   * Handles configuration of game.
   * @param {Object} message Message received from server.
   * @param {WebSocket} socket Socket that connects to server.
   */
  handleConfig(socket, message) {
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
  handleGameRoom(socket, message) {
    const scoreString = 'Puntaje: 0';
    // Contains player score
    const playerScore = document.getElementById('player-score');
    if (playerScore) {
      playerScore.innerHTML = scoreString;
    }
    this.handleConfig(socket, message);
    this.handleBoardCards(socket, message);
    this.handlePlayerCards(socket, message);
    this.handlePlayerList(socket, message);
  }

  /**
   * When player chooses a card in hand.
   * @param {HTMLElement} card First card player chooses.
   */
  storeFirstMatch(card) {
    if (this.myImages) {
      // Restores board to unclicked state.
      for (let index = 0; index < this.myImages.length; index += 1) {
        const otherCard = this.myImages[index];
        otherCard.style.background = '';
      }
      // Indicates to user, the card was clicked.
      card.style.background = '#E6CCD7';
      this.firstCard = card;
    }
  }

  /**
   * When player chooses a card in board.
   * TODO: fix when card is unselected
   * @param {WebSocket} socket Socket that connects to server.
   * @param {HTMLElement} secondCard Second card player has clicked.
   */
  match(socket, secondCard) {
    if (this.firstCard && secondCard && storageInitialized() === true) {
      const message = {
        type: 'checkMatch',
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
   * Handles response from server to player match.
   * @param {Object} receivedMessage Message sent by server.
   */
  handleMatchResponse(socket, receivedMessage) {
    // Correct match sound
    const correctMatchSound = document.getElementById('correctoMatchSound');
    // Incorrect match sound
    const incorrectoMatchSound = document.getElementById('incorrectoMatchSound');
    if (correctMatchSound && incorrectoMatchSound) {
      this.score = receivedMessage.newScore;
      const scoreString = `Puntaje: ${this.score}`;
      // Contains player score
      const playerScore = document.getElementById('player-score');
      if (playerScore) {
        playerScore.innerHTML = scoreString;
        if (receivedMessage.isCorrectMatch === true) {
          correctMatchSound.play();
          this.handlePlayerCards(socket, receivedMessage);
        } else {
          incorrectoMatchSound.play();
        }
      }
    }
  }

  /**
   * Checks in list who is winner.
   * @param {Object} message Message sent by server.
   * @returns Map with highest score.
   */
  checkWinner(message) {
    let highestScore = null;
    if (message) {
      const playerArray = JSON.parse(message.players);
      if (playerArray) {
        const playerNicknames = Object.keys(playerArray);
        if (playerNicknames) {
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
      }
    }
    return highestScore;
  }

  /**
   * Shows correct title if player is winner or loser.
   * @param {Object} message Message sent by server.
   */
  showCorrectTitle(message) {
    let hiddenTitle = null;
    const highestScore = this.checkWinner(message);
    if (highestScore) {
      if (highestScore.get('nickname') === playerNickname) {
        hiddenTitle = document.getElementById('loser-title');
      } else {
        hiddenTitle = document.getElementById('winner-title');
      }
      hiddenTitle.style.display = 'none';
    }
  }

  /**
   * When timer runs out or player has finished their cards...
   * @param {Object} message Message sent by server.
   */
  handleTimesUp(socket, message) {
    // Pop Up that is shown when game is finished.
    const popUpFinished = document.getElementById('popup-finished');
    // Player table with ranking in popup
    const popUpPlayerTable = document.getElementById('popup-ranking');
    if (popUpFinished && popUpPlayerTable) {
      addToTable(message.players, popUpPlayerTable);
      this.showCorrectTitle(message);
      popUpFinished.style.display = 'flex';
      const timeForRedirect = 10 * 1000;
      setTimeout(() => {
        continueSession();
      }, timeForRedirect);
    }
  }

  /**
   * Applies blur to player.
   */
  changeBlurImages(blurString) {
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
  returnToMain(socket) {
    if (socket) {
      // send message to server letting them know player is leaving.
      const message = createRemovePlayerMessage();
      if (message) {
        socket.send();
      }
    }
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
  if (socket && page && storageInitialized() === true) {
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

  // Adding event for button that allows player to return to main page.
  addingEventById('accept-button', 'click', page.returnToMain, socket);

  // Adding event for button that allows player to close pop up.
  addingEventById('cancel-button', 'click', closePopUp, null);

  // Adding event for button that allows player to continue session.
  addingEventById('continue-button', 'click', continueSession, null);

  // Adding event for button that allows player to see the exit popup.
  addingEventById('exit-button', 'click', showExitPopup, null);

  // Adding event for button that allows player to exit session.
  addingEventById('home-button', 'click', page.returnToMain, socket);
}

/**
 * Loads page elements with specific information.
 */
function loadPage() {
  if (roomCode) {
    const correctMatchSound = document.getElementById('correctoMatchSound');
    correctMatchSound.volume = 0.1;
    const incorrectoMatchSound = document.getElementById('incorrectoMatchSound');
    incorrectoMatchSound.volume = 0.1;
  } else {
    const mainContent = document.getElementsByClassName('main-content');
    if (mainContent) {
      mainContent[0].innerHTML = '<h2 class="page-title" id="waiting-room-title">La sala no existe</h2>';
      mainContent[0].innerHTML += '<button class="small-button" type="button" id="exit-button">Abandonar partida</button>';
      mainContent[0].innerHTML
      += `<dialog class="popup" id="exit-popup">
            <h2 class="popup-title">
              Seguro que quieres abandonar la partida y regresar a la página de inicio?
            </h2>
            <ul class="buttons">
                <li class="small-button-container">
                    <button class="small-button" id="cancel-button" type="button">
                        Cancelar
                    </button>
                </li>
                <li class="small-button-container">
                    <button class="small-button" id="accept-button" type="button">
                        Aceptar
                    </button>
                </li>
            </ul>
          </dialog>`;
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
