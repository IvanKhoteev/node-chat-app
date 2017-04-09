const expect = require('expect');
const {isRealString} = require('./validation');

describe('Validation test', () => {
  it('should return true if real not empty string', () => {
    const params = {name: 'Ivan', room: '123'};

    expect(isRealString(params.name)).toBe(true);
    expect(isRealString(params.room)).toBe(true);
  });

  it('should return false if empty name or room', () => {
    let str = 123;

    expect(isRealString(str)).toBe(false);

    str = ' ';

    expect(isRealString(str)).toBe(false);

    str = '123';

    expect(isRealString(str)).toBe(true);
  });
});
