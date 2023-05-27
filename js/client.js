const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8009');

socket.addEventListener('open', () => {
  console.log('Conectado al servidor.');

  console.log('Mandando mensaje al servidor.');
  socket.send('Hola, servidor.');
});

socket.addEventListener('message', (event) => {
  console.log(`Recibi del servidor: ${event.data}`);
});
