/** ****************** Imports ******************* */

/* eslint-disable linebreak-style */
// import { ip , port } from 'config.js';
// const configuration = require('./config.js');

// Including ws module.
const WebSocket = require('ws');

// eslint-disable-next-line import/extensions

/** ****************** Creating constants for script ******************* */

// Dictionary that stores all rooms and their information.
const availableRooms = new Map();
/*
This is it's structure:
  availableRooms =
  {
    12345: {
      config: {
        adaptation1a: 'true',
        adaptation1b: 'false',
        adaptation2a: 'true',
        adaptation2b: 'false',
        adaptation3a: 'true',
        adaptation3b: 'false',
        maxTime: 20,
        cardsPerPlayer: 5,
        cardsPerRound: 100,
      },
      board: {
        1: {
          card: { description: 'Sueter', route: 'hoodie.png' },
          border: 'yellow',
        }
      }
      players: {
        'Ximena': {
          playerSocket: socket,
          playerInfo: {
              position: '1',
              avatar: { description: 'Oso', route: 'bear.png' },
              points: 23,
              host: isHost,
              cards: {
                1: {
                  card: { description: 'Sueter', route: 'hoodie.png' },
                  border: 'yellow',
                }
              }
          },
        },
      },
    },
  }
*/

function printRooms() {
  availableRooms.forEach((roomData, roomCode) => {
    console.log(`${roomCode}: `);

    const configMap = roomData.get('config');
    console.log(`config: ${JSON.stringify(Array.from(configMap))}`);

    console.log('players:');
    const playerMap = roomData.get('players');
    playerMap.forEach((playerData, playerName) => {
      console.log(`
      ---- ${playerName} ----
      `);
      console.log(`playerSocket: ${playerData.get('playerSocket')}`);
      console.log(`avatar: ${JSON.stringify(playerData.get('playerInfo').get('avatar'))}`);
      console.log(`points: ${playerData.get('playerInfo').get('points')}`);
      console.log(`host: ${playerData.get('playerInfo').get('host')}`);
    });
  });
}

// Dictionary with possible colors
const cardColors = {
  yellow: '#FCFFAD',
  green: '#C2FFAD',
  blue: '#ADF7FF',
  purple: '#C7ADFF',
  pink: '#EBADFF',
};

// Dictionary with all available avatar options.
const avatarRoutes = {
  1: { description: 'Oso', route: 'bear.png' },
  2: { description: 'Pollo', route: 'chicken.png' },
  3: { description: 'Elefante', route: 'elephant.png' },
  4: { description: 'Erizo', route: 'hedgehog.png' },
  5: { description: 'Hipopótamo', route: 'hippo.png' },
  6: { description: 'Koala', route: 'koala.png' },
  7: { description: 'León', route: 'lion.png' },
  8: { description: 'Llama', route: 'llama.png' },
  9: { description: 'Suricata', route: 'meerkat.png' },
  10: { description: 'Mono', route: 'monkey.png' },
  11: { description: 'Panda', route: 'panda.png' },
  12: { description: 'Lora', route: 'parrot.png' },
  13: { description: 'Pinguino', route: 'penguin.png' },
  14: { description: 'Polar', route: 'polarBear.png' },
  15: { description: 'Conejo', route: 'rabbit.png' },
  16: { description: 'Foca', route: 'seaLion.png' },
  17: { description: 'Serpiente', route: 'snake.png' },
  18: { description: 'Tigre', route: 'tiger.png' },
  19: { description: 'Tortuga', route: 'turtle.png' },
  20: { description: 'Comadreja', route: 'weasel.png' },
};

// Dictionary with all available card options.
const cardRoutes = {
  1: { description: 'Sueter', route: 'hoodie.png' },
  2: { description: 'Pantaloncillo', route: 'shorts.png' },
  3: { description: 'Camarón', route: 'shrimp.png' },
  4: { description: 'Zanahoria', route: 'carrot.png' },
  5: { description: 'Avión', route: 'airplane.png' },
  6: { description: 'Globo', route: 'balloon.png' },
  7: { description: 'Bicicleta', route: 'bike.png' },
  8: { description: 'Bote', route: 'boat.png' },
  9: { description: 'Excavadora', route: 'bulldozer.png' },
  10: { description: 'Bus', route: 'bus.png' },
  11: { description: 'Teléferico', route: 'cableCar.png' },
  12: { description: 'Carro', route: 'car.png' },
  13: { description: 'Grúa', route: 'crane.png' },
  14: { description: 'Helicoptero', route: 'chopper.png' },
  15: { description: 'Hoverboard', route: 'hoverboard.png' },
  16: { description: 'Moto', route: 'motorcycle.png' },
  17: { description: 'Pogo', route: 'pogo.png' },
  18: { description: 'Cohete', route: 'rocket.png' },
  19: { description: 'Scooter', route: 'scooter.png' },
  20: { description: 'Barco', route: 'ship.png' },
  21: { description: 'Skateboard', route: 'skateboard.png' },
  22: { description: 'Patines', route: 'skates.png' },
  23: { description: 'Nave', route: 'spaceship.png' },
  24: { description: 'Tractor', route: 'tractor.png' },
  25: { description: 'Tren', route: 'train.png' },
  26: { description: 'Triciclo', route: 'tricycle.png' },
  27: { description: 'Camión', route: 'truck.png' },
  28: { description: 'Uniciclo', route: 'unicycle.png' },
  29: { description: 'Carreta', route: 'wagon.png' },
  30: { description: 'Pájaro', route: 'bird.png' },
  31: { description: 'Gato', route: 'cat.png' },
  32: { description: 'Camaleón', route: 'chameleon.png' },
  33: { description: 'Cangrejo', route: 'crab.png' },
  34: { description: 'Delfín', route: 'dolphin.png' },
  35: { description: 'Elefante', route: 'elephant.png' },
  36: { description: 'Zorro', route: 'fox.png' },
  37: { description: 'Jirafa', route: 'giraffe.png' },
  38: { description: 'Erizo', route: 'hedgehog.png' },
  39: { description: 'Gallina', route: 'hen.png' },
  40: { description: 'Caballo', route: 'horse.png' },
  41: { description: 'Medusa', route: 'jellyfish.png' },
  42: { description: 'Canguro', route: 'kangaroo.png' },
  43: { description: 'Koala', route: 'koala.png' },
  44: { description: 'Mono', route: 'monkey.png' },
  45: { description: 'Ratón', route: 'mouse.png' },
  46: { description: 'Cerdo', route: 'pig.png' },
  47: { description: 'Conejo', route: 'rabbit.png' },
  48: { description: 'Escorpión', route: 'scorpion.png' },
  49: { description: 'Hipocampo', route: 'seahorse.png' },
  50: { description: 'Tiburón', route: 'shark.png' },
  51: { description: 'Perezoso', route: 'sloth.png' },
  52: { description: 'Ardilla', route: 'squirrel.png' },
  53: { description: 'Tortuga', route: 'turtle.png' },
  54: { description: 'Ballena', route: 'whale.png' },
  55: { description: 'Frijoles', route: 'beans.png' },
  56: { description: 'Brocoli', route: 'broccoli.png' },
  57: { description: 'Carne', route: 'meat.png' },
  58: { description: 'Hongo', route: 'mushroom.png' },
  59: { description: 'Helado', route: 'iceCream.png' },
  60: { description: 'Espaguetti', route: 'spaguetti.png' },
  61: { description: 'Hamburguesa', route: 'burger.png' },
  62: { description: 'Huevo', route: 'friedEgg.png' },
  63: { description: 'Manzana', route: 'apple.png' },
  64: { description: 'Patatas', route: 'frenchFries.png' },
  65: { description: 'Pepino', route: 'cucumber.png' },
  66: { description: 'Pera', route: 'pear.png' },
  67: { description: 'Pescado', route: 'friedFish.png' },
  68: { description: 'Pollo', route: 'chickenLeg.png' },
  69: { description: 'Pizza', route: 'pizza.png' },
  70: { description: 'Platanos', route: 'banana.png' },
  71: { description: 'Queso', route: 'cheese.png' },
  72: { description: 'Ramen', route: 'ramen.png' },
  73: { description: 'Sushi', route: 'sushi.png' },
  74: { description: 'Sandía', route: 'watermelon.png' },
  75: { description: 'Atún', route: 'tuna.png' },
  76: { description: 'Tomate', route: 'tomato.png' },
  77: { description: 'Uvas', route: 'grapes.png' },
  78: { description: 'Blusón', route: 'dressShirt.png' },
  79: { description: 'Tacones', route: 'heels.png' },
  80: { description: 'Overoles', route: 'overall.png' },
  81: { description: 'Sandalias', route: 'sandals.png' },
  82: { description: 'Pantalones', route: 'pants.png' },
  83: { description: 'Blusa', route: 'shirt.png' },
  84: { description: 'Camiseta', route: 'jersey.png' },
  85: { description: 'Anteojos', route: 'glasses.png' },
  86: { description: 'Traje', route: 'suit.png' },
  87: { description: 'Medias', route: 'socks.png' },
  88: { description: 'Gorro', route: 'beanie.png' },
  89: { description: 'Sombrero', route: 'hat.png' },
  90: { description: 'Tenis', route: 'sneakers.png' },
  91: { description: 'Vestido', route: 'dress.png' },
  92: { description: 'Enterizo', route: 'onesie.png' },
  93: { description: 'Enagua', route: 'skirt.png' },
  94: { description: 'Camisa', route: 'tshirt.png' },
  95: { description: 'Bufanda', route: 'scarf.png' },
  96: { description: 'Guantes', route: 'gloves.png' },
  97: { description: 'Lazo', route: 'hairBow.png' },
  98: { description: 'Prensa', route: 'hairClip.png' },
  99: { description: 'Leggings', route: 'legging.png' },
  100: { description: 'Reloj', route: 'watch.png' },
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
  console.log(`message: ${message}`);
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
    ['points', 0],
    ['host', isHost],
    // TODO: asignar cartas?????
  ]);
  return newPlayer;
}

function createPlayerStringMap(playerMap) {
  const playerStringMap = {};
  if (playerMap) {
    playerMap.forEach((playerData, playerNickname) => {
      if (playerData) {
        const playerInfo = playerData.get('playerInfo');
        if (playerInfo) {
          playerStringMap[playerNickname] = {
            position: playerInfo.get('position'),
            avatar: playerInfo.get('avatar'),
            points: playerInfo.get('points'),
            host: playerInfo.get('host'),
          };
        }
      }
    });
  }
  return JSON.stringify(playerStringMap);
}

/**
 * Broadcasts message to everyone but one player.
 */
function broadcastToOthers(newMessage, roomCode, excludedPlayerNickname) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  playersMap.forEach((playerData, playerNickname) => {
    if (playerNickname !== excludedPlayerNickname) {
      const socket = playerData.get('playerSocket');
      socket.send(JSON.stringify(newMessage));
    }
  });
}

/**
 * Adds player to list for other players in room.
 */
function addPlayer(playerName, roomCode) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  const newMessage = {
    type: 'handleNewPlayer',
    from: 'server',
    to: 'player',
    when: 'When the server lets clients know a new player has been added',
    players: createPlayerStringMap(playersMap),
  };
  broadcastToOthers(newMessage, roomCode, playerName);
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

// function sortPlayersByPosition() {
//   const sortedEntries = Array.from(players).sort((a, b)=>a[0].points.localeCompare(b[0].points));

//   const orderedValues = sortedEntries.map((entry) => entry[1]);

//   console.log(orderedValues);

//   let iter = players.values();
//   iter.sort();
//   console.log(iter);

//   const i = [1, 2, 3];
// }

/**
 * Set default game configuration every time a game is created.
 * @param {*} roomCode room code to add the default configuration.
 */
function setDefaultGameConfiguration() {
  const configurations = new Map();
  configurations.set('maxTime', 20);
  configurations.set('cardsPerPlayer', 5);
  configurations.set('cardsPerRound', 100);
  configurations.set('adaptation1a', false);
  configurations.set('adaptation1b', false);
  configurations.set('adaptation2a', false);
  configurations.set('adaptation2b', false);
  configurations.set('adaptation3a', false);
  configurations.set('adaptation3b', false);
  return configurations;
}

/**
 * Sends the room code to the client who created a game
 */
function sendRoomCode(socket, roomCode) {
  const newMessage = {
    type: 'handleRoomCode',
    from: 'server',
    to: 'player',
    when: 'When the server lets clients know the room code',
    sessionCode: roomCode,
  };
  socket.send(JSON.stringify(newMessage));
}

/**
 * Creates new room for host.
 */
function createRoom(socket, message) {
  const playerNickname = message.nickname;
  const newPlayer = createPlayer(1, true);

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
    ['config', setDefaultGameConfiguration()],
    ['players', playersMap],
  ]);

  availableRooms.set(roomCode, roomMap);

  sendRoomCode(socket, roomCode);
}

/**
 * Assigns avatar and stores guest in room.
 */
function addToRoom(socket, message) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');

  const playerPosition = playersMap.size + 1;
  const newPlayer = createPlayer(playerPosition, false);

  if (availableRooms.has(roomCode) === true) {
    const playerMap = new Map([
      ['playerSocket', socket],
      ['playerInfo', newPlayer],
    ]);
    playersMap.set(playerNickname, playerMap);
  }

  sendRoomCode(socket, roomCode);
}

/**
 * Sets amount of card per round to guests in room.
 */
function getWaitingRoom(socket, message) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;

  if (roomCode && playerNickname && availableRooms.has(roomCode)) {
    const roomInfo = availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');
    const playerMap = playersMap.get(playerNickname);
    const playerInfo = playerMap.get('playerInfo');

    if (playersMap.keys.length <= maximumClientAmount) {
      playerMap.set('playerSocket', socket);
      // Sending messages to other players to let them know a new player has entered
      addPlayer(playerNickname, roomCode);

      // Sending player personalized waiting room.
      const newMessage = {
        type: 'handleWaitingRoom',
        from: 'server',
        to: 'player',
        when: 'When the server send personalized waiting room',
        isHost: playerInfo.get('host'),
        players: createPlayerStringMap(playersMap),
      };

      // TODO: Send configuration too, in case of non host

      socket.send(JSON.stringify(newMessage));
    }
  }
}

/**
 * Sets amount of card per round to guests in room.
 */
function setCardsPerRound(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;
  if (availableRooms.has(roomCode)) {
    const cards = message.cardsPerRound;
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('cardsPerRound', cards);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleCardsPerRound',
      from: 'server',
      to: 'player',
      when: 'When the server lets players know to change the cards per round',
      cardsPerRound: cards,
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets maximum time per round to guests in room.
 */
function setMaxTime(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const time = message.maxTime;
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('maxTime', time);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleMaxTime',
      from: 'server',
      to: 'player',
      when: 'When the server lets players know to change the max time',
      maxTime: time,
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets amount of card per player to guests in room.
 */
function setCardsPerPlayer(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const cards = message.cardsPerPlayer;
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('cardsPerPlayer', cards);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleCardsPerPlayer',
      from: 'server',
      to: 'player',
      when: 'When the server lets players know to change the cards per player',
      cardsPerPlayer: message.cardsPerPlayer,
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 1a to guests in room.
 */
function toggleAdp1a(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation1a', true);
    roomConfig.set('adaptation1b', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp1a',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 1a has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 1b to guests in room.
 */
function toggleAdp1b(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation1b', true);
    roomConfig.set('adaptation1a', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp1b',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 1b has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 2a to guests in room.
 */
function toggleAdp2a(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation2a', true);
    roomConfig.set('adaptation2b', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp2a',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 2a has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 2b to guests in room.
 */
function toggleAdp2b(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation2b', true);
    roomConfig.set('adaptation2a', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp2b',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 2b has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 3a to guests in room.
 */
function toggleAdp3a(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation3a', true);
    roomConfig.set('adaptation3b', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp3a',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 3a has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Sets adaption 3b to guests in room.
 */
function toggleAdp3b(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomConfig = roomMap.get('config');

    // Storing configuration
    roomConfig.set('adaptation3b', true);
    roomConfig.set('adaptation3a', false);

    // Sends to other players in room.
    const newMessage = {
      type: 'handleAdp3b',
      from: 'server',
      to: 'player1',
      when: 'When the server lets players know adaptation 3b has been activated',
    };
    broadcastToOthers(newMessage, roomCode, playerNickname);
  }
}

/**
 * Assigns a random player the host title.
 */
function assignNewHost(playerMap) {
  const playerNicknames = playerMap.keys();
  const randomNumber = getRandomNumber(1, playerNicknames.length);
  playerNicknames[randomNumber].playerInfo.isHost = 'true';
}

/**
 * Removes player in list for other players in room.
 */
function removePlayer(socket, roomCode, nickname) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  const playerMap = playersMap.get(nickname);
  playerMap.delete(nickname);
  assignNewHost(playerMap);

  // Sends to other players in room.
  const newMessage = {
    type: 'handleRemovePlayer',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know a player left the room',
    players: createPlayerStringMap(playerMap),
  };
  broadcastToOthers(newMessage, roomCode, nickname);
}

/**
 * Starts game for all players in room.
 */
function startGame(socket, message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  // Prepare cards?
  const newMessage = {
    type: 'handleStartGame',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know game has started',
  };
  broadcastToOthers(newMessage, roomCode, playerNickname);
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
function finishGame(socket, message) {
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
 * Applies extra cards to guests in room.
 */
function applyExtraCards(socket, message) {
  // Sends to other players in room.

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
}

/**
 * Applies blur to guests in room.
 */
function applyBlur(socket, message) {
  // Sends to other players in room.
  const newMessage = {
    type: 'handleBlur',
    from: 'server',
    to: 'client',
    when: 'When the server lets players know to activate blur',
  };
  socket.send(JSON.stringify(newMessage));}

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
    case 'getWaitingRoom':
      getWaitingRoom(socket, receivedMessage);
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
      toggleAdp1a(socket, receivedMessage);
      break;
    case 'toggleAdp1b':
      toggleAdp1b(socket, receivedMessage);
      break;
    case 'toggleAdp2a':
      toggleAdp2a(socket, receivedMessage);
      break;
    case 'toggleAdp2b':
      toggleAdp2b(socket, receivedMessage);
      break;
    case 'toggleAdp3a':
      toggleAdp3a(socket, receivedMessage);
      break;
    case 'toggleAdp3b':
      toggleAdp3b(socket, receivedMessage);
      break;
    case 'startGame':
      startGame(socket, receivedMessage);
      break;
    case 'checkMatch':
      checkMatch(socket, receivedMessage);
      break;
    case 'finishGame':
      finishGame(socket, receivedMessage);
      break;
    case 'applyExtraCards':
      applyExtraCards(socket, receivedMessage);
      break;
    case 'applyBlur':
      applyBlur(socket, receivedMessage);
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
