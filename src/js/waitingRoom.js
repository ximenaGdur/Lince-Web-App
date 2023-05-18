/******************** Creating constants for script ********************/

//
const startButton = document.getElementById('start-button');
// Pop Up used to exit waiting room.
const popUpClose = document.getElementById('popUpClose');
// Container for all player table's rows.
const playerTable = document.getElementById('player-table-body');
// Max time bar.
const maxTimeRange = document.getElementById('max-time-range');
// Value for max time bar.
const maxTimeValue = document.getElementById('maxTimeValue');
// Value for cards per player bar.
const cardsPerPlayerValue = document.getElementById('cardsPerPlayerValue');
// Value for cards per round bar.
const cardsPerRoundValue = document.getElementById('cardsPerRoundValue');
// Option 1a radio button.
const option1a = document.getElementsByClassName('Adp1a');
// Option 2a radio button.
const option2a = document.getElementById('Adp2a');
// Option 2b radio button.
const option2b = document.getElementById('Adp2b');

/********************** Functions used on script **********************/

/**
 * Adds new player to player list.
 */
function handleNewPlayer() {
    if (playerTable) {
        const position = 1;
        const avatar = "avatar";
        const nickname = "ximeGdur";
        const points = 3;

        playerTable.innerHTML += 
            '<tr class="ranking-row">' +
                '<td class="ranking-col">' + position + '</td>' +
                '<td class="ranking-col">' + avatar + '</td>' +
                '<td class="ranking-col">' + nickname + '</td>' +
                '<td class="ranking-col">' + points + 'puntos' + '</td>' +
            '</tr>';
    }
}

/**
 * Sends a message to the server to remove a player from a specific room at the 
 * time the host client selects a player to be removed.
 */
function removePlayer() {
    if (playerTable) {
        let firstColumn = '<tr class="ranking-row">' +
                                '<td class="ranking-row">#</td>' +
                                '<td class="ranking-row">Imágen</td>' +
                                '<td class="ranking-row">Apodo</td>' +
                                '<td class="ranking-row">Puntaje</td>' +
                            '</tr>';
        let player1 = '<tr class="ranking-row">' +
                            '<td class="ranking-col"> 1 </td>' +
                            '<td class="ranking-col"> avatar </td>' +
                            '<td class="ranking-col"> mariaPerez </td>' +
                            '<td class="ranking-col"> 250 puntos' + '</td>' +
                        '</tr>'
                        
        let player2 = '<tr class="ranking-row">' +
                            '<td class="ranking-col"> 2 </td>' +
                            '<td class="ranking-col"> avatar </td>' +
                            '<td class="ranking-col"> juanPerez </td>' +
                            '<td class="ranking-col"> 100 puntos' + '</td>' +
                        '</tr>'

        playerTable.innerHTML =  firstColumn + player1 + player2;
    }
}

/**
 * Sends a message to the server to update the amount of cards per round.
 */
function chooseCardsPerRound() {
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
 **/
function handleMaxTime() {
    const time = 5;
    if (maxTimeValue) {
        maxTimeValue.innerHTML = time + ' s';
        max
    }
    // TODO: adjust bar
}

/**
 * When server sends a message indicating cards per round has to be updated
 **/
function handleCardsPerRound() {
    const amount = 5;
    if (cardsPerRoundValue) {
        cardsPerRoundValue.innerHTML = time;
    }
}



/**
 * Updates the value of the cards per player to the guest clients at the 
 * moment in which a message from the server informing the new value is entered.
 */
function handleCardsPerPlayer() {
    const amount = 5;
    if (cardsPerPlayerValue) {
        cardsPerPlayerValue.innerHTML = time;
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

function handleAdp2b() {
    console.log("aqii");
    /*if(message.type === "chooseAdp2b") {
        // document.getElementById('Adp2b').check == true;
    } else {

    }*/
    if (option2b) {
        option2b.checked = true;
    }
}

/**
 * Selects adaptation 3a.
 */
function handleAdp1a() {
    if (option3a) {
        option3a.checked = true;
    }
}

/**
 * Selects adaptation 3b.
 */
function handleAdp1b() {
    if (option3b) {
        option3b.checked = true;
    }
}

/**
 * 
 */
function startGame() {
    location.href = './game.xhtml';
}

/************************ Listeners for buttons ************************/

startButton.addEventListener('click', removePlayer);