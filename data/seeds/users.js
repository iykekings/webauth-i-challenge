const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          firstName: 'matt',
          lastName: 'hardman',
          email: 'matt@hardman.com',
          password: bcrypt.hashSync('matt', salt)
        },
        {
          id: 2,
          firstName: 'melvine',
          lastName: 'awa',
          email: 'melvine@awa.com',
          password: bcrypt.hashSync('melvine', salt)
        },
        {
          id: 3,
          firstName: 'pascal',
          lastName: 'ulor',
          email: 'pascal@ulor.com',
          password: bcrypt.hashSync('pascal', salt)
        }
      ]);
    });
};
