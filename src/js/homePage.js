/******************** Creating constants for script ********************/

// Text field to enter player nickname.
const nicknameField = document.getElementById('nickname');
// Button to create a room after entering a nickname.
const createRoomBtn = document.getElementById('create-room-button');
// Button to join a room after entering a nickname.
const joinRoomBtn = document.getElementById('join-room-button');

const btnComenzar = document.getElementsByClassName('btnComenzar');

const popUpFinished = document.getElementsByClassName('popUpFinished');
var time;

const waitingRoomTitle = document.getElementById('waiting-room-title');

/********************** Functions used on script **********************/

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enableButtons() {
    if(nicknameField.value.length > 0 && nicknameField.value.trim() !== "") {
        createRoomBtn.disabled = false;
        joinRoomBtn.disabled = false;
    } else {
        createRoomBtn.disabled = true;
        joinRoomBtn.disabled = true;
    }
}

/**
* Send a message to the server to create a new room with the host as the client 
* that pressed the create room button and with the nickname entered.
*/
function createSession(){
    let nickname = document.getElementById('nickname').value;
    location.href = './waitingRoom.xhtml';
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

/************************ Listeners for page ************************/

nicknameField.addEventListener('input', enableButtons);
createRoomBtn.addEventListener('click', createSession);
