exports.up = function(knex, Promise) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
}

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP EXTENSION "uuid-ossp";')
}
