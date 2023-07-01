/**
 * Creates new player row in ranking table.
 */
function createNewPlayer(nickname, playerInfo) {
  const iconsRoute = '/design/images/icons/';
  const avatarRoute = `${iconsRoute}profile/${playerInfo.avatar.route}`;
  const crownRoute = `${iconsRoute}hostCrown.png`;

  let playerHTML = '<tr class="table-row">';

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

  return playerHTML;
}

/**
 * Adds new player to player list.
 */
export function addToTable(players, playerTable) {
  // Order by points
  if (playerTable) {
    const playerArray = JSON.parse(players);
    if (playerArray) {
      playerTable.innerHTML = '';
      Object.keys(playerArray).forEach((nickname) => {
        if (Object.hasOwn(playerArray, nickname)) {
          const playerInfo = playerArray[nickname];
          playerTable.innerHTML += createNewPlayer(nickname, playerInfo);
        }
      });
    }
  }
}

/**
 * Identifying message type in order to call appropiate function.
 * @param {*} functions Array with all functions.
 * @param {*} socket Socket with connection to server.
 * @param {*} receivedMessage Message received from server.
 * @returns Boolean value that indicates if message was identified or not.
 */
export function identifyMessage(functions, socket, receivedMessage) {
  const messageType = receivedMessage.type;
  let messageIdentified = false;
  for (let functionIndex = 0; functionIndex < functions.length; functionIndex += 1) {
    if (messageType === functions[functionIndex].name) {
      functions[functionIndex](receivedMessage, socket);
      messageIdentified = true;
      break;
    }
  }
  return messageIdentified;
}
