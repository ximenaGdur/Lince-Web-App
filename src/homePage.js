const nicknameField = document.getElementById('nicknameTitle');
const btnCreateRoom = document.getElementById('create-room-button');
const btnJoinRoom = document.getElementById('join-room-button');

/**
 * Lock or enable create room and join room buttons after entering a nickname.
 */
function enableButtons() {
    if(nicknameField.ariaValueMax.trim() !== "") {
        if(btnCreateRoom.disable === true & btnJoinRoom.disable === true) {
            btnCreateRoom.disable = false;
            btnJoinRoom.disable = false;
        }
    } else {
        if(btnCreateRoom.disable === false & btnJoinRoom.disable === false) {
            btnCreateRoom.disable = true;
            btnJoinRoom.disable = true;
        }
    }
}