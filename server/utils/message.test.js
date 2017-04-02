const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('Message test', () => {
  it('should return object with passed parameters', () => {
    const from = 'ivan';
    const text = 'some text';
    const message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('Location message test', () => {
  it('should return object with passed parameters', () => {
    const from = 'Ivan';
    const latitude = 123;
    const longitude = 456;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});
