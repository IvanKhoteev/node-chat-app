const expect = require('expect');
const {generateMessage} = require('./message');

describe('Message test', () => {
  it('should return object with passed parameters', () => {
    const from = 'ivan';
    const text = 'some text';
    const message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});
