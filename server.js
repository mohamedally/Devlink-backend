const express = require("express")
const { port, apiKey, tokenSecret } = require("./config")
const { ApolloServer } = require("apollo-server-express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const User = require("./src/models/User")
const schema = require("./src/graphql")
const { Model } = require("objection")
const { knex } = require("./knex_connection")
Model.knex(knex)
knex.migrate.latest()

const app = express()

// Middleware to handle CORS
app.use((req, res, next) => {
  let oneof = false
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    oneof = true
  }
  if (req.headers["access-control-request-method"]) {
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    )
    oneof = true
  }
  if (req.headers["access-control-request-headers"]) {
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    )
    oneof = true
  }
  if (oneof) {
    res.header("Access-Control-Max-Age", 60 * 60 * 24 * 365)
  }
  if (oneof && req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  return next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    if (!req) {
      return {}
    }
    const token = req.headers ? req.headers.authorization : undefined
    if (token) {
      const decoded = jwt.verify(token, tokenSecret)
      const user = await User.query().findById(decoded.id)
      return { user }
    }
    return {}
  }
})

server.applyMiddleware({ app })

app.get("/", (req, res) => res.send("Devlink server"))

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)

module.exports = app
