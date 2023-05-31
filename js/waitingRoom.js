/** ****************** Imports ******************* */

let closePopUp = null;
let showExitPopup = null;
let createRemovePlayerMessage = null;

/** ****************** Creating constants for script ******************* */

// Button that allows player to return to main page.
const acceptButton = document.getElementById('accept-button');
// Button that allows player to close pop up.
const cancelButton = document.getElementById('cancel-button');
// Cards per player bar.
const cardsPerPlayerRange = document.getElementById('cards-per-player-range');
// Value for cards per player bar.
const cardsPerPlayerValue = document.getElementById('cards-per-player-value');
// Cards per round bar.
const cardsPerRoundRange = document.getElementById('cards-per-round-range');
// Value for cards per round bar.
const cardsPerRoundValue = document.getElementById('cards-per-round-value');
// Minimum amount of cards per player permitted
const cardsPlayerMin = 5;
// Maximum amount of cards per player permitted
const cardsPlayerMax = 20;
// Minimum amount of cards per round permitted
const cardsRoundMin = 5;
// Maximum amount of cards per round permitted
const cardsRoundMax = 20;
// Button that allows the user to see the exit popup.
const exitButton = document.getElementById('exit-button');
// Information icons that display information
const informationIcons = document.getElementsByClassName('information-icon');
// Popup with information about adaption 1
const infoAdapt1 = document.getElementById('adaptation1-info');
// Popup with information about adaption 2
const infoAdapt2 = document.getElementById('adaptation2-info');
// Popup with information about adaption 3
const infoAdapt3 = document.getElementById('adaptation3-info');
// Cards per Round information popUp
const infoCardsPerRound = document.getElementById('infoCardsPerRound');
// Max Time information popUp
const infoCardsPlayers = document.getElementById('infoCardsPlayers');
// Boolean for information Icon event listener
let infoIconClicked = true;
// Max Time information popUp
const infoMaxTime = document.getElementById('infoMaxTime');
// Max time bar.
const maxTimeRange = document.getElementById('max-time-range');
// Value for max time bar.
const maxTimeValue = document.getElementById('max-time-value');
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
// Container for all player table's rows.
const playerTable = document.getElementById('waiting-room-ranking');
// Socket that connects to server
const socket = new WebSocket('ws://localhost:8009');
// Start game button
const startButton = document.getElementById('start-button');
// Minimum amount of time permitted
const timeMin = 20;
// Maximum amount of time permitted
const timeMax = 120;

/** ******************** Functions used on script ********************* */

/**
 * When page is loaded...
 */
async function loadPage() {
  console.log('Page loaded...');

  // eslint-disable-next-line import/extensions
  const exitPopUp = await import('./exitPopUp.js');
  closePopUp = exitPopUp.closePopUp();
  showExitPopup = exitPopUp.showExitPopup();
  createRemovePlayerMessage = exitPopUp.createRemovePlayerMessage();
}

/**
 * Sends a message to the server to update the amount of cards per round.
 */
function chooseCardsPerRound() {
  const cardsRound = cardsPerRoundRange.value;
  if (cardsPerRoundValue) {
    cardsPerRoundValue.innerHTML = cardsRound;
    const message = {
      type: 'setCardsPerRound',
      from: 'client',
      to: 'server',
      when: 'when a host client change the amount of card per round',
      cardsPerRound: cardsRound,
    };
    socket.send(JSON.stringify(message));
    console.log('Message sent to server');
  }
}

/**
 * Sends a message to the server to update the maximum time of the session.
 */
function chooseMaxTime() {
  const time = maxTimeRange.value;
  if (maxTimeValue) {
    maxTimeValue.innerHTML = `${time} s`;
    const message = {
      type: 'setMaxTime',
      from: 'client',
      to: 'server',
      when: 'when a host client change the max time',
      MaxTime: time,
    };
    socket.send(JSON.stringify(message));
  }
}

/**
 * Sends a message to the server to update the amount of cards per player.
 */
function chooseCardsPerPlayer() {
  const cardsPlayer = cardsPerPlayerRange.value;
  if (cardsPerPlayerValue) {
    cardsPerPlayerValue.innerHTML = cardsPlayer;
    const message = {
      type: 'setCardsPerPlayer',
      from: 'client',
      to: 'server',
      when: 'when a host client change the cards per player',
      cardsPerPlayer: cardsPlayer,
    };
    socket.send(JSON.stringify(message));
  }
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 1a when the host client selects that option.
 */
function chooseAdp1a() {
  console.log('Adaptacion 1a escogida');
  const message = {
    type: 'toggleAdp1a',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 1a',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 1b when the host client selects that option.
 */
function chooseAdp1b() {
  console.log('Adaptacion 1b escogida');
  const message = {
    type: 'toggleAdp1b',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 1b',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 2a when the host client selects that option.
 */
function chooseAdp2a() {
  console.log('Adaptacion 2a escogida');
  const message = {
    type: 'toggleAdp2a',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 2a',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 2b when the host client selects that option.
 */
function chooseAdp2b() {
  console.log('Adaptacion 2b escogida');
  const message = {
    type: 'toggleAdp2b',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 2b',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 3a when the host client selects that option.
 */
function chooseAdp3a() {
  console.log('Adaptacion 3a escogida');
  const message = {
    type: 'toggleAdp3a',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 3a',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 3b when the host client selects that option.
 */
function chooseAdp3b() {
  console.log('Adaptacion 3b escogida');
  const message = {
    type: 'toggleAdp3b',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the adaptation 3b',
  };
  socket.send(JSON.stringify(message));
}

/**
 * Starts game for all players.
 */
function startGame() {
  const message = {
    type: 'startGame',
    from: 'client',
    to: 'server',
    when: 'when a host client selects the start game botton',
  };
  socket.send(JSON.stringify(message));
  window.location.href = './game.xhtml';
}

/**
 * Host has selected adaptation 1a.
 */
function handleAdp1a() {
  if (option1a) {
    option1a.checked = true;
  }
}

/**
 * Host has selected adaptation 1b.
 */
function handleAdp1b() {
  if (option1b) {
    option1b.checked = true;
  }
}

/**
 * Host has selected adaptation 2a.
 */
function handleAdp2a() {
  if (option2a) {
    option2a.checked = true;
  }
}

/**
 * Host has selected adaptation 2b.
 */
function handleAdp2b() {
  if (option2b) {
    option2b.checked = true;
  }
}

/**
 * Host has selected adaptation 3a.
 */
function handleAdp3a() {
  if (option3a) {
    option3a.checked = true;
  }
}

/**
 * Host has selected adaptation 3b.
 */
function handleAdp3b() {
  if (option3b) {
    option3b.checked = true;
  }
}

/**
 * When server sends a message indicating max time has to be updated
 * */
function handleMaxTime(message) {
  const time = message.maxTime;
  if (maxTimeValue && (time >= timeMin && time < timeMax)) {
    maxTimeValue.innerHTML = `${time} s`;
    maxTimeRange.value = time;
  }
}

/**
 * When server sends a message indicating cards per round has to be updated
 * */
function handleCardsPerRound(message) {
  const amount = message.cardsPerRound;
  if (cardsPerRoundValue && (amount >= cardsRoundMin && amount < cardsRoundMax)) {
    cardsPerRoundValue.innerHTML = amount;
    cardsPerRoundRange.value = amount;
  }
}

/**
 * Updates the value of the cards per player to the guest clients at the
 * moment in which a message from the server informing the new value is entered.
 */
function handleCardsPerPlayer(message) {
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

/**
 * Adds new player to player list.
 */
function handleNewPlayer(message) {
  // Order by points
  /* if (playerTable) {
    const name = message.nickname;
    const avatarRoute = message.avatar;
    const score = message.points;
    console.log(`message: ${message}`);

    const playerScores = document.getElementsByClassName('score');
    const scoreArray = [];
    for (let playerIndex = 0; playerIndex < playerScores.length; playerIndex++) {
      scoreArray.append(playerScores.innerHTML);
    }
    console.log(`scores: ${scoreArray}`);

    // const position = ;

    playerTable.innerHTML += '<tr class="ranking-row">'
                              + `<td class="ranking-col">${position}</td>`
                              + `<td class="ranking-col">${avatar}</td>`
                              + `<td class="ranking-col">${nickname}</td>`
                              + `<td class="ranking-col">${points} puntos</td>`
                            + '</tr>';
  } */
}

/**
 * Sends a message to the server to remove a player from a specific room at the
 * time the host client selects a player to be removed.
 */
function handleRemovePlayer() {
  if (playerTable) {
    const firstColumn = '<tr class="ranking-row">'
                        + '<td class="ranking-row">#</td>'
                        + '<td class="ranking-row">Imgen</td>'
                        + '<td class="ranking-row">Apodo</td>'
                        + '<td class="ranking-row">Puntaje</td>'
                    + '</tr>';
    const player1 = '<tr class="ranking-row">'
                        + '<td class="ranking-col">1</td>'
                        + '<td class="ranking-col">avatar</td>'
                        + '<td class="ranking-col">mariaPerez</td>'
                        + '<td class="ranking-col">250puntos </td>'
                    + '</tr>';

    const player2 = '<tr class="ranking-row">'
                        + '<td class="ranking-col">2</td>'
                        + '<td class="ranking-col">avatar</td>'
                        + '<td class="ranking-col">juanPerez</td>'
                        + '<td class="ranking-col">100 puntos </td>'
                    + '</tr>';

    playerTable.innerHTML = firstColumn + player1 + player2;
  }
}

/*
* Show the maxTimePopUp with the max time explanation
*/
function maxTimePopUp() {
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
  if (infoIconClicked) {
    infoCardsPerRound.style.display = 'flex';
    infoIconClicked = false;
  } else {
    infoCardsPerRound.style.display = 'none';
    infoIconClicked = true;
  }
}

/*
* Function that shows the explanation of the adaptions
*/
function infoAdapPopUp(adaptation) {
  if (infoIconClicked) {
    document.getElementById(adaptation.srcElement.nextElementSibling.id).style.visibility = 'visible';
    infoIconClicked = false;
  } else {
    document.getElementById(adaptation.srcElement.nextElementSibling.id).style.visibility = 'hidden';
    infoIconClicked = true;
  }
}

/**
 * Returns user to home page when button is clicked.
 * Sends server a message to indicate player is leaving.
 */
function returnToMain() {
  if (acceptButton) {
    // Aqui se manda el msj de eliminar el jugador de la lista.
    window.location.href = './index.xhtml';
  }
  // send message to server letting them know player is leaving.
  socket.send(createRemovePlayerMessage());
}

/**
 * Identifying message type in order to call appropiate function.
 */
function identifyMessage(receivedMessage) {
  switch (receivedMessage.type) {
    case 'handleAdp1a':
      handleAdp1a(receivedMessage);
      break;
    case 'handleAdp1b':
      handleAdp1b(receivedMessage);
      break;
    case 'handleAdp2a':
      handleAdp2a(receivedMessage);
      break;
    case 'handleAdp2b':
      handleAdp2b(receivedMessage);
      break;
    case 'handleAdp3a':
      handleAdp3a(receivedMessage);
      break;
    case 'handleAdp3b':
      handleAdp3b(receivedMessage);
      break;
    case 'handleMaxTime':
      handleMaxTime(receivedMessage);
      break;
    case 'handleCardsPerPlayer':
      handleCardsPerPlayer(receivedMessage);
      break;
    case 'handleCardsPerRound':
      handleCardsPerRound(receivedMessage);
      break;
    case 'handleRemovePlayer':
      handleRemovePlayer(receivedMessage);
      break;
    case 'handleNewPlayer':
      handleNewPlayer(receivedMessage);
      break;
    case 'handleStartGame':
      handleStartGame(receivedMessage);
      break;
    default:
      console.error('No se reconoce ese mensaje.');
  }
}

/** ********************** Listeners for waiting room *********************** */

// Adding event listeners when the window is load
window.addEventListener('load', loadPage);

/**
 * When a connection is made with server.
 */
socket.addEventListener('open', () => {
  console.log('Conectado al servidor desde Waiting Room.');
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
  console.log(`Recibi del servidor: ${receivedMessage}`);
  identifyMessage(receivedMessage);
});

// Adding event listener to acceptButton
acceptButton.addEventListener('click', returnToMain);

// Adding event listener to cardsPerPlayerRange
cardsPerPlayerRange.addEventListener('change', chooseCardsPerPlayer);

// Adding event listener to cardsPerRoundRange
cardsPerRoundRange.addEventListener('change', chooseCardsPerRound);

// Adding event listener to cancelButton
cancelButton.addEventListener('click', closePopUp);

// Adding event listener to exitButton
exitButton.addEventListener('click', showExitPopup);

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

// Adding event listener to maxTimeRange
maxTimeRange.addEventListener('change', chooseMaxTime);

// Adding event listener to option1a
option1a.addEventListener('click', chooseAdp1a);

// Adding event listener to option1b
option1b.addEventListener('click', chooseAdp1b);

// Adding event listener to option2a
option2a.addEventListener('click', chooseAdp2a);

// Adding event listener to option2b
option2b.addEventListener('click', chooseAdp2b);

// Adding event listener to option3a
option3a.addEventListener('click', chooseAdp3a);

// Adding event listener to option3b
option3b.addEventListener('click', chooseAdp3b);

// Adding event listener to startButton
startButton.addEventListener('click', startGame);

// Adding event listener when window is closed
// window.addEventListener('close', closeTab);
