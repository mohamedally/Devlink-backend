const merge = require("lodash.merge")

const user = require("./user")
const project = require("./project")

const resolvers = [user, project]

module.exports = merge(...resolvers)
