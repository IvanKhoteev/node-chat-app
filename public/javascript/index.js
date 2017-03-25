const socket = window.io();

socket.on('connect', () => {
  console.log('Successfully connected to the server');

  socket.emit('sendEmail', {
    to: 'wer@example.com',
    text: 'text',
  });

  socket.emit('createMessage', {
    from: 'some user',
    text: 'text message',
  });
});

socket.on('disconnect', () => {
  console.log('Connection failed');
});

socket.on('newEmail', email => {
  console.log(`New email was coming\nfrom: ${email.from},\nwith text: ${email.text},\nat: ${new Date(email.createdAt)}`);
});

socket.on('newMessage', data => {
  console.log('New message');
  console.log(JSON.stringify(data, undefined, 2));
});
