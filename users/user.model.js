const knex = require('knex');
const config = require('../knexfile').development;
const db = knex(config);

const getUsers = id =>
  !id
    ? db('users')
    : db('users')
        .where({ id })
        .first();

const createUser = user =>
  db('users')
    .insert(user)
    .then(([id]) => getUsers(id));

module.exports = {
  getUsers,
  createUser
};
