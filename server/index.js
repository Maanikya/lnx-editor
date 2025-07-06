const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    socket.join(roomId);

    socket.on('content-change', (data) => {
      socket.to(roomId).emit('receive-changes', data);
    });

    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  });
});

server.listen(3001, () => {
  console.log(`\nServer running on: http://localhost:3001\n`);
});

