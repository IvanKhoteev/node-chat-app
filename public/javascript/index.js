const socket = window.io();

socket.on('connect', () => {
  console.log('Successfully connected to the server');
});

socket.on('disconnect', () => {
  console.log('Connection failed');
});

socket.on('newMessage', data => {
  const template = $('#message-template').html();
  const formattedTime = moment(data.createdAt).format('h:mm a');
  const html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime,
  });
  $('#message-list').append(html);
});

socket.on('newLocationMessage', data => {
  const template = $('#location-message-template').html();
  const formattedTime = moment(data.createdAt).format('h:mm a');
  const html = Mustache.render(template, {
    url: data.url,
    from: data.from,
    createdAt: formattedTime,
  });
  $('#message-list').append(html);
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
