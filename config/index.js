require("dotenv").config()

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  saltRounds: process.env.SALT_ROUNDS || 10,
  apiKey: process.env.API_KEY,
  tokenSecret: process.env.TOKEN_SECRET
}
