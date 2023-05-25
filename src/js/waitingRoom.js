/** ****************** Imports ******************* */

import * as exitPopup from './exitPopUp.js';

/** ****************** Creating constants for script ******************* */

// Start game button
const startButton = document.getElementById('start-button');
// Container for all player table's rows.
const playerTable = document.getElementById('player-table-body');
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
// Max Time information popUp
const infoMaxTime = document.getElementById('infoMaxTime');
// Max Time information popUp
const infoCardsPlayers = document.getElementById('infoCardsPlayers');
// Cards per Round information popUp
const infoCardsPerRound = document.getElementById('infoCardsPerRound');
// Boolean for information Icon event listener
let infoIconClicked = true;
// adaptation1-info Colores popUp
const infoAdapt1 = document.getElementById('adaptation1-info');
// adaptation2-info Palabras popUp
const infoAdapt2 = document.getElementById('adaptation2-info');
// adaptation3-info Comodines popUp
const infoAdapt3 = document.getElementById('adaptation3-info');
// Test
const imgIcon = document.getElementsByClassName('information-icon');
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

/** ******************** Functions used on script ********************* */

/**
 * Adds new player to player list.
 */
function handleNewPlayer() {
  if (playerTable) {
    const position = 1;
    const avatar = 'avatar';
    const nickname = 'ximeGdur';
    const points = 3;

    playerTable.innerHTML += '<tr class="ranking-row">'
                              + `<td class="ranking-col">${position}</td>`
                              + `<td class="ranking-col">${avatar}</td>`
                              + `<td class="ranking-col">${nickname}</td>`
                              + `<td class="ranking-col">${points}puntos</td>`
                            + '</tr>';
  }
}

/**
 * Sends a message to the server to remove a player from a specific room at the
 * time the host client selects a player to be removed.
 */
function removePlayer() {
  if (playerTable) {
    const firstColumn = '<tr class="ranking-row">'
                        + '<td class="ranking-row">#</td>'
                        + '<td class="ranking-row">Im�gen</td>'
                        + '<td class="ranking-row">Apodo</td>'
                        + '<td class="ranking-row">Puntaje</td>'
                    + '</tr>';
    const player1 = '<tr class="ranking-row">'
                        + '<td class="ranking-col"> 1 </td>'
                        + '<td class="ranking-col"> avatar </td>'
                        + '<td class="ranking-col"> mariaPerez </td>'
                        + '<td class="ranking-col"> 250 puntos </td>'
                    + '</tr>';

    const player2 = '<tr class="ranking-row">'
                        + '<td class="ranking-col"> 2 </td>'
                        + '<td class="ranking-col"> avatar </td>'
                        + '<td class="ranking-col"> juanPerez </td>'
                        + '<td class="ranking-col"> 100 puntos </td>'
                    + '</tr>';

    playerTable.innerHTML = firstColumn + player1 + player2;
  }
}

/**
 * Sends a message to the server to update the amount of cards per round.
 */
function chooseCardsPerRound() {
  const cardsRound = cardsPerRoundRange.value;
  if (cardsPerRoundValue) {
    cardsPerRoundValue.innerHTML = cardsRound;
  }
  /*
    sendMessage({
        "Type": "chooseCardsPerRound",
        "From": "client",
        "To": "server",
        "When": "when a host client change the amount of card per round",
        "CardsPerRound": numCards,
        "Nickname": name,
        "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the maximum time of the session.
 */
function chooseMaxTime() {
  const time = maxTimeRange.value;
  if (maxTimeValue) {
    maxTimeValue.innerHTML = `${time} s`;
  }
  /*
    sendMessage({
        "Type": "chooseMaxTime",
        "From": "client",
        "To": "server",
        "When": "when a host client change the max time",
        "MaxTime": time,
        "Nickname": name,
        "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the amount of cards per player.
 */
function chooseCardsPerPlayer() {
  const cardsPlayer = cardsPerPlayerRange.value;
  if (cardsPerPlayerValue) {
    cardsPerPlayerValue.innerHTML = cardsPlayer;
  }
  /*
    sendMessage({
        "Type": "chooseCardsPerPlayer",
        "From": "client",
        "To": "server",
        "When": "when a host client change the cards per player",
        "CardsPerPlayer": numCards,
        "Nickname": name,
        "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 1a when the host client selects that option.
 */
function chooseAdp1a() {
  console.log('Adaptacion 1a escogida');
  /*
    sendMessage({
    "Type": "chooseAdp1a",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 1a",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 1b when the host client selects that option.
 */
function chooseAdp1b() {
  console.log('Adaptacion 1b escogida');
  /*
    sendMessage({
    "Type": "chooseAdp1b",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 1b",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 2a when the host client selects that option.
 */
function chooseAdp2a() {
  console.log('Adaptacion 2a escogida');
  /*
    sendMessage({
    "Type": "chooseAdp2a",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 2a",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 2b when the host client selects that option.
 */
function chooseAdp2b() {
  console.log('Adaptacion 2b escogida');
  /*
    sendMessage({
    "Type": "chooseAdp2b",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 2b",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 3a when the host client selects that option.
 */
function chooseAdp3a() {
  console.log('Adaptacion 3a escogida');
  /*
    sendMessage({
    "Type": "chooseAdp3a",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 3a",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * Sends a message to the server to update the value of the first own
 * adaptation as 3b when the host client selects that option.
 */
function chooseAdp3b() {
  console.log('Adaptacion 3b escogida');
  /*
    sendMessage({
    "Type": "chooseAdp3b",
    "From": "client",
    "To": "server",
    "When": "when a host client selects the adaptation 3b",
    "Nickname": name,
    "SessionCode": code
    })
    */
}

/**
 * When server sends a message indicating max time has to be updated
 * */
function handleMaxTime() {
  const time = 10;
  if (maxTimeValue) {
    maxTimeValue.innerHTML = `${time} s`;
    maxTimeRange.value = time;
  }
}

/**
 * When server sends a message indicating cards per round has to be updated
 * */
function handleCardsPerRound() {
  const amount = 80;
  if (cardsPerRoundValue) {
    cardsPerRoundValue.innerHTML = amount;
    cardsPerRoundRange.value = amount;
  }
}

/**
 * Updates the value of the cards per player to the guest clients at the
 * moment in which a message from the server informing the new value is entered.
 */
function handleCardsPerPlayer() {
  const amount = 30;
  if (cardsPerPlayerValue) {
    cardsPerPlayerValue.innerHTML = amount;
    cardsPerPlayerRange.value = amount;
  }
}

/**
 * Selects adaptation 1a.
 */
function handleAdp1a() {
  if (option1a) {
    option1a.checked = true;
  }
}

/**
 * Selects adaptation 1b.
 */
function handleAdp1b() {
  if (option1b) {
    option1b.checked = true;
  }
}

/**
 * Selects adaptation 2a.
 */
function handleAdp2a() {
  if (option2a) {
    option2a.checked = true;
  }
}

/*
*
*/
function handleAdp2b() {
  console.log('aqii');
  /* if(message.type === "chooseAdp2b") {
        // document.getElementById('Adp2b').check == true;
    } else {

    } */
  if (option2b) {
    option2b.checked = true;
  }
}

/**
 * Selects adaptation 3a.
 */
function handleAdp3a() {
  if (option3a) {
    option3a.checked = true;
  }
}

/**
 * Selects adaptation 3b.
 */
function handleAdp3b() {
  if (option3b) {
    option3b.checked = true;
  }
}

/**
 * Starts game for all players.
 */
function startGame() {
  /*
    sendMessage({
        "Type": "startGame",
        "From": "client",
        "To": "server",
        "When": "when a host client selects the start game botton",
        "Nickname": name,
        "SessionCode": code
    })
    */
  window.location.href = './game.xhtml';
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

/** ********************** Listeners for buttons *********************** */

startButton.addEventListener('click', startGame);

maxTimeRange.addEventListener('change', chooseMaxTime);
cardsPerPlayerRange.addEventListener('change', chooseCardsPerPlayer);
cardsPerRoundRange.addEventListener('change', chooseCardsPerRound);

imgIcon[0].addEventListener('click', maxTimePopUp);
imgIcon[1].addEventListener('click', cardsPerPlayer);
imgIcon[2].addEventListener('click', cardsPerRound);
imgIcon[3].addEventListener('click', infoAdapPopUp, infoAdapt1);
imgIcon[4].addEventListener('click', infoAdapPopUp, infoAdapt2);
imgIcon[5].addEventListener('click', infoAdapPopUp, infoAdapt3);

option1a.addEventListener('click', chooseAdp1a);
option1b.addEventListener('click', chooseAdp1b);
option2a.addEventListener('click', chooseAdp2a);
option2b.addEventListener('click', chooseAdp2b);
option3a.addEventListener('click', chooseAdp3a);
option3b.addEventListener('click', chooseAdp3b);
