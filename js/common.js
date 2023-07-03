/**
 * Creates new player row in ranking table.
 */
function createNewPlayer(nickname, playerInfo) {
  let playerHTML = null;
  if (nickname && playerInfo && playerInfo.avatar) {
    playerHTML = '<tr class="table-row">';
    const iconsRoute = '/design/images/icons/';
    const avatarRoute = `${iconsRoute}profile/${playerInfo.avatar.route}`;
    const crownRoute = `${iconsRoute}hostCrown.png`;

    if (playerInfo.host === true) {
      playerHTML += '  <td class="table-col ranking-column">';
      playerHTML += `    <img class="crown-image" src="${crownRoute}" alt="Icono de Anfitrión"/>`;
      playerHTML += `    ${playerInfo.position}`;
      playerHTML += '  </td>';
    } else {
      playerHTML += `  <td class="table-col ranking-column">${playerInfo.position}</td>`;
    }

    playerHTML += '  <td class="table-col avatar-column">';
    playerHTML += `    <img class="profile-image" src="${avatarRoute}" alt="Icono de ${playerInfo.avatar.description}"/>`;
    playerHTML += '  </td>';

    playerHTML += `  <td class="table-col name-column">${nickname}</td>`;
    playerHTML += `  <td class="table-col score-column">${playerInfo.points} pts</td>`;
    playerHTML += '</tr>';
  }

  return playerHTML;
}

/**
 * Adds new player to player list.
 */
export function addToTable(players, playerTable) {
  // Order by points
  if (players && playerTable) {
    const playerArray = JSON.parse(players);
    if (playerArray) {
      playerTable.innerHTML = '';
      Object.keys(playerArray).forEach((nickname) => {
        if (Object.hasOwn(playerArray, nickname)) {
          const playerInfo = playerArray[nickname];
          const playerHTML = createNewPlayer(nickname, playerInfo);
          if (playerHTML) {
            playerTable.innerHTML += playerHTML;
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
