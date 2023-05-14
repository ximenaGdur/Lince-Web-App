const btnJoin = document.getElementsByClassName('btnJoin');

/** Function: handleCodeValidation
 * checks if given room number is an existin room **/
function handleCode() {
    var roomNumber = 0;
    const rooms = [];
    /** AGREGAR LISTA DE SALAS DE JUEGO REALES **/
    rooms[0]=0;// delete later
    rooms[1]=1;// delete later
    for (let i = 0; i < rooms.length; i++) {
        if ( rooms.includes(roomNumber) ) {
            document.getElementById('isValid').innerHTML = "Valido";
            //falta # de sala 
            var roomLink = "/src/xhtml/waitingRoom.xhtml";
            //roomLink += "roomNumber";
            window.location.href = roomLink; 
        } else {
            document.getElementById('isValid').innerHTML = "Numero de sala invalido";
        }
    }
}

btnJoin[0].addEventListener('click', handleCode);
