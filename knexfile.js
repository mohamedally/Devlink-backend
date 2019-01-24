const config = require("./config")

module.exports = {
  development: {
    client: "pg",
    connection: config.databaseUrl,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    },
    useNullAsDefault: true
  }
}
