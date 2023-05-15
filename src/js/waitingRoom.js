/******************** Creating constants for script ********************/

// Button that opens the popup to leave a room.
const exitBtn = document.getElementById('exitButton');
// Popup that appears when the exit button is pressed of a room.
const popUpClose = document.getElementById('popUpClose');

/********************** Functions used on script **********************/

/**
 * Show the pop up close when the exit button is clicked in waiting room.
 */
function exitRoom() {
    popUpClose.disable = false;
}

/**
 * Adds new player to player list.
 */
function handleNewPlayer() {
    contactSection.innerHTML = `
    <li>
        <img class="profileImages"  src="../../design/images/icons/profile/bear.png" alt="Oso"/>
        <p>Jugador1 - 200</p>
    </li>`
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

function handleApt2d(message) {
    if(message.type === "chooseAdp2b") {
        // document.getElementById('Adp2b').check == true;
    } else {

    }
}

/**
 * Sends a message to the server to update the value of the first own 
 * adaptation as 1a when the host client selects that option.
 */
function chooseApt1a() {
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
function chooseApt3a() {
    // "Type": "chooseAdp3a",
    // "From": "client",
    // "To": "server",
    // "When": "when a host client selects the adaptation 3a",
    // "SessionCode": "1234"
}

/************************ Listeners for buttons ************************/

exitBtn[0].addEventListener('click', exitRoom);