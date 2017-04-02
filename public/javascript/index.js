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
});

socket.on('newLocationMessage', data => {
  const li = $(`<li></li>`);
  const a = $('<a target="_blank">My current location </a>');
  a.attr('href', data.url);
  li.text(`${data.from}:  `);
  li.append(a);
  $('#message-list').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextbox = $('input[name=message]');
  socket.emit('createMessage', {
    from: 'Frank',
    text: messageTextbox.val(),
  }, () => {
    messageTextbox.val('');
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not support in your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    const coords = position.coords;
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }, () => {}); // It is a callback function, which we could will run on server side
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location data ');
  });
});
