global.config = require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  io.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome all',
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'For all except admin',
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', data => {
    console.log('create a new message and seed them');
    console.log(JSON.stringify(data, undefined, 2));
    // io.emit('newMessage', data);
    // socket.broadcast.emit('newMessage', data);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
