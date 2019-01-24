exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table
      .uuid("id")
      .notNull()
      .primary()
    table.text("name").notNull()
    table
      .text("email")
      .notNull()
      .unique()
    table.text("github").nullable()
    table.text("password").notNull()
    table.text("bio").nullable()
    table.text("picture").nullable()
    table.text("city").nullable()
    table.text("zipcode").nullable()
    table.text("country").nullable()
    table.specificType("coordinate", "GEOMETRY").nullable()
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
  return knex.schema.dropTable("users")
}
