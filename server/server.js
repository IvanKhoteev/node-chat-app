global.config = require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
  const id = Object.keys(io.sockets.sockets).slice(-1)[0];

  // io.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  io.sockets.sockets[id].emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user join chat'));

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', (data, callback) => {
    console.log('create a new message and seed them');
    console.log(JSON.stringify(data, undefined, 2));
    io.emit('newMessage', data);
    callback();
    // socket.broadcast.emit('newMessage', data);
  });

  socket.on('createLocationMessage', coords => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
