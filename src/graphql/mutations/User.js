const User = require("../../models/User")
const Project = require("../../models/Project")
const bcrypt = require("bcrypt")
const config = require("../../../config")
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const { st } = require("../../../knex_connection")

const googleMapsClient = require("../../../googleMapsClient")

const createUser = async (obj, { input }) => {
  const registerInput = _.pick(input, [
    "name",
    "email",
    "github",
    "password",
    "bio",
    "picture",
    "city",
    "zipcode",
    "country"
  ])

  const result = await User.query().findOne("email", input.email)

  if (result) {
    return {
      error: {
        message: "Email already exists"
      }
    }
  }

  const hash = bcrypt.hashSync(input.password, config.saltRounds)
  registerInput.password = hash

  const user = googleMapsClient
    .geocode({
      address: input.zipcode
    })
    .asPromise()
    .then(async res => {
      const location = res.json.results[0].geometry.location
      registerInput.coordinate = st.geomFromText(
        `Point(${location.lat} ${location.lng})`,
        4326
      )
      const user = await User.query().insertWithRelatedAndFetch(registerInput)
      if (!user) {
        return {
          error: { message: "There was an error registering your information." }
        }
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, config.tokenSecret)

      return {
        user,
        token
      }
    })
  return user
}

const deleteUser = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: "User not logged in"
      }
    }
  }
  const result = await User.query()
    .delete()
    .where("id", args.id)

  if (result) {
    return {
      message: "Success deleting user"
    }
  }
}

const editUser = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: "User not logged in"
      }
    }
  }

  const { name, github, email, bio, city, zipcode, country } = args.input

  const payload = {}
  if (name) payload.name = name
  if (email) payload.email = email
  if (bio) payload.bio = bio
  if (city) payload.city = city
  if (zipcode) payload.zipcode = zipcode
  if (country) payload.country = country
  if (github) payload.github = github

  const user = googleMapsClient
    .geocode({
      address: zipcode
    })
    .asPromise()
    .then(async res => {
      const location = res.json.results[0].geometry.location
      payload.coordinate = st.geomFromText(
        `Point(${location.lat} ${location.lng})`,
        4326
      )

      const result = await User.query()
        .patch(payload)
        .where("id", context.user.id)

      if (!result) {
        return {
          error: {
            message: "Failed to edit user"
          }
        }
      }

      const newUser = await User.query().findById(context.user.id)
      return newUser
    })
  return user
}

const resolver = {
  Mutation: { createUser, deleteUser, editUser }
}

module.exports = resolver
