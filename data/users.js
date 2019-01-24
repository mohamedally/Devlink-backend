const bcrypt = require("bcrypt")
const casual = require("casual")
const config = require("../config")
const uuid = require("uuid")
const { st } = require("../knex_connection")

casual.define("user", person => ({
  id: uuid(),
  email: casual.email,
  name: person.name,
  password: bcrypt.hashSync(casual.password, config.saltRounds),
  bio: casual.description,
  picture: casual.picture,
  coordinate: st.geomFromText(`Point(${person.lat} ${person.lng})`, 4326),
  city: person.city,
  picture: "https://picsum.photos/200?random",
  zipcode: person.zipcode,
  country: "USA"
}))

const people = [
  {
    name: "Mohamed",
    city: "Cambridge",
    zipcode: "02138",
    lat: 42.3803274,
    lng: -71.13891009999999,
    address: "Cambridge, MA 02138, USA"
  },
  {
    name: "Tito",
    city: "New Orleans",
    zipcode: "70032",
    lat: 29.9595992,
    lng: -89.9976686,
    address: "Arabi, LA 70032, USA"
  },
  {
    name: "Hossam",
    city: "Los Angeles",
    zipcode: "90001",
    lat: 33.9697897,
    lng: -118.2468148,
    address: "Los Angeles, CA 90001, USA"
  },
  {
    name: "Chris",
    city: "New York City",
    zipcode: "10013",
    lat: 40.7217861,
    lng: -74.0094471,
    address: "New York, NY 10013, USA"
  },
  {
    name: "Daniel",
    city: "Philadelphia",
    zipcode: "19104",
    lat: 39.9583587,
    lng: -75.1953934,
    address: "Philadelphia, PA 19104, USA"
  },
  {
    name: "Idle",
    city: "Miami Beach",
    zipcode: "33109",
    lat: 25.7560139,
    lng: -80.1344842,
    address: "Miami Beach, FL 33109, USA"
  }
]

const users = people.map(person => casual.user(person))

module.exports = users
