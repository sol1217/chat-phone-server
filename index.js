const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());


io.on('connection', (socket) => {
  
  socket.on('message', (message) => {
    console.log('Message received from the client:', message);
    
    socket.broadcast.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnect');
  });
});

const PORT = process.env.PORT || 5030;

server.listen(PORT, () => {
  console.log(`Listen on the port: ${PORT}`);
});
