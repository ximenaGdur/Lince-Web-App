/******************** Creating constants for script ********************/

//
const startBtn = document.getElementById('startBtn');
// Pop Up used to exit waiting room.
const popUpClose = document.getElementById('popUpClose');
// Container for all player table's rows.
const playerTable = document.getElementById('playerTableBody');
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
 * Indicates amount of cards per player.
 */
function handleCardsPerRound() {
    const time = 5;
    if (cardsPerRoundValue) {
        cardsPerRoundValue.innerHTML = time + ' s';
    }
    // TODO: adjust bar
}

/**
 * Sends a message to the server to remove a player from a specific room at the 
 * time the host client selects a player to be removed.
 */
function removePlayer() {
    //Falta JSON
}

/**
 * Updates the value of the cards per player to the guest clients at the 
 * moment in which a message from the server informing the new value is entered.
 */
function handleCardsPerPlayer(message) {
    
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
 * Sends a message to the server to update the value of the first own 
 * adaptation as 1a when the host client selects that option.
 */
function chooseAdp1a() {
    // "Type": "chooseAdp1a",
    // "From": "client",
    // "To": "server",
    // "When": "when a host client selects the adaptation 1a",
    // "Nickname": "player3",
    // "SessionCode": "1234"
}

/**
 * Sends a message to the server to update the value of the third own 
 * adaptation as 3a when the host client selects that option.
 */
function chooseAdp3a() {
    // "Type": "chooseAdp3a",
    // "From": "client",
    // "To": "server",
    // "When": "when a host client selects the adaptation 3a",
    // "SessionCode": "1234"
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
 * Selects adaptation 2a.
 */
function handleAdp2a() {
    if (option2a) {
        option2a.checked = true;
    }
}

/************************ Listeners for buttons ************************/

//btnExit.addEventListener('click', handleAdp2a);
startBtn.addEventListener('click', handleAdp2b);