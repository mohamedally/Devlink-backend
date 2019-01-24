exports.up = function(knex, Promise) {
  return knex.schema.createTable("collaborators", table => {
    table
      .uuid("id")
      .notNull()
      .primary()
    table.uuid("projectId").notNull()
    table.uuid("userId").notNull()
    table.enu("status", ["INTERESTED", "CONFIRMED"]).notNull()
    table
      .timestamp("createdAt")
      .defaultTo(knex.fn.now())
      .notNull()
    table
      .timestamp("updatedAt")
      .defaultTo(knex.fn.now())
      .notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("collaborators")
}
