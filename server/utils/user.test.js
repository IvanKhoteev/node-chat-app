const expect = require('expect');

const {Users} = require('./user');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 'test_one_id',
      name: 'test_one_name',
      room: 'test_one_room',
    }, {
      id: 'test_two_id',
      name: 'test_two_name',
      room: 'test_two_room',
    }, {
      id: 'test_three_id',
      name: 'test_three_name',
      room: 'test_one_room',
    }];
  });

  it('should add new user', () => {
    const user = {
      id: 'test_id',
      name: 'test_name',
      room: 'test_room',
    };
    expect(users.addUser(user.id, user.name, user.room)).toEqual(user);
  });

  it('should remove user', () => {
    const user = users.users[0];
    expect(users.removeUser(user.id)).toEqual(user);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user if not exists', () => {
    const user_id = 'strange id';
    expect(users.removeUser(user_id)).toEqual(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should get user', () => {
    const user = users.users[0];
    expect(users.getUser(user.id)).toEqual(user);
  });

  it('should not get user if not exists', () => {
    const user_id = 'strange id';
    expect(users.getUser(user_id)).toBe(undefined);
  });

  it('should get user list', () => {
    const room = users.users[0].room;
    expect(users.getUserList(room)).toEqual([users.users[0].name, users.users[2].name]);
  });
});
