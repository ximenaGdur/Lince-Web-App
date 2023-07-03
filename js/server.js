/** ****************** Imports ******************* */

// import { ip , port } from 'config.js';
// const configuration = require('./config.js');

// Including ws module.
const WebSocket = require('ws');

/** ****************** Creating constants for script ******************* */

// Dictionary that stores all rooms and their information.
const availableRooms = new Map();

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

// Dictionary with possible colors
const cardColors = ['#E6C700', '#2EB600', '#006DE2', '#DA0012'];

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
  101: { description: 'Dona', route: 'donut.png' },
  102: { description: 'Ensalada', route: 'salad.png' },
  103: { description: 'Kebab', route: 'kebab.png' },
  104: { description: 'FriedChicken', route: 'friedChicken.png' },
  105: { description: 'Taco', route: 'taco.png' },
  106: { description: 'Langosta', route: 'lobster.png' },
  107: { description: 'Fresa', route: 'strawberry.png' },
  108: { description: 'Pitahaya', route: 'dragonFruit.png' },
  109: { description: 'Naranja', route: 'orange.png' },
  110: { description: 'Piña', route: 'pineapple.png' },
  111: { description: 'Aguacate', route: 'avocado.png' },
  112: { description: 'Kiwi', route: 'kiwi.png' },
  113: { description: 'Coco', route: 'coconut.png' },
  114: { description: 'Limon', route: 'lemon.png' },
  115: { description: 'Calabaza', route: 'pumpkin.png' },
  116: { description: 'Almendra', route: 'almond.png' },
  117: { description: 'Repollo', route: 'cabbage.png' },
  118: { description: 'Maiz', route: 'corn.png' },
  119: { description: 'Ajo', route: 'garlic.png' },
  120: { description: 'Coliflor', route: 'cauliflower.png' },
  121: { description: 'Papa', route: 'potato.png' },
  122: { description: 'Cebolla', route: 'onion.png' },
  123: { description: 'Tamarindo', route: 'tamarind.png' },
  124: { description: 'Mongostino', route: 'mangosteen.png' },
  125: { description: 'Albaricoque', route: 'apricot.png' },
  126: { description: 'Pulpo', route: 'octopus.png' },
  127: { description: 'Rana', route: 'frog.png' },
  128: { description: 'Búho', route: 'owl.png' },
  129: { description: 'Rata', route: 'rat.png' },
  130: { description: 'Caracol', route: 'snail.png' },
  131: { description: 'Murcielago', route: 'bat.png' },
  132: { description: 'Camello', route: 'camel.png' },
  133: { description: 'Lora', route: 'parrot.png' },
  134: { description: 'Grillo', route: 'cricket.png' },
  135: { description: 'Pavo', route: 'turkey.png' },
  136: { description: 'Flamenco', route: 'flamingo.png' },
  137: { description: 'Hipopotamo', route: 'hippopotamus.png' },
  138: { description: 'Pato', route: 'duck.png' },
  139: { description: 'Panda', route: 'panda.png' },
  140: { description: 'Vaca', route: 'cow.png' },
  141: { description: 'Unicornio', route: 'unicorn.png' },
  142: { description: 'Pez', route: 'fish.png' },
  143: { description: 'Tigre', route: 'tiger.png' },
  144: { description: 'Mariposa', route: 'butterfly.png' },
  145: { description: 'Babuino', route: 'baboon.png' },
  146: { description: 'Lobo', route: 'wolf.png' },
  147: { description: 'EstrellaDeMar', route: 'starfish.png' },
  148: { description: 'Perro', route: 'dog.png' },
  149: { description: 'Foca', route: 'seal.png' },
  150: { description: 'Pinguino', route: 'penguin.png' },
  151: { description: 'Instagram', route: 'instagram.png' },
  152: { description: 'Gmail', route: 'gmail.png' },
  153: { description: 'YouTube', route: 'youtube.png' },
  154: { description: 'Facebook', route: 'facebook.png' },
  155: { description: 'Telegram', route: 'telegram.png' },
  156: { description: 'Whatsapp', route: 'whatsapp.png' },
  157: { description: 'TikTok', route: 'tiktok.png' },
  158: { description: 'Google', route: 'google.png' },
  159: { description: 'PlayStation', route: 'playstation.png' },
  160: { description: 'Lego', route: 'lego.png' },
  161: { description: 'Twitter', route: 'twitter.png' },
  162: { description: 'Snapchat', route: 'snapchat.png' },
  163: { description: 'Hp', route: 'hp.png' },
  164: { description: 'Xiaomi', route: 'xiaomi.png' },
  165: { description: 'Android', route: 'android.png' },
  166: { description: 'GrandTheftAuto', route: 'grandTheftAuto.png' },
  167: { description: 'Windows', route: 'windows.png' },
  168: { description: 'AdobeIllustrator', route: 'adobeIllustrator.png' },
  169: { description: 'Dropbox', route: 'dropbox.png' },
  170: { description: 'Discord', route: 'discord.png' },
  171: { description: 'Reddit', route: 'reddit.png' },
  172: { description: 'Spotify', route: 'spotify.png' },
  173: { description: 'LG', route: 'lg.png' },
  174: { description: 'Konami', route: 'konami.png' },
  175: { description: 'Dell', route: 'dell.png' },
  176: { description: 'Linkedin', route: 'linkedin.png' },
  177: { description: 'Motorola', route: 'motorola.png' },
  178: { description: 'GoogleDrive', route: 'googleDrive.png' },
  179: { description: 'Samsung', route: 'samsung.png' },
  180: { description: 'Huawei', route: 'huawei.png' },
  181: { description: 'EASports', route: 'EASports.png' },
  182: { description: 'GoogleMaps', route: 'googleMaps.png' },
  183: { description: 'Sega', route: 'sega.png' },
  184: { description: 'AMD', route: 'amd.png' },
  185: { description: 'Twitch', route: 'twitch.png' },
  186: { description: 'Skype', route: 'skype.png' },
  187: { description: 'GoogleTranslate', route: 'googleTranslate.png' },
  188: { description: 'Wikipedia', route: 'wikipedia.png' },
  189: { description: 'Paypal', route: 'paypal.png' },
  190: { description: 'SONY', route: 'sony.png' },
  191: { description: 'Ubisoft', route: 'ubisoft.png' },
  192: { description: 'Pinterest', route: 'pinterest.png' },
  193: { description: 'Tinder', route: 'tinder.png' },
  194: { description: 'Nintendo', route: 'nintendo.png' },
  195: { description: 'Philips', route: 'philips.png' },
  196: { description: 'Cisco', route: 'cisco.png' },
  197: { description: 'IBM', route: 'ibm.png' },
  198: { description: 'NVIDIA', route: 'nvidia.png' },
  199: { description: 'Logitech', route: 'logitech.png' },
  200: { description: 'Intel', route: 'intel.png' },
};

// Maximum number of clients allowed in webpage.
const maximumClientAmount = 20;

// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });

/** ******************** Functions used on script ********************* */

/**
 * Checks if room with given code exists.
 * @param {Object} messageReceived Message player sent.
 * @param {WebSocket} socket Player socket.
 */
function validateCode(messageReceived, socket) {
  const code = messageReceived.sessionCode;
  let newMessage = {};
  if (availableRooms.has(code)) {
    if (availableRooms.get(code).get('isStarted') === false) {
      newMessage = {
        type: 'handleCodeValidation',
        from: 'server',
        to: 'client',
        when: 'When the server validates room',
        isValid: true,
        isStarted: false,
      };
    } else {
      newMessage = {
        type: 'handleCodeValidation',
        from: 'server',
        to: 'client',
        when: 'When the server validates room',
        isValid: true,
        isStarted: true,
      };
    }
  } else {
    newMessage = {
      type: 'handleCodeValidation',
      from: 'server',
      to: 'client',
      when: 'When the server validates room',
      isValid: false,
      isStarted: false,
    };
  }
  socket.send(JSON.stringify(newMessage));
}

/**
 * Calculates a random number in a range.
 * @param {Number} min Minimum number in range.
 * @param {Number} max Maximum number in range.
 * @returns A random number.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Assigns random avatar to player.
 * @returns Randomly generated avatar.
 */
function selectAvatar() {
  const randomNumber = getRandomNumber(1, Object.keys(avatarRoutes).length);
  const playerAvatar = avatarRoutes[randomNumber];
  return playerAvatar;
}

/**
 * Creates new player and adds it to the room.
 * @param {Number} playerPosition Player's position in ranking.
 * @param Boolean isHost Whether player is host or not.
 * @returns New player Map with relevant information.
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

/**
 * Converts Map object into a string in order to send it.
 * @param {Map} playerMap Map object with player's information.
 * @returns String with all player information.
 */
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
 * Converts Map object into a string in order to send it.
 * @param {Map} playerMap Map object with room's configuration.
 * @returns String with all room's configuration.
 */
function createConfigStringMap(roomConfig) {
  const configStringMap = {};
  if (roomConfig) {
    configStringMap.adaptation1a = roomConfig.get('adaptation1a');
    configStringMap.adaptation1b = roomConfig.get('adaptation1b');
    configStringMap.adaptation2a = roomConfig.get('adaptation2a');
    configStringMap.adaptation2b = roomConfig.get('adaptation2b');
    configStringMap.adaptation3a = roomConfig.get('adaptation3a');
    configStringMap.adaptation3b = roomConfig.get('adaptation3b');
    configStringMap.maxTime = roomConfig.get('maxTime');
    configStringMap.cardsPerPlayer = roomConfig.get('cardsPerPlayer');
    configStringMap.cardsPerRound = roomConfig.get('cardsPerRound');
  }
  return JSON.stringify(configStringMap);
}

/**
 * Converts Map object into a string in order to send it.
 * @param {Map} board Map object with room's board cards.
 * @returns String with all board's cards.
 */
function createBoardStringMap(board) {
  const boardStringMap = {};
  if (board) {
    board.forEach((cardData, cardId) => {
      if (cardData) {
        boardStringMap[cardId] = {
          description: cardData.get('description'),
          route: cardData.get('route'),
          border: cardData.get('border'),
        };
      }
    });
  }
  return JSON.stringify(boardStringMap);
}

/**
 * Converts Map object into a string in order to send it.
 * @param {Map} playerMap Map object with player infor.
 * @returns String with all player's cards.
 */
function createPlayerCardsStringMap(playerMap) {
  const playerCardsStringMap = {};
  if (playerMap) {
    const playerInfo = playerMap.get('playerInfo');
    if (playerInfo) {
      const playerCards = playerInfo.get('cards');
      if (playerCards) {
        playerCards.forEach((cardData, cardId) => {
          if (cardData) {
            const playerCardMap = {
              description: cardData.get('description'),
              route: cardData.get('route'),
              border: cardData.get('border'),
            };
            playerCardsStringMap[cardId] = playerCardMap;
          }
        });
      }
    }
  }
  return JSON.stringify(playerCardsStringMap);
}

/**
 * Broadcasts message to everyone but one player.
 * @param {Object} message Message to be broadcasted.
 * @param {Number} roomCode Room that contains players to which message will be sent.
 * @param {String} excludedPlayerNickname Nickname of player that will be excluded.
 */
function broadcastToOthers(message, roomCode, excludedPlayerNickname) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  playersMap.forEach((playerData, playerNickname) => {
    if (playerNickname !== excludedPlayerNickname) {
      const socket = playerData.get('playerSocket');
      socket.send(JSON.stringify(message));
    }
  });
}

/**
 * Adds player to list for other players in room.
 * @param {String} playerName Player name.
 * @param {Number} roomCode Room code.
 * @param {String} messageType Tipo de mensaje.
 */
function sendUpdatedPlayers(playerName, roomCode) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  const newMessage = {
    type: 'handlePlayerList',
    from: 'server',
    to: 'player',
    when: 'When the server lets clients know player list has changed',
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

//   let iter = players.values();
//   iter.sort();

//   const i = [1, 2, 3];
// }

/**
 * Set default game configuration every time a game is created.
 */
function setDefaultGameConfiguration() {
  const configurations = new Map();
  configurations.set('maxTime', 20);
  configurations.set('cardsPerPlayer', 1);
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
 * Sends the room code to the client who created a game.
 * @param {WebSocket} socket Client socket.
 * @param {String} roomCode Created room's code.
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
 * @param {Object} message Message received from client.
 * @param {WebSocket} socket Socket to specific client.
 */
function createRoom(message, socket) {
  const playerNickname = message.nickname;
  const newPlayer = createPlayer(1, true);

  // TODO: fix code to sequential
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
    ['isStarted', false],
    ['config', setDefaultGameConfiguration()],
    ['players', playersMap],
  ]);

  availableRooms.set(roomCode, roomMap);
  sendRoomCode(socket, roomCode);
}

/**
 * Assigns avatar and stores guest in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of player that wants to join room.
 */
function addToRoom(message, socket) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');

  const playerPosition = playersMap.size + 1;
  const newPlayer = createPlayer(playerPosition, false);

  if (availableRooms.has(roomCode) === true) {
    if (playersMap.keys.length <= maximumClientAmount) {
      const playerMap = new Map([
        ['playerSocket', socket],
        ['playerInfo', newPlayer],
      ]);
      playersMap.set(playerNickname, playerMap);
      sendRoomCode(socket, roomCode);
    }
  }
}

/**
 * Figures out if player exists in room.
 * @param {Number} code Code of room.
 * @param {String} nickname Nickname of player.
 * @returns Boolean value indicating if player exists.
 */
function playerExists(code, nickname) {
  let exists = false;
  if (code && nickname && availableRooms.has(code)) {
    const roomInfo = availableRooms.get(code);
    if (roomInfo.has('players')) {
      const playersMap = roomInfo.get('players');
      if (playersMap.has(nickname)) {
        exists = true;
      }
    }
  }
  return exists;
}

/**
 * Sets amount of card per round to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of player requesting waiting room.
 */
function getWaitingRoom(message, socket) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;

  if (playerExists(roomCode, playerNickname) === true) {
    const roomInfo = availableRooms.get(roomCode);
    const roomConfig = roomInfo.get('config');
    const playersMap = roomInfo.get('players');
    const playerMap = playersMap.get(playerNickname);
    const playerInfo = playerMap.get('playerInfo');

    playerMap.set('playerSocket', socket);
    sendUpdatedPlayers(playerNickname, roomCode, 'handlePlayerList');

    // Sending player personalized waiting room.
    const newMessage = {
      type: 'handleWaitingRoom',
      from: 'server',
      to: 'player',
      when: 'When the server send personalized waiting room',
      isHost: playerInfo.get('host'),
      players: createPlayerStringMap(playersMap),
      config: createConfigStringMap(roomConfig),
    };
    socket.send(JSON.stringify(newMessage));
  }
}

/**
 * Sets amount of card per round to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Is not used, but added for consistency.
 */
function setCardsPerRound(message) {
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
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function setMaxTime(message) {
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
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function setCardsPerPlayer(message) {
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
 * Sets adaptation 1a to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp1a(message) {
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
 * Sets adaptation 1b to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp1b(message) {
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
 * Sets adaptation 2a to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp2a(message) {
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
 * Sets adaptation 2b to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp2b(message) {
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
 * Sets adaptation 3a to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp3a(message) {
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
 * Sets adaptation 3b to guests in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function toggleAdp3b(message) {
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
 * @param {Map} playersMap Map with players in a certain room.
 */
function assignNewHost(playersMap) {
  const playerNicknames = Array.from(playersMap.keys());
  const randomNumber = getRandomNumber(1, playerNicknames.length);
  const newHost = playerNicknames[randomNumber - 1];
  if (playersMap.has(newHost)) {
    const hostMap = playersMap.get(newHost);
    const hostInfo = hostMap.get('playerInfo');
    hostInfo.set('host', true);
  }
}

/**
 * Removes player in list for other players in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting change on server.
 */
function removePlayer(message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;
  if (roomCode && playerNickname && availableRooms.has(roomCode)) {
    const roomInfo = availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');
    playersMap.delete(playerNickname);
    // TODO: update ranking
    assignNewHost(playersMap);

    // Sending messages to other players to let them know a player has left.
    sendUpdatedPlayers(playerNickname, roomCode);
  }
}

/**
 * Assigns random card to player.
 */
function selectNewCard() {
  const randomNumber = getRandomNumber(1, Object.keys(cardRoutes).length);
  const card = cardRoutes[randomNumber];

  const randomColor = getRandomNumber(0, cardColors.length - 1);
  const color = cardColors[randomColor];

  const cardMap = new Map([
    ['description', card.description],
    ['route', card.route],
    ['border', color],
  ]);

  return cardMap;
}

/**
 * Checks if card exists in room.
 * @param {*} card
 * @param {*} roomCode
 * @returns
 */
function checkForCard(card, roomCode) {
  // TODO: complete
  let cardExists = false;

  cardExists = true;

  return cardExists;
}

/**
 * Selects board cards for room.
 * @param {*} roomCode
 */
function selectGameCards(roomCode) {
  if (availableRooms.has(roomCode)) {
    const roomInfo = availableRooms.get(roomCode);
    const roomConfig = roomInfo.get('config');
    const cardsBoard = roomConfig.get('cardsPerRound');

    const boardCardsMap = new Map();
    for (let cardIndex = 0; cardIndex < cardsBoard; cardIndex += 1) {
      const newCard = selectNewCard();
      if (checkForCard(newCard, boardCardsMap) === true) {
        boardCardsMap.set(cardIndex, newCard);
      }
    }
    roomInfo.set('board', boardCardsMap);
  }
}

/**
 * Selects random player cards.
 * @param {*} playerInfo
 * @param {*} cardAmount
 * @param {*} boardCards
 */
function selectPlayerCards(playerInfo, cardAmount, boardCards) {
  const boardKeys = Array.from(boardCards.keys());
  const playerCardsMap = new Map();
  for (let cardIndex = 0; cardIndex < cardAmount; cardIndex += 1) {
    const randomNumber = getRandomNumber(0, boardKeys.length - 1);
    const newCard = boardCards.get(randomNumber);
    if (newCard) {
      if (checkForCard(newCard, playerCardsMap)) {
        playerCardsMap.set(newCard.get('description'), newCard);
      }
    }
  }
  const key = playerCardsMap.keys();
  for (let index = 0; index < playerCardsMap.size; index += 1) {
    console.log(key.next().value);
  }
  playerInfo.set('cards', playerCardsMap);
  console.log(playerInfo.get('cards'));
}

/**
 * Retrieves player score from map.
 * @param {*} nickname Player Nickname.
 * @param {*} players Players map.
 * @returns Player's score.
 */
function getPlayerScore(nickname, players) {
  let playerScore = null;
  if (players.has(nickname)) {
    const playerMap = players.get(nickname);
    if (playerMap) {
      const playerInfo = playerMap.get('playerInfo');
      if (playerInfo) {
        playerScore = playerInfo.get('points');
      }
    }
  }
  return playerScore;
}

/**
 * Identifies which player has the lowest score.
 * @param {Map} playersMap Map of players to check.
 */
function identifyCurrentLoser(playersMap) {
  // Empty map with lowest score info.
  let lowestScore = null;
  // Player nicknames.
  const playerNicknames = Array.from(playersMap.keys());
  // First player nickname.
  let playerNickname = playerNicknames[0];
  // First player map.
  let playerScore = getPlayerScore(playerNickname, playersMap);
  // Setting first player's score as lowest.
  lowestScore = new Map([
    ['nickname', playerNickname],
    ['score', playerScore],
  ]);

  // Finding lowest score and asigning it to lowestScore map.
  for (let playerIndex = 1; playerIndex < playerNicknames.length; playerIndex += 1) {
    playerNickname = playerNicknames[playerIndex];
    playerScore = getPlayerScore(playerNickname, playersMap);
    // If current player has a lower score than the lowest score recorded, store it.
    if ((playerScore && lowestScore) && lowestScore.get('score') > playerScore) {
      lowestScore.set('nickname', playerNickname);
      lowestScore.set('score', playerScore);
    }
  }
  // Returns a map with information about player with lowest score.
  return lowestScore;
}

/**
 * Applies extra cards to guests in room.
 * @param {String} roomCode Room code.
 */
function applyExtraCards(roomCode) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  const playerNickname = identifyCurrentLoser(playersMap);

  // TODO: try if it works

  playersMap.forEach((playerData, otherPlayerNickname) => {
    if (otherPlayerNickname !== playerNickname) {
      const newCards = {
        1: selectNewCard(),
        2: selectNewCard(),
        3: selectNewCard(),
        4: selectNewCard(),
      };
      // TODO: add to player
      // Sends to player.
      const message = {
        type: 'handleExtraCards',
        from: 'server',
        to: 'client',
        when: 'When the server lets players know to apply extra cards',
        extraCards: JSON.stringify(newCards),
      };
      const socket = playerData.get('playerSocket');
      socket.send(JSON.stringify(message));
    }
  });
}

/**
 * Applies blur to guests in room.
 * @param {String} roomCode Code of room where blur will be applied
 */
function applyBlur(roomCode) {
  const roomInfo = availableRooms.get(roomCode);
  const playersMap = roomInfo.get('players');
  const loserPlayer = identifyCurrentLoser(playersMap);
  if (loserPlayer) {
    const loserNickname = loserPlayer.get('nickname');
    // Sends to other players in room.
    const newMessage = {
      type: 'handleBlur',
      from: 'server',
      to: 'client',
      when: 'When the server lets players know to activate blur',
    };
    broadcastToOthers(newMessage, roomCode, loserNickname);
  }
}

/**
 * Sets a timeout at a specific time that iniciates a special event to players.
 * @param {*} roomCode
 */
function setSpecialEvents(roomCode) {
  const roomInfo = availableRooms.get(roomCode);
  const configMap = roomInfo.get('config');
  const maxTime = configMap.get('maxTime');
  const specialEventTime = (maxTime / 2) * 1000;

  if (configMap.get('adaptation3a') === true) {
    setTimeout(() => applyExtraCards(roomCode), specialEventTime);
  } else if (configMap.get('adaptation3b') === true) {
    setTimeout(() => applyBlur(roomCode), specialEventTime);
  }
}

/**
 * Starts game for all players in room.
 * @param {Object} message Message sent by client.
 * @param {WebSocket} socket Socket of host requesting start of game.
 */
function startGame(message) {
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  selectGameCards(roomCode);
  setSpecialEvents(roomCode);

  if (availableRooms.has(roomCode)) {
    const roomInfo = availableRooms.get(roomCode);
    const roomConfig = roomInfo.get('config');
    const boardCards = roomInfo.get('board');
    const playersMap = roomInfo.get('players');

    if (roomConfig && boardCards && playersMap) {
      const cardAmount = roomConfig.get('cardsPerPlayer');
      playersMap.forEach((playerData) => {
        const playerInfo = playerData.get('playerInfo');
        selectPlayerCards(playerInfo, cardAmount, boardCards);
      });
      availableRooms.get(roomCode).set('isStarted', true);

      // Prepare cards?
      const newMessage = {
        type: 'handleStartGame',
        from: 'server',
        to: 'player',
        when: 'When the server lets players know game has started',
      };
      broadcastToOthers(newMessage, roomCode, playerNickname);
    }
  }
}

/**
 * Sets amount of card per round to guests in room.
 * @param {*} message
 * @param {*} socket
 */
function getGameRoom(message, socket) {
  const playerNickname = message.nickname;
  const roomCode = message.sessionCode;

  if (playerExists(roomCode, playerNickname) === true) {
    const roomInfo = availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');
    const configMap = roomInfo.get('config');
    const playerMap = playersMap.get(playerNickname);

    playerMap.set('playerSocket', socket);
    sendUpdatedPlayers(playerNickname, roomCode);

    // Sending player personalized waiting room.
    const newMessage = {
      type: 'handleGameRoom',
      from: 'server',
      to: 'player',
      when: 'When the server send personalized game room',
      config: createConfigStringMap(configMap),
      players: createPlayerStringMap(playersMap),
      boardCards: createBoardStringMap(roomInfo.get('board')),
      playerCards: createPlayerCardsStringMap(playerMap),
    };
    socket.send(JSON.stringify(newMessage));
  }
}

/**
 * Change a player's score in a specific room.
 * @param {} playerNickname Player nickname.
 * @param {*} roomCode Unique room code.
 * @param {*} points Points to be added to the player.
 * @returns The new value of the player's points.
 */
function changePlayerScore(playerNickname, roomCode, points, playerInfo) {
  let playerPoints = playerInfo.get('points');
  playerPoints += points;
  playerInfo.set('points', playerPoints);
  return playerPoints;
}

function playerWon(playersMap, roomCode) {
  const NewMessage = {
    type: 'handleTimesUp',
    from: 'server',
    to: 'player',
    when: 'when player won',
    players: createPlayerStringMap(playersMap),
  };
  broadcastToOthers(NewMessage, roomCode, '');
}

/**
 * Checks if match is correct.
 */
function checkMatch(message, socket) {
  const playerCardId = message.playerCard;
  const boardCardId = message.boardCard;
  const roomCode = message.sessionCode;
  const playerNickname = message.nickname;

  const room = availableRooms.get(roomCode);
  const players = room.get('players');
  const player = players.get(playerNickname);
  const playerInfo = player.get('playerInfo');
  const cards = playerInfo.get('cards');
  // Checks if match is correct and updates score
  if (playerCardId === boardCardId) {
    // Eliminar la carta de la mano del jugador luego de corroborar que el match si fue correcto.
    if (cards.has(playerCardId)) {
      cards.delete(playerCardId);
    }
    const playerPoints = changePlayerScore(playerNickname, roomCode, 100, playerInfo);
    const newMessage = {
      type: 'handleMatchResponse',
      from: 'server',
      to: 'player',
      when: 'when server checks a match',
      isCorrectMatch: true,
      newScore: playerPoints,
      playerCards: createPlayerCardsStringMap(player),
    };
    // Sending player a message indicating if match is correct.
    socket.send(JSON.stringify(newMessage));
    // Si el jugador tiene 0 cartas en su mano luego de un match correcto, terminar el juego.
    if (cards.size === 0) {
      playerWon(players, roomCode);
    }
  } else {
    const playerPoints = changePlayerScore(playerNickname, roomCode, -10, playerInfo);
    const newMessage = {
      type: 'handleMatchResponse',
      from: 'server',
      to: 'player',
      when: 'when server checks a match',
      isCorrectMatch: false,
      newScore: playerPoints,
    };
    // Sending player a message indicating if match is not correct.
    socket.send(JSON.stringify(newMessage));
  }
  sendUpdatedPlayers('', roomCode, 'handlePlayerList');
}

/**
 * Finishes game for all players in room.
 */
function finishGame(message, socket) {
  const code = message.sessionCode;
  const roomInfo = availableRooms.get(code);
  const playersMap = roomInfo.get('players');

  const newMessage = {
    type: 'handleTimesUp',
    from: 'server',
    to: 'player',
    when: 'When the server lets players know times up',
    players: createPlayerStringMap(playersMap),
  };
  socket.send(JSON.stringify(newMessage));
}

/**
 * Closes connection with client.
 */
function closeConnection(socket) {
  /*
  if (availableRooms.has(roomCode)) {
    const roomMap = availableRooms.get(roomCode);
    const roomPlayers = roomMap.get('players');
    if (roomPlayers.has(playerNickname)) {
      removePlayer(message);
    }
  } */
}

// Contains all above functions that are called when message is received.
const functions = [
  validateCode,
  addToRoom,
  createRoom,
  getWaitingRoom,
  setCardsPerRound,
  setMaxTime,
  setCardsPerPlayer,
  toggleAdp1a,
  toggleAdp1b,
  toggleAdp2a,
  toggleAdp2b,
  toggleAdp3a,
  toggleAdp3b,
  startGame,
  getGameRoom,
  checkMatch,
  removePlayer,
  finishGame,
];

/**
 * Identifying message type in order to call appropiate function.
 * @param {*} functions Array with all functions.
 * @param {*} socket Socket with connection to server.
 * @param {*} receivedMessage Message received from server.
 * @returns Boolean value that indicates if message was identified or not.
 */
function identifyMessage(socket, receivedMessage) {
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

/**
 * When a connection is made with a client.
 */
server.on('connection', (clientSocket) => {
  /**
   * When message is received on socket...
   */
  clientSocket.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    if (identifyMessage(clientSocket, parsedMessage) === false) {
      console.log('No se pudo identificar el mensaje');
    }
  });

  /**
   * When socket with client is closed
   */
  clientSocket.on('close', () => {
    closeConnection(clientSocket);
    // TODO: arreglar esto, actualmente no se como detectar de que pagina es el socket
  });
});
