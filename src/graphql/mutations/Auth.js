const User = require("../../models/User")
const config = require("../../../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (obj, { email, password }) => {
  if (!email) {
    return {
      error: {
        message: "Email not provided"
      }
    }
  }

  if (!password) {
    return {
      error: {
        message: "Password not provided"
      }
    }
  }
  const user = await User.query().findOne("email", email)

  if (!user) {
    return {
      error: {
        message: "Email does not exist."
      }
    }
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return {
      error: {
        message: "Invalid password."
      }
    }
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, config.tokenSecret)
  return {
    user,
    token
  }
}

const resolver = {
  Mutation: { loginUser }
}

module.exports = resolver
