const btnExit = document.getElementById('exitButton');
const popUpClose = document.getElementById('popUpClose');

/**
 * Show the pop up close when the exit button is clicked in waiting room.
 */
function exitRoom() {
    popUpClose.disable = false;
}

btnExit[0].addEventListener('click', exitRoom);