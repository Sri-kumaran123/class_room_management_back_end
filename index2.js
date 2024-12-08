const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 5000 });
let clients = {};

server.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch (data.type) {
      case 'join':
        clients[data.room] = clients[data.room] || [];
        clients[data.room].forEach(client => {
          if (client !== socket) {
            client.send(JSON.stringify({ type: 'join', from: socket.id }));
          }
        });
        clients[data.room].push(socket);
        break;

      case 'offer':
      case 'answer':
      case 'candidate':
        clients[data.to].forEach(client => {
          if (client !== socket) {
            client.send(message);
          }
        });
        break;
    }
  });

  socket.on('close', () => {
    console.log('A client disconnected');
  });
});

console.log('Signaling server is running on ws://localhost:5000');
