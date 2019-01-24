const { apiKey } = require("./config")
const googleMapsClient = require("@google/maps").createClient({
  key: apiKey,
  Promise: Promise
})

module.exports = googleMapsClient
