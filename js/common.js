/**
 * Creates new player row in ranking table.
 */
function createNewPlayer(nickname, playerInfo, isCurrentPlayer) {
  let playerElement = null;
  const iconsRoute = '/design/images/icons/';
  if (nickname && playerInfo) {
    playerElement = document.createElement('tr');
    if (playerElement) {
      playerElement.classList.add('table-row');

      // Adding ranking column
      const rankElement = document.createElement('td');
      if (rankElement) {
        rankElement.classList.add('table-col', 'ranking-column');
        // Adding crown if player is host
        if (playerInfo.host === true) {
          const hostCrownElement = document.createElement('img');
          hostCrownElement.classList.add('crown-image');
          hostCrownElement.src = `${iconsRoute}hostCrown.png`;
          hostCrownElement.alt = 'Icono de Anfitrión';
          rankElement.appendChild(hostCrownElement);
        }
        // Adding ranking value
        rankElement.innerHTML += playerInfo.position;
        playerElement.appendChild(rankElement);
      }

      // Adding avatar
      const avatarElement = document.createElement('td');
      if (playerInfo.avatar && avatarElement) {
        avatarElement.classList.add('table-col', 'avatar-column');
        // Adding image
        const iconElement = document.createElement('img');
        if (iconElement) {
          iconElement.classList.add('profile-image');
          iconElement.src = `${iconsRoute}profile/${playerInfo.avatar.route}`;
          iconElement.alt = `Icono de ${playerInfo.avatar.description}`;
          avatarElement.appendChild(iconElement);
        }
        playerElement.appendChild(avatarElement);
      }

      // Adding player name
      const nameElement = document.createElement('td');
      if (nameElement) {
        nameElement.classList.add('table-col', 'name-column');
        nameElement.innerHTML = nickname;
        if (isCurrentPlayer) {
          nameElement.style.textDecoration = 'underline';
          nameElement.style.textDecorationColor = '#CC7BA1';
        }
        playerElement.appendChild(nameElement);
      }

      // Adding player points
      const pointsElement = document.createElement('td');
      if (pointsElement) {
        pointsElement.classList.add('table-col', 'score-column');
        pointsElement.innerHTML = playerInfo.points;
        playerElement.appendChild(pointsElement);
      }
    }
  }

  return playerElement;
}

/**
 * Adds new player to player list.
 */
export function addToTable(players, playerTable, currentPlayer) {
  // Order by points
  if (players && playerTable) {
    const playerArray = JSON.parse(players);
    if (playerArray) {
      playerTable.innerHTML = '';
      Object.keys(playerArray).forEach((nickname) => {
        let isCurrentPlayer = false;
        const playerInfo = playerArray[nickname];
        if (playerInfo) {
          if (nickname === currentPlayer) {
            console.log('currentPlayer: ' + currentPlayer);
            isCurrentPlayer = true;
          }
          const playerHTML = createNewPlayer(nickname, playerInfo, isCurrentPlayer);
          if (playerHTML) {
            playerTable.appendChild(playerHTML);
          }
        }
      });
    }
  }
}

/**
 * Identifying message type in order to call appropiate function.
 * @param {Class} pageClass Class with all functions.
 * @param {WebSocket} socket Socket with connection to server.
 * @param {Object} receivedMessage Message received from server.
 * @returns Boolean value that indicates if message was identified or not.
 */
export function identifyMessage(pageClass, socket, receivedMessage) {
  const messageType = receivedMessage.type;
  if (pageClass[messageType]) {
    pageClass[messageType](socket, receivedMessage);
  } else {
    console.log('No se reconoce ese mensaje.');
  }
}

/**
   * Determines if session storage elements are initialized.
   * @returns Whether elements are initialized.
   */
export function storageInitialized() {
  const playerNickname = sessionStorage.getItem('playerNickname');
  const roomCode = sessionStorage.getItem('roomCode');
  let isInitialized = false;
  if (playerNickname && playerNickname !== '' && roomCode && roomCode !== '') {
    isInitialized = true;
  }
  return isInitialized;
}

/**
 * Adding event to element identified by given id.
 * @param {String} elementId Id given to element.
 * @param {String} eventString Event that triggers function.
 * @param {function} eventResponse Response to event on element.
 * @param {*} parameter Parameter to send to function.
 */
export function addingEventById(elementId, eventString, eventResponse, parameter) {
  // Button that allows player to return to main page.
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener(eventString, () => {
      if (parameter === null) {
        eventResponse();
      } else {
        eventResponse(parameter);
      }
    });
  }
}
