/******************** Creating constants for script ********************/
// 
const popUpClose = document.getElementById('popUpClose');
// 
const btnExit = document.getElementById('exitButton');


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
    </li>

}

/************************ Listeners for buttons ************************/

btnExit[0].addEventListener('click', exitRoom);