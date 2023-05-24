// import { ip , port } from 'config.js';

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 9009 });

server.on('connection', (socket) => {
  socket.on('open', () => {
    console.log('Server conectado al cliente');
  });

  socket.on('message', (message) => {
    console.log(`Recibi mensaje del cliente: ${message}`);
    socket.send('Hola cliente');
  });

  socket.on('close', () => {
    console.log('Cerrando conexión con cliente...');
  });
});
