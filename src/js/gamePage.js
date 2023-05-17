/******************** Creating constants for script ********************/

/******************** Creating constants for script ********************/
const gameBoard = document.getElementById('board');
const blurTime;
const maxTime = 5000;
const blurPorcentage = 95;

/********************** Functions used on script **********************/

function loadPage() {
    blurTime = maxTime - (maxTime * 100 / blurPorcentage);
}

/**
 * Applies blur to player.
 */
function handleBlur() {
    console.log("aqui");
    gameBoard.style.filter = 'blur(4px)';
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

/************************ TIME FUNCTIONS ************************/

/** Function: handleMaxTime 
 * when changing max time, update **/
function updateTime(time) {
    var timeLeft = time;
    var timer = "Tiempo";
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

/************************ Listeners for page ************************/

window.addEventListener("load", loadPage);
const applyBlurTimeout = setTimeout(handleBlur, 5000);
