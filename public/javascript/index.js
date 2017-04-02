const socket = window.io();

socket.on('connect', () => {
  console.log('Successfully connected to the server');
});

socket.on('disconnect', () => {
  console.log('Connection failed');
});

socket.on('newMessage', data => {
  const li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  $('#message-list').append(li);
  $('input[name=message]').val('');
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Frank',
    text: $('input[name=message]').val(),
  }, data => {
    console.log(data + '!');
  });
});
