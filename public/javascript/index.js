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
  socket.emit('createMessage', {
    from: 'Frank',
    text: $('input[name=message]').val(),
  }, data => {
    console.log(data + '!');
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not support in your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    const coords = position.coords;
    socket.emit('createLocationMessage', {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }, data => { // It is a callback function, which we could will run on server side
      console.log(data + '!');
    });
  }, function () {
    alert('Unable to fetch location data ');
  });
});
