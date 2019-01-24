
exports.up = function(knex, Promise) {
    return knex.schema.createTable("projectSkills", table => {
        table
          .uuid("id")
          .notNull()
          .primary()
        table.text("skill").notNull()
        table.uuid('projectId').notNull()
        table
          .timestamp("createdAt")
          .defaultTo(knex.fn.now())
          .notNull()
        table
          .timestamp("updatedAt")
          .defaultTo(knex.fn.now())
          .notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("projectSkills")
  };
  