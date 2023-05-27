import { ip , port } from 'config.js';

// Including ws module.
const WebSocket = require('ws');
// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });
// Maximum number of clients allowed in webpage.
const maximumClientAmount = 20;
// Array that stores all sockets.
const sockets = [];

/**
 * 
 */
function closeConnection() {

}

/**
 * 
 */
function validateCode() {

}

/**
 * 
 */
function joinRoom() {

}

/**
 * 
 */
function setCardsPerRound() {

}

/**
 * 
 */
function setMaxTime() {

}

/**
 * 
 */
function setCardsPerPlayer() {

}

/**
 * 
 */
function toggleAdp1a() {

}

/**
 * 
 */
function toggleAdp1b() {

}

/**
 * 
 */
function toggleAdp2a() {

}

/**
 * 
 */
function toggleAdp2b() {

}

/**
 * 
 */
function toggleAdp3a() {

}

/**
 * 
 */
function toggleAdp3b() {

}

/**
 * 
 */
function addPlayer() {

}

/**
 * 
 */
function updatePlayers() {

}

/**
 * 
 */
function startGame() {

}

/**
 * 
 */
function handleMatchResponse() {

}

/**
 * 
 */
function receiveFinished() {

}

/**
 * 
 */
function timesUp() {

}

/**
 * 
 */
function applyExtraCards() {

}

/**
 * 
 */
function applyBlur() {

}

/**
 * Identifying message type in order to call appropiate function.
 */
function identifyMessage(receivedMessage) {
  switch (receivedMessage.Type) {
    case 'closeConnection':
      closeConnection(receivedMessage);
      break;
    case 'validateCode':
      validateCode(receivedMessage);
      break;
    case 'joinRoom':
      joinRoom(receivedMessage);
      break;
    case 'setCardsPerRound':
      setCardsPerRound(receivedMessage);
      break;
    case 'setMaxTime':
      setMaxTime(receivedMessage);
      break;
    case 'setCardsPerPlayer':
      setCardsPerPlayer(receivedMessage);
      break;
    case 'toggleAdp1a':
      toggleAdp1a(receivedMessage);
      break;
    case 'toggleAdp1b':
      toggleAdp1b(receivedMessage);
      break;
    case 'toggleAdp2a':
      toggleAdp2a(receivedMessage);
      break;
    case 'toggleAdp2b':
      toggleAdp2b(receivedMessage);
      break;
    case 'toggleAdp3a':
      toggleAdp3a(receivedMessage);
      break;
    case 'toggleAdp3b':
      toggleAdp3b(receivedMessage);
      break;
    case 'addPlayer':
      addPlayer(receivedMessage);
      break;
    case 'updatePlayers':
      updatePlayers(receivedMessage);
      break;
    case 'startGame':
      startGame(receivedMessage);
      break;
    case 'handleMatchResponse':
      handleMatchResponse(receivedMessage);
      break;
    case 'receiveFinished':
      receiveFinished(receivedMessage);
      break;
    case 'timesUp':
      timesUp(receivedMessage);
      break;
    case 'applyExtraCards':
      applyExtraCards(receivedMessage);
      break;
    case 'applyBlur':
      applyBlur(receivedMessage);
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
    sockets.push(socket);
  }

  socket.on('open', () => {
    console.log('Server conectado al cliente');
  });

  socket.on('message', (message) => {
    const receivedMessage = JSON.parse(message);
    console.log(`Recibi mensaje del cliente: ${receivedMessage}`);
    identifyMessage(receivedMessage);
  });

  socket.on('close', () => {
    console.log('Cerrando conexión con cliente...');
  });
});
