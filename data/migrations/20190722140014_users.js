exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('firstName', 128).notNullable();
    table.text('lastName', 128).notNullable();
    table.text('email', 128).notNullable();
    table.text('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.dropTableIfExists('users');
};
