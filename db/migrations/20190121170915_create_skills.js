exports.up = function(knex, Promise) {
  return knex.schema.createTable("skills", table => {
    table
      .uuid("id")
      .notNull()
      .primary()
    table.uuid("userId").notNull()
    table.text("skill").notNull()
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
  return knex.schema.dropTable("skills")
}
