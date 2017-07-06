const Bookshelf = require('./bookshelf');
const crypto = require('crypto');

const User = Bookshelf.Model.extend({
  tableName: 'user',
}, {
  register: (email, password) =>
    new User({ email, password_digest: crypto.createHash('md5').update(password).digest('hex') }).save(),

  find: email => new User({ email }).fetch(),
});

module.exports = User;
