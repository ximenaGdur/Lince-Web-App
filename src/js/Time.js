// NO HAY BOTON DE COMENZAR
/* TIME FUNCTIONS */

const btnComenzar = document.getElementsByClassName('btnComenzar');
const popUpFinished = document.getElementsByClassName('popUpFinished');
var time;

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