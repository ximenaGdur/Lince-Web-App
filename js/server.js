/** ****************** Imports ******************* */

// Including ws module.
const WebSocket = require('ws');

// eslint-disable-next-line import/extensions
// const configuration = require('./config.js');

/** ****************** Creating constants for script ******************* */

// Dictionary that stores all rooms and their information.
const availableRooms = new Map();
/*
This is it's structure:
  availableRooms =
  {
    12345: {
      config: {
        adp1a: 'true',
        adp1b: 'false',
        adp2a: 'true',
        adp2b: 'false',
        adp3a: 'true',
        adp3b: 'false',
        maxTime: 20,
        cardsPlayer: 5,
        cardsBoard: 100,
        },
      players: {
        'Ximena': {
          playerSocket: socket,
          playerInfo: {
              position: '1',
              avatar: { route: 'bear.png', description: 'Oso' },
              points: 23,
              host: isHost,
          },
        },
      },
    },
  }
*/

function printRooms() {
  availableRooms.forEach((roomData, roomCode) => {
    console.log(`${roomCode}: `);

    console.log(`players: ${JSON.stringify(Array.from(roomData))}`);
    const playerMap = roomData.get('players');
    playerMap.forEach((playerData, playerName) => {
      console.log(`
      ---- ${playerName} ----`);
      console.log(`playerSocket: ${playerData.get('playerSocket')}`);
      console.log(`avatar: ${JSON.stringify(playerData.get('playerInfo').get('avatar'))}`);
      console.log(`points: ${playerData.get('playerInfo').get('points')}`);
      console.log(`host: ${playerData.get('playerInfo').get('host')}`);
    });
  });
}

// Dictionary with all available avatar options.
const avatarRoutes = {
  1: { route: 'bear.png', description: 'Oso' },
  2: { route: 'chicken.png', description: 'Pollo' },
  3: { route: 'elephant.png', description: 'Elefante' },
  4: { route: 'hedgehog.png', description: 'Erizo' },
  5: { route: 'hippo.png', description: 'Hipopótamo' },
  6: { route: 'koala.png', description: 'Koala' },
  7: { route: 'lion.png', description: 'León' },
  8: { route: 'llama.png', description: 'Llama' },
  9: { route: 'meerkat.png', description: 'Suricata' },
  10: { route: 'monkey.png', description: 'Mono' },
  11: { route: 'panda.png', description: 'Panda' },
  12: { route: 'parrot.png', description: 'Lora' },
  13: { route: 'penguin.png', description: 'Pinguino' },
  14: { route: 'Polar', description: 'polarBear.png' },
  15: { route: 'rabbit.png', description: 'Conejo' },
  16: { route: 'seaLion.png', description: 'Foca' },
  17: { route: 'snake.png', description: 'Serpiente' },
  18: { route: 'tiger.png', description: 'Tigre' },
  19: { route: 'turtle.png', description: 'Tortuga' },
  20: { route: 'weasel.png', description: 'Comadreja' },
};

/**
 * Dictionary with all available card options.
 */
const cardRoutes = {
  Sueter: 'hoodie.png',
  Pantaloncillo: 'shorts.png',
  Camarón: 'shrimp.png',
  Zanahoria: 'carrot.png',
  Avión: 'airplane.png',
  Globo: 'balloon.png',
  Bicicleta: 'bike.png',
  Bote: 'boat.png',
  Excavadora: 'bulldozer.png',
  Bus: 'bus.png',
  Teléferico: 'cableCar.png',
  Carro: 'car.png',
  Grúa: 'crane.png',
  Helicoptero: 'chopper.png',
  Hoverboard: 'hoverboard.png',
  Moto: 'motorcycle.png',
  Pogo: 'pogo.png',
  Cohete: 'rocket.png',
  Scooter: 'scooter.png',
  Barco: 'ship.png',
  Skateboard: 'skateboard.png',
  Patines: 'skates.png',
  Nave: 'spaceship.png',
  Tractor: 'tractor.png',
  Tren: 'train.png',
  Triciclo: 'tricycle.png',
  Camión: 'truck.png',
  Uniciclo: 'unicycle.png',
  Carreta: 'wagon.png',
  Pájaro: 'bird.png',
  Gato: 'cat.png',
  Camaleón: 'chameleon.png',
  Cangrejo: 'crab.png',
  Delfín: 'dolphin.png',
  Elefante: 'elephant.png',
  Zorro: 'fox.png',
  Jirafa: 'giraffe.png',
  Erizo: 'hedgehog.png',
  Gallina: 'hen.png',
  Caballo: 'horse.png',
  Medusa: 'jellyfish.png',
  Canguro: 'kangaroo.png',
  Koala: 'koala.png',
  Mono: 'monkey.png',
  Ratón: 'mouse.png',
  Cerdo: 'pig.png',
  Conejo: 'rabbit.png',
  Escorpión: 'scorpion.png',
  Hipocampo: 'seahorse.png',
  Tiburón: 'shark.png',
  Perezoso: 'sloth.png',
  Ardilla: 'squirrel.png',
  Tortuga: 'turtle.png',
  Ballena: 'whale.png',
  Frijoles: 'beans.png',
  Brocoli: 'broccoli.png',
  Carne: 'meat.png',
  Hongo: 'mushroom.png',
  Helado: 'iceCream.png',
  Espaguetti: 'spaguetti.png',
  Hamburguesa: 'burger.png',
  Huevo: 'friedEgg.png',
  Manzana: 'apple.png',
  Patatas: 'frenchFries.png',
  Pepino: 'cucumber.png',
  Pera: 'pear.png',
  Pescado: 'friedFish.png',
  Pollo: 'chickenLeg.png',
  Pizza: 'pizza.png',
  Platanos: 'banana.png',
  Queso: 'cheese.png',
  Ramen: 'ramen.png',
  Sushi: 'sushi.png',
  Sandía: 'watermelon.png',
  Atún: 'tuna.png',
  Tomate: 'tomato.png',
  Uvas: 'grapes.png',
  Blusón: 'dressShirt.png',
  Tacones: 'heels.png',
  Overoles: 'overall.png',
  Sandalias: 'sandals.png',
  Pantalones: 'pants.png',
  Blusa: 'shirt.png',
  Camiseta: 'jersey.png',
  Anteojos: 'glasses.png',
  Traje: 'suit.png',
  Medias: 'socks.png',
  Gorro: 'beanie.png',
  Sombrero: 'hat.png',
  Tenis: 'sneakers.png',
  Vestido: 'dress.png',
  Enterizo: 'onesie.png',
  Enagua: 'skirt.png',
  Camisa: 'tshirt.png',
  Bufanda: 'scarf.png',
  Guantes: 'gloves.png',
  Lazo: 'hairBow.png',
  Prensa: 'hairClip.png',
  Leggings: 'legging.png',
  Reloj: 'watch.png',
};

// Maximum number of clients allowed in webpage.
const maximumClientAmount = 20;

// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });

/** ******************** Functions used on script ********************* */

/**
 * Closes connection with client.
 */
function closeConnection(socket, message) {
  console.log('closeConnection');
}

/**
 * Checks if room with given code exists.
 */
function validateCode(socket, messageReceived) {
  const code = messageReceived.sessionCode;
  let newMessage = {};
  if (availableRooms.has(code)) {
    newMessage = {
      type: 'handleCodeValidation',
      from: 'server',
      to: 'client',
      when: 'When the server validates room',
      isValid: 'true',
    };
  } else {
    newMessage = {
      type: 'handleCodeValidation',
      from: 'server',
      to: 'client',
      when: 'When the server validates room',
      isValid: 'false',
    };
  }
  socket.send(JSON.stringify(newMessage));
  console.log('validateCode');
}

/**
 * Calculates a random number in a range.
 * TODO: Move to common js.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Assigns random avatar to player.
 */
function selectAvatar() {
  const randomNumber = getRandomNumber(1, Object.keys(avatarRoutes).length);
  const playerAvatar = avatarRoutes[randomNumber];
  return playerAvatar;
}

/**
 * Creates new player and adds it to the room.
 */
function createPlayer(playerPosition, isHost) {
  const playerAvatar = selectAvatar();
  const newPlayer = new Map([
    ['position', playerPosition],
    ['avatar', playerAvatar],
    ['points', '0'],
    ['host', isHost],
    // TODO: asignar cartas?????
  ]);
  return newPlayer;
}

/**
 * Adds player to list for other players in room.
 */
function addPlayer(playerName, playerArray) {
  if (playerArray.keys.length <= maximumClientAmount) {
    const newMessage = {
      type: 'handleNewPlayer',
      from: 'server',
      to: 'player',
      when: 'When the server lets clients know a new player has been added',
      players: JSON.stringify(Array.from(playerArray)),
    };

    playerArray.forEach((playerData, playerNickname) => {
      if (playerNickname !== playerName) {
        // no manda a socket bien
        const socket = playerData.get('playerSocket');
        console.log('aqui');
        socket.send(JSON.stringify(newMessage));
      }
    });
  }
}

/**
 * Generates random code for room.
 */
function generateCode() {
  let randomRoomCode = '';
  for (let numberIndex = 0; numberIndex < 5; numberIndex += 1) {
    randomRoomCode += getRandomNumber(0, 9);
  }
  return randomRoomCode;
}

function setBasicConfiguration() {

}

/**
 * Sends message to client with room code assigned.
 */
function sendRoomCode(socket, roomCode) {
  const newMessage = {
    type: 'handleRoomCode',
    from: 'server',
    to: 'player',
    when: 'When the server lets client know the room code assigned to it',
    sessionCode: roomCode,
  };
  socket.send(JSON.stringify(newMessage));
}

/**
 * Creates new room for host.
 */
function createRoom(socket, message) {
  const playerNickname = message.nickname;
  const newPlayer = createPlayer(1, 'true');

  let roomCode = 0;
  do {
    roomCode = generateCode();
  } while (availableRooms.has(roomCode) === true);

  const playerMap = new Map([
    ['playerSocket', socket],
    ['playerInfo', newPlayer],
  ]);
  const playersMap = new Map([
    [playerNickname, playerMap],
  ]);
  const roomMap = new Map([
    ['config', setBasicConfiguration()],
    ['players', playersMap],
  ]);

  availableRooms.set(roomCode, roomMap);

  printRooms();
  sendRoomCode(socket, roomCode);
}

/**
 * Adds guest to room.
 */
function addToRoom(socket, message) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');

  const playerPosition = playersMap.keys().length + 1;
  const newPlayer = createPlayer(playerPosition, 'false');

  if (availableRooms.has(roomCode) === true) {
    const playerMap = new Map([
      ['playerSocket', socket],
      ['playerInfo', newPlayer],
    ]);
    playersMap.set(playerNickname, playerMap);

    addPlayer(socket, playersMap);
  }
}

/**
 * Sets amount of card per round to other players in room.
 */
function setCardsPerRound(socket, message) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleCardsPerRound',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know to change the cards per round',
    cardsPerRound: message.cardsPerRound,
  };
  socket.send(JSON.stringify(newMessage));
  console.log('setCardsPerRound');
}

/**
 * Sets maximum time per round to other players in room.
 */
function setMaxTime(socket, message) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleMaxTime',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know to change the max time',
    maxTime: message.maxTime,
  };
  socket.send(JSON.stringify(newMessage));
  console.log('setMaxTime');
}

/**
 * Sets amount of card per player to other players in room.
 */
function setCardsPerPlayer(socket, message) {
  const roomCode = message.sessionCode;
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  addPlayer(socket, playersMap);

  // TODO: Store configuration

  // TODO: send to all players
  /* const newMessage = {
    type: 'handleCardsPerPlayer',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know to change the cards per player',
    cardsPerPlayer: message.cardsPerPlayer,
  };
  socket.send(JSON.stringify(newMessage)); */

  console.log('setCardsPerPlayer');
}

/**
 * Sets adaption 1a to other players in room.
 */
function toggleAdp1a(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp1a',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 1a has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp1a');
}

/**
 * Sets adaption 1b to other players in room.
 */
function toggleAdp1b(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp1b',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 1b has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp1b');
}

/**
 * Sets adaption 2a to other players in room.
 */
function toggleAdp2a(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp2a',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 2a has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp2a');
}

/**
 * Sets adaption 2b to other players in room.
 */
function toggleAdp2b(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp2b',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 2b has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp2b');
}

/**
 * Sets adaption 3a to other players in room.
 */
function toggleAdp3a(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp3a',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 3a has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp3a');
}

/**
 * Sets adaption 3b to other players in room.
 */
function toggleAdp3b(socket) {
  // TODO: Store configuration

  // TODO: send to all players
  const newMessage = {
    type: 'handleAdp3b',
    from: 'server',
    to: 'player1',
    when: 'When the server lets players know adaptation 3b has been activated',
  };
  socket.send(JSON.stringify(newMessage));

  console.log('toggleAdp3b');
}

/**
 * Assigns a random player the host title.
 */
function assignNewHost(playerArray) {
  const playerNicknames = playerArray.keys();
  const randomNumber = getRandomNumber(1, playerNicknames.length);
  playerNicknames[randomNumber].playerInfo.isHost = 'true';
}

/**
 * Removes player in list for other players in room.
 */
function removePlayer(socket, playerArray, nickname) {
  playerArray.delete(nickname);
  assignNewHost(playerArray);

  // TODO: send to all players
  const newMessage = {
    type: 'handleRemovePlayer',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know a player left the room',
    players: JSON.stringify(Array.from(playerArray)),
  };
  socket.send(JSON.stringify(newMessage));
  console.log('removePlayer');
}

/**
 * Starts game for all players in room.
 */
function startGame(socket) {
  // TODO: send to all players
  // Prepare cards?
  const newMessage = {
    type: 'handleStartGame',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know game has started',
  };
  socket.send(JSON.stringify(newMessage));
  console.log('startGame');
}

/**
 * Checks if match is correct.
 */
function checkMatch(socket, message) {
  console.log('checkMatch');
}

/**
 * Finishes game for all players in room.
 */
function finishGame(socket) {
  console.log('finishGame');
}

/**
 * Assigns random card to player.
 */
function selectNewCard() {
  // TODO: revisar si la carta esta asignada a alguien
  // TODO: seleccionar carta segun las reglas
  const randomNumber = getRandomNumber(1, Object.keys(cardRoutes).length);
  const card = cardRoutes[randomNumber];
  return card;
}

/**
 * Applies extra cards to other players in room.
 */
function applyExtraCards(socket) {
  // TODO: send to all players

  const newCards = {
    1: selectNewCard(),
    2: selectNewCard(),
    3: selectNewCard(),
    4: selectNewCard(),
  };

  const newMessage = {
    type: 'handleExtraCards',
    from: 'server',
    to: 'client',
    when: 'When the server lets players know to apply extra cards',
    extraCards: JSON.stringify(newCards),
  };
  socket.send(JSON.stringify(newMessage));
  console.log('applyExtraCards');
}

/**
 * Applies blur to other players in room.
 */
function applyBlur(socket) {
  // TODO: send to all players
  const newMessage = {
    type: 'handleBlur',
    from: 'server',
    to: 'client',
    when: 'When the server lets players know to activate blur',
  };
  socket.send(JSON.stringify(newMessage));
  console.log('applyBlur');
}

/**
 * Identifying message type in order to call appropiate function.
 */
function identifyMessage(socket, receivedMessage) {
  switch (receivedMessage.type) {
    case 'closeConnection':
      closeConnection(socket, receivedMessage);
      break;
    case 'validateCode':
      validateCode(socket, receivedMessage);
      break;
    case 'addToRoom':
      addToRoom(socket, receivedMessage);
      break;
    case 'createRoom':
      createRoom(socket, receivedMessage);
      break;
    case 'setCardsPerRound':
      setCardsPerRound(socket, receivedMessage);
      break;
    case 'setMaxTime':
      setMaxTime(socket, receivedMessage);
      break;
    case 'setCardsPerPlayer':
      setCardsPerPlayer(socket, receivedMessage);
      break;
    case 'toggleAdp1a':
      toggleAdp1a(socket);
      break;
    case 'toggleAdp1b':
      toggleAdp1b(socket);
      break;
    case 'toggleAdp2a':
      toggleAdp2a(socket);
      break;
    case 'toggleAdp2b':
      toggleAdp2b(socket);
      break;
    case 'toggleAdp3a':
      toggleAdp3a(socket);
      break;
    case 'toggleAdp3b':
      toggleAdp3b(socket);
      break;
    case 'startGame':
      startGame(socket);
      break;
    case 'checkMatch':
      checkMatch(socket, receivedMessage);
      break;
    case 'finishGame':
      finishGame(socket);
      break;
    case 'applyExtraCards':
      applyExtraCards(socket);
      break;
    case 'applyBlur':
      applyBlur(socket);
      break;
    default:
      console.error('No se reconoce ese mensaje.');
  }
}

/**
 * When a connection is made with a client.
 */
server.on('connection', (clientSocket) => {
  console.log('Estableciendo de conexión con cliente...');

  clientSocket.on('message', (message) => {
    console.log(`Recibi mensaje del cliente: ${message}`);
    const receivedMessage = JSON.parse(message);
    identifyMessage(clientSocket, receivedMessage);
  });

  clientSocket.on('close', () => {
    console.log('Cerrando conexión con cliente...');
  });
});
