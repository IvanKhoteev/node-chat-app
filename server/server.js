global.config = require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {addUser, removeUser, getUser, getUserList} = require('./utils/user');
const {Users} = require('./utils/user');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
  const id = Object.keys(io.sockets.sockets).slice(-1)[0];

  // io.sockets.sockets[id].emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
 socket.on('join', (params, callback) => {
   if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room are required');
   } else {
     users.removeUser(socket.id);
     const user = users.addUser(socket.id, params.name, params.room);
     socket.join(user.room);
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
     socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has joined.`));
     const userList = users.getUserList(user.room);
     io.to(user.room).emit('updateUserList', userList);
     callback();
   }
 });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      const userList = users.getUserList(user.room);
      io.to(user.room).emit('updateUserList', userList);
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

  socket.on('createMessage', (data, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(data.text)) {
      io.to(user.room).emit('newMessage', {from: user.name, text: data.text});
    }
    callback();
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
