// import { ip , port } from 'config.js';

// Maximum number of clients allowed in webpage.
const maximumClientAmount = 20;
// Including ws module.
const WebSocket = require('ws');
// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });
// Array that stores all sockets.
const sockets = [];

const availableRooms = {
  1234: {
    players: {
      1: {
        nickname: 'playerx',
        avatar: { route: 'bear.png', description: 'Oso' },
        points: '2',
      },
    },
  },
};

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
 * Closes connection with client.
 */
function closeConnection(socket, message) {
  console.log('closeConnection');
}

/**
 * Checks if room with given code exists.
 */
function validateCode(socket, messageReceived) {
  let newMessage = {};
  if (messageReceived.sessionCode === '1234') {
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
  const randomNumber = getRandomNumber(1, avatarRoutes.length);
  const playerAvatar = avatarRoutes[randomNumber];
  return playerAvatar;
}

/**
 * Creates new player and adds it to the room.
 */
function createPlayer(roomId, name) {
  const newPlayerKey = availableRooms[roomId].players + 1;
  const playerAvatar = selectAvatar();
  const newPlayer = {
    nickname: name,
    avatar: playerAvatar,
    points: '0',
  };
  availableRooms[roomId].players[newPlayerKey] = newPlayer;
  return newPlayerKey;
}

/**
 * Adds player to list for other players in room.
 */
function addPlayer(socket, name, url, score) {
  // TODO: send to everyone in room
  console.log('addPlayer');
  const newMessage = {
    type: 'handleNewPlayer',
    from: 'server',
    to: 'player',
    when: 'When the server lets clients know a new player has been added',
    players: {
      1: {
        nickname: name,
        avatar: url,
        points: score,
      },
    },
  };
  socket.send(JSON.stringify(newMessage));
  console.log(`MENSAJE${newMessage}`);
}

/**
 * Adds guest to room.
 */
function addToRoom(socket, message) {
  const newPlayerKey = createPlayer(message.sessionCode, message.nickname);
  // if player existed must be handled differently, must order!!
  // for all players in room with message.sessionCode
  addPlayer(socket, message.nickname);
  console.log('addToRoom');
}

/**
 * Creates new room for host.
 */
function createRoom(socket, message) {
  availableRooms.push();
  // asign avatar and store in room
  console.log('createRoom');
}

/**
 * Sets amount of card per round to other players in room.
 */
function setCardsPerRound(socket, message) {
  console.log('setCardsPerRound');
}

/**
 * Sets maximum time per round to other players in room.
 */
function setMaxTime(socket, message) {
  console.log('setMaxTime');
}

/**
 * Sets amount of card per player to other players in room.
 */
function setCardsPerPlayer(socket, message) {
  // function addPlayer(socket, name, url, score)
  addPlayer(socket, 'xime', 'bear.png', '30');
  console.log('setCardsPerPlayer');
}

/**
 * Sets adaption 1a to other players in room.
 */
function toggleAdp1a(socket, message) {
  console.log('toggleAdp1a');
}

/**
 * Sets adaption 1b to other players in room.
 */
function toggleAdp1b(socket, message) {
  console.log('toggleAdp1b');
}

/**
 * Sets adaption 2a to other players in room.
 */
function toggleAdp2a(socket, message) {
  console.log('toggleAdp2a');
}

/**
 * Sets adaption 2b to other players in room.
 */
function toggleAdp2b(socket, message) {
  console.log('toggleAdp2b');
}

/**
 * Sets adaption 3a to other players in room.
 */
function toggleAdp3a(socket, message) {
  console.log('toggleAdp3a');
}

/**
 * Sets adaption 3b to other players in room.
 */
function toggleAdp3b(socket, message) {
  console.log('toggleAdp3b');
}

/**
 * Removes player in list for other players in room.
 */
function removePlayer(socket, message) {
  console.log('removePlayer');
}

/**
 * Starts game for all players in room.
 */
function startGame(socket, message) {
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
function finishGame(socket, message) {
  console.log('finishGame');
}

/**
 * Applies extra cards to other players in room.
 */
function applyExtraCards(socket, message) {
  console.log('applyExtraCards');
}

/**
 * Applies blur to other players in room.
 */
function applyBlur(socket, message) {
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
    /* case 'addPlayer':
      addPlayer(socket, receivedMessage);
      break;
    case 'removePlayer':
      removePlayer(socket, receivedMessage);
      break; */
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
server.on('connection', (socket) => {
  console.log('Estableciendo de conexión con cliente...');

  if (sockets.length <= maximumClientAmount) {
    sockets.push(socket); // DEBERIA SER UN DICCIONARIO, NO LO ESTOY USANDO PORQUE ESTOY PROBANDO
  }

  socket.on('message', (message) => {
    console.log(`Recibi mensaje del cliente: ${message}`);
    const receivedMessage = JSON.parse(message);
    identifyMessage(socket, receivedMessage);
  });

  socket.on('close', () => {
    console.log('Cerrando conexión con cliente...');
  });
});
