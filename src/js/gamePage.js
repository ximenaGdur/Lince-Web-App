/******************** Imports ********************/
// <script src="../js/finishedPopUp.js"></script>
// <script src="../js/exitPopUp.js"></script>

/******************** Creating constants for script ********************/
const gameBoardImages = document.getElementsByClassName('board-image');
//const exitButton = document.getElementById('exit-button');
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
function handleAdp1a() {
    //document.getElementById('popUpFinished').style.visibility='hidden';
    // Obtener todas las imágenes de la página
    let myImages = document.getElementsByClassName("myImages");
    
    // Iterar a través de cada imagen y reemplazar su contenido por el atributo "alt"
    for (let i = 0; i < myImages.length; i++) {
            let altText = myImages[i].alt;
            let p = document.createElement("p");
            p.textContent = altText;
            p.classList.add("altText"); // agrega una clase altText SE PUEDE ELIMINAR MAYBE USEFUL
            myImages[i].replaceWith(p);
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

/** Function: handleMaxTime 
 * when changing max time, update **/
function updateTime(time) {
    let timeLeft = time;
    let timer = "Tiempo";
    timer += "time"; // hay que acomodar el dato para mostrarlo en la vista ( 0:00 )
    document.getElementById('isValid').innerHTML = timer;
    updateScreen();
}

/** Function: handleTimesUp
 * if time runs out the game is over **/
function TimesUp(time) {
    if( time == 0) {
        popUpFinished.style.display = 'flex';
    }
    //block everything later
}

/**
 * 
 */
function changeImageColors(){
    for(let index = 0; index < boardImages.length; index ++) {
        boardImages[index].style.borderColor = randomBorderColor();
    }
}

/**
 * 
 * @returns 
 */
function randomBorderColor(){
    // Código tomado de: https://www.delftstack.com/es/howto/javascript/javascript-pick-random-from-array/
    let colorsArray = ['#E6C700', '#2EB600', '#006DE2', '#DA0012']
    let randomIndex = Math.floor(Math.random()*colorsArray.length);
    let randomColor = colorsArray[randomIndex];
    return randomColor;
}

/************************ Listeners for page ************************/

window.addEventListener('load', loadPage);
window.addEventListener('load', changeImageColors);