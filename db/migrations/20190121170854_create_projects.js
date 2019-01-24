exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
    table
      .uuid("id")
      .notNull()
      .primary()
    table.text("title").notNull()
    table.text("description").notNull()
    table.uuid("leader").notNull()
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
  return knex.schema.dropTable("projects")
}
