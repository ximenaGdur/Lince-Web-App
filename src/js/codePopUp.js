

const showCodePopUp = () => {
  let popUp = document.getElementById('popUpCode');
  popUp.style.display = "flex";
  verifyCode();
}

const verifyCode = () => {
  let codeInput = document.getElementById('popUpInput');
  codeInput.addEventListener('keydown', (event) => {
    let key = event.key;
    let msg = document.getElementById("msgCode");
    if (isNaN(key)){
      msg.innerHTML  = "Sala no existe";
    } else {
      msg.innerHTML  = "Sala encontrada";
    }
  });
}

const cancelPopUp = () => {
  let popUp = document.getElementById('popUpCode');
  popUp.style.display = "none";
  document.getElementById('popUpInput').value = '';
  document.getElementById("msgCode").innerHTML = '';
}

const joinRoom = () => {
  // code validation
  location.href = './waitingRoom.xhtml';
}