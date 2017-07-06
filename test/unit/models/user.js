/* eslint-env mocha */
const User = require('../../../data/models/user');
const expect = require('chai').expect;

before(() =>
  User.query().del().then(() =>
    User.register('user0@example.com', '123456')));

describe('User#register', () => {
  it('register with an unused email', () => User.register('user1@example.com', '12345')
      .then((user) => {
        expect(user.toJSON().email).to.equal('user1@example.com');
      }));

  it('register with a taken email', (done) => {
    User.register('user0@example.com', '12345')
      .then(() => {
        done(new Error('broken UNIQUE constraint'));
      })
      .catch(() => {
        done();
      });
  });
});

describe('User#find', () => {
  it('fetch with email', (done) => {
    User.find('user11@example.com')
      .then((user) => {
        done(user ? null : new Error('no user model found'));
      })
      .catch((err) => {
        done(err);
      });
  });
});

