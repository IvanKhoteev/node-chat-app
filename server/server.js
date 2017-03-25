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

  socket.emit('newEmail', {
    from: 'ivan @example.com',
    text: 'Email text',
    createdAt: Date.now(),
  });

  socket.on('sendEmail', data => {
    console.log(`Send email with data: ${JSON.stringify(data, undefined, 2)}`);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', data => {
    console.log('create a new message and seed them');
    console.log(JSON.stringify(data, undefined, 2));
    socket.emit('newMessage', data);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
