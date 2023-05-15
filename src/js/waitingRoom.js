/******************** Creating constants for script ********************/

// Pop Up used to exit waiting room.
const popUpClose = document.getElementById('popUpClose');
// Button that allows player to return to main page.
const btnExit = document.getElementById('exitButton');
// Container for all player table's rows.
const playerTable = document.getElementById('playerTableBody');
// Value for max time bar.
const maxTimeValue = document.getElementById('maxTimeValue');
// Value for cards per player bar.
const cardsPerPlayerValue = document.getElementById('cardsPerPlayerValue');
// Value for cards per round bar.
const cardsPerRoundValue = document.getElementById('cardsPerRoundValue');
// Option 2a radio button.
const option2a = document.getElementById('option2a');


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
    if (playerTable) {
        console.log("aqui");
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
 * Selects adaptation 2a.
 */
function handleAdp2a() {
    if (option2a) {
        option2a.checked = true;
    }
}

/************************ Listeners for buttons ************************/

btnExit.addEventListener('click', handleAdp2a);