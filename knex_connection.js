const Knex = require("knex")
const knexfile = require("./knexfile")
const knexPostgis = require("knex-postgis")
const knex = Knex(knexfile.development)
const st = knexPostgis(knex)

module.exports = { knex, st }
