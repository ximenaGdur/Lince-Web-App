/******************** Imports ********************/

import * as finishedPopup from './finishedPopUp.js'
import * as exitPopup from './exitPopUp.js'

/******************** Creating constants for script ********************/
// Contains all game board cards
let boardImages = document.getElementsByClassName('board-image-container');
// Contains all player cards
let myImages = document.getElementsByClassName('my-image-container');
// Contains all cards
const myImage = document.getElementsByClassName('my-image');
// Contains all word cards
let word = document.getElementsByClassName('word');
// Maximum time chosen
const maxTime = 5000;
// Time when blur happens
let blurTime = null;
// Percentage of time when blur happens
const blurPorcentage = 95;
// Contains information of player card to match
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
    for(let index = 0; index < boardImages.length; index ++) {
        boardImages[index].style.borderColor = randomBorderColor();
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
    firstCard = card;
}

/**
 * When player chooses a card .
 */
function match(secondCard) {
    if (firstCard) {
        console.log(firstCard.altText);
    } else {
        console.log("Escoga ficha de su mano primero.");
    }
}

/**
 * Applies blur to player.
 */
function handleBlur() {
    if (boardImages) {
        for(let imageIndex = 0; imageIndex < boardImages.length; imageIndex++) {
            boardImages[imageIndex].style.filter = 'blur(2.5px)';
        }
    }
}

/**
 * Change the pictures on the player's cards to the corresponding words.
 */
function changeImagesToWords() {
    // Iterate through each image and replace its content with the attribute "alt"
    for(let index = 0; index < myImage.length; index ++) {
        myImage[index].style.display='none';
        word[index].style.display='flex';
        // Changes box to fit words.
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

for (let index = 0; index < myImages.length; index++) {
    let card = myImages[index];
    card.addEventListener('click', () => {
        storeFirstMatch(card);
    });
}

for (let index = 0; index < boardImages.length; index++) {
    let boardCard = boardImages[index];
    boardCard.addEventListener('click', () => {
        match(boardCard);
    });
}