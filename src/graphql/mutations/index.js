const merge = require("lodash.merge")

const auth = require("./Auth")
const user = require("./User")
const project = require("./Project")
const collaborate = require("./Collaborate")

const resolvers = [user, auth, collaborate, project]

module.exports = merge(...resolvers)
