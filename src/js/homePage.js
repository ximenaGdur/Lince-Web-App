/******************** Creating constants for script ********************/

// Text field to enter player nickname.
const nicknameField = document.getElementById('nickname');
// Button to create a room after entering a nickname.
const createRoomBtn = document.getElementById('create-room-button');
// Button to join a room after entering a nickname.
const joinRoomBtn = document.getElementById('join-room-button');

/********************** Functions used on script **********************/

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enableButtons() {
    if(nicknameField.ariaValueMax.trim() !== "") {
        if(createRoomBtn.disable === true & joinRoomBtn.disable === true) {
            createRoomBtn.disable = false;
            joinRoomBtn.disable = false;
        }
    } else {
        if(createRoomBtn.disable === false & joinRoomBtn.disable === false) {
            createRoomBtn.disable = true;
            joinRoomBtn.disable = true;
        }
    }
}

/**
* Send a message to the server to create a new room with the host as the client 
* that pressed the create room button and with the nickname entered.
*/
function createSession(){
    let nickname = document.getElementById('nickname').value;
    // "Type": "createRoom",  
    // "From": "client",  
    // "To": "server",
    // "When": "when a client presses the create room button with a valid nickname",  
    // "Nickname": "nickname"
}

/**
 * Sends a message to the server to close a client's connection.
 */
function closeTab() {
    // "Type": "closeTab",  
    // "From": "client",  
    // "To": "server",  
    // "When": "when a client logs off"
}

/************************ Listeners for buttons ************************/

nicknameField.addEventListener('input', enableButtons);
createRoomBtn.addEventListener('click', createSession);