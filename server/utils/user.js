const _ = require('lodash');

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const user = _.remove(this.users, {id})[0];
    return user;
  }
  getUser(id) {
    return _.find(this.users, {id});
  }
  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}

module.exports = {Users};
