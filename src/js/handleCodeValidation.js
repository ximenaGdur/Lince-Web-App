const btnJoin = document.getElementsByClassName('btnJoin');

function handleCode() {
    document.getElementById("isValid").innerHTML = "Numero de sala invalido";
}
btnJoin[0].addEventListener('click', handleCode);
