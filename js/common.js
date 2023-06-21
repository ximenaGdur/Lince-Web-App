/* eslint-disable linebreak-style */

/**
 * Creates new player row in ranking table.
 */
export function createNewPlayer(nickname, playerInfo) {
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
  playerHTML += `  <td class="table-col score-column">${playerInfo.points} puntos</td>`;
  playerHTML += '</tr>';

  return playerHTML;
}

/**
 * Adds new player to player list.
 */
export function handlePlayerList(message, playerTable) {
  // Order by points
  if (playerTable) {
    const playerArray = JSON.parse(message.players);
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
