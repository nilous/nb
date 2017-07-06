
exports.up = knex =>
  knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password_digest', 40).notNullable();
      table.string('nickname', 20);
      table.string('bio');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('last_activated_at').defaultTo(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable('user');
