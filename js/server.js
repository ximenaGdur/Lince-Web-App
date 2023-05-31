// import { ip , port } from 'config.js';

// Maximum number of clients allowed in webpage.
const maximumClientAmount = 20;
// Including ws module.
const WebSocket = require('ws');
// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });
// Array that stores all sockets.
const sockets = [];

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
      /*
      from: 'server',
      to: 'client',
      when: 'When the server validates room',
      */
      isValid: 'true',
    };
  } else {
    newMessage = {
      type: 'handleCodeValidation',
      /*
      from: 'server',
      to: 'client',
      when: 'When the server validates room',
      */
      isValid: 'false',
    };
  }
  socket.send(JSON.stringify(newMessage));
  console.log('validateCode');
}

/**
 * Adds guest to room.
 */
function addToRoom(socket, message) {
  console.log('addToRoom');
}

/**
 * Creates new room for host.
 */
function createRoom(socket, message) {
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
 * Adds player to list for other players in room.
 */
function addPlayer(socket, message) {
  console.log('addPlayer');
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
    case 'addPlayer':
      addPlayer(socket, receivedMessage);
      break;
    case 'removePlayer':
      removePlayer(socket, receivedMessage);
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
