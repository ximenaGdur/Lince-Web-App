/******************** Imports ********************/
// <script src="../js/finishedPopUp.js"></script>
// <script src="../js/exitPopUp.js"></script>

/******************** Creating constants for script ********************/
// Contains all game board cards
const gameBoardImages = document.getElementsByClassName('board-image');
const myImage = document.getElementsByClassName('my-image');
let word = document.getElementsByClassName('word');
// Contains all player cards
const playerCards = document.getElementsByClassName('.my-image-container');
let boardImages = document.getElementsByClassName('board-image-container');
let myImages = document.getElementsByClassName('my-image-container');

//const exitButton = document.getElementById('exit-button');

let blurTime = null;
const maxTime = 5000;
const blurPorcentage = 95;

let firstCard = null;

/********************** Functions used on script **********************/

/**
 * When page is loaded...
 */
function loadPage() {
    blurTime = maxTime * 100 / blurPorcentage;
    const applyBlurTimeout = setTimeout(handleBlur, blurTime);
}

/**
 * If image adaption is chosen, it asigns a random border color.
 */
function changeImageColors(){
    for(let index = 0; index < gameBoardImages.length; index ++) {
        gameBoardImages[index].style.borderColor = randomBorderColor();
    }
}

/**
 * Generates a random color for image border.
 */
function randomBorderColor(){
    // Código tomado de: https://www.delftstack.com/es/howto/javascript/javascript-pick-random-from-array/
    let colorsArray = ['#E6C700', '#2EB600', '#006DE2', '#DA0012']
    let randomIndex = Math.floor(Math.random()*colorsArray.length);
    let randomColor = colorsArray[randomIndex];
    return randomColor;
}

function storeFirstMatch(card) {
    if (firstClick == false) {
        firstClick = true;
    }
}

/**
 * When player chooses a card .
 */
function match(secondCard) {
    if (firstCard) {
        console.log(firstCard.altText);
    } else {
        secondClick = true;
        
    }
}

/**
 * Applies blur to player.
 */
function handleBlur() {
    if (gameBoardImages) {
        for(let imageIndex = 0; imageIndex < gameBoardImages.length; imageIndex++) {
            gameBoardImages[imageIndex].style.filter = 'blur(2.5px)';
        }
    }
}

function changeImagesToWords() {
    // Iterate through each image and replace its content with the attribute "alt"
    for(let index = 0; index < myImage.length; index ++) {
        myImage[index].style.display='none';
        word[index].style.display='flex';
        // changes box to fit words 
        myImages[index].style.display.alingSelf='stretch'
        myImages[index].style.maxWidth = 'max-content';
    }
}

/*
*   Handles scores of the players
*   players => array of players
*   scores => map with (player, score)
*/
function handleScores() {
    let players = [];
    let scores = new Map();
    players.forEach(player => {
        player.updateScore(scores.get(player));
    });
}
/************************ TIME FUNCTIONS ************************/

/** handleMaxTime 
 * when changing max time, update 
 */
function updateTime(time) {
    let timeLeft = time;
    let timer = "Tiempo";
    timer += "time"; // hay que acomodar el dato para mostrarlo en la vista ( 0:00 )
    document.getElementById('isValid').innerHTML = timer;
    updateScreen();
}

/** handleTimesUp
 * if time runs out the game is over 
 */
function TimesUp(time) {
    if( time == 0) {
        popUpFinished.style.display = 'flex';
    }
    //block everything later
}

/************************ Listeners for page ************************/

window.addEventListener('load', loadPage);
window.addEventListener('load', changeImageColors);
window.addEventListener('load', changeImagesToWords);

/*playerCards.forEach(card => {
    card.addEventListener('click', () => {
      storeFirstMatch(card);
    });
  })*/