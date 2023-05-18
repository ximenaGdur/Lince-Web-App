/******************** Imports ********************/
// <script src="../js/finishedPopUp.js"></script>
// <script src="../js/exitPopUp.js"></script>

/******************** Creating constants for script ********************/
const gameBoardImages = document.getElementsByClassName('board-image');
const exitButton = document.getElementById('exit-button');
const myImage = document.getElementsByClassName('my-image');
let word = document.getElementsByClassName('word');
let myImages = document.getElementsByClassName('my-image-container');
let boardImages = document.getElementsByClassName('board-image-container');
let blurTime = null;
const maxTime = 5000;
const blurPorcentage = 95;

/********************** Functions used on script **********************/


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

function loadPage() {
    blurTime = maxTime * 100 / blurPorcentage;
    const applyBlurTimeout = setTimeout(handleBlur, blurTime);
}


/**
 * Changes images in "myFichas" to words
*/

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

/************************ TIME FUNCTIONS ************************/

/** handleMaxTime 
 * when changing max time, update 
 */
function updateTime(time) {
    var timeLeft = time;
    var timer = "Tiempo";
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

/**
 * 
 */
function changeImageColors() {
    for(let index = 0; index < boardImages.length; index ++) {
        boardImages[index].style.borderColor = randomBorderColor();
    }
}

/**
 * 
 * @returns 
 */
function randomBorderColor() {
    // Código tomado de: https://www.delftstack.com/es/howto/javascript/javascript-pick-random-from-array/
    var colorsArray = ['#E6C700', '#2EB600', '#006DE2', '#DA0012']
    var randomIndex = Math.floor(Math.random()*colorsArray.length);
    var randomColor = colorsArray[randomIndex];
    return randomColor;
}

/************************ Listeners for page ************************/

window.addEventListener('load', loadPage);
window.addEventListener('load', changeImageColors);
window.addEventListener('load', changeImagesToWords);