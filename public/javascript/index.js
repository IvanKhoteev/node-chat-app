const socket = window.io();

socket.on('connect', () => {
  console.log('Successfully connected to the server');
});

socket.on('disconnect', () => {
  console.log('Connection failed');
});

socket.on('newMessage', data => {
  console.log('New message');
  console.log(JSON.stringify(data, undefined, 2));
});
