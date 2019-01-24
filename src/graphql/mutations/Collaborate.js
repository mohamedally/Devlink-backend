const User = require("../../models/User")
const Project = require("../../models/Project")
const Collaborator = require("../../models/Collaborator")

const collaborateRequest = async (obj, args, context) => {
  if (!context.user) {
    return {
      error: {
        message: "You must log in to send collaborate request"
      }
    }
  }

  const payload = {
    projectId: args.projectId,
    userId: context.user.id,
    status: "INTERESTED"
  }

  const requestSent = await Collaborator.query()
    .where("projectId", payload.projectId)
    .andWhere("userId", payload.userId)

  if (requestSent.length) {
    return {
      error: {
        message: "Request already sent"
      }
    }
  }

  const result = await Collaborator.query().insert(payload)

  if (!result) {
    return {
      error: {
        message: "Failed to send collaborate request"
      }
    }
  }

  return {
    message: "Collaborate request sent"
  }
}

const acceptRequest = async (obj, args, context) => {
  const result = await Collaborator.query()
    .patch({ status: "CONFIRMED" })
    .where("projectId", args.projectId)
    .andWhere("userId", args.from)

  if (result) {
    return {
      message: "You accepted the collaboration request"
    }
  }

  return {
    error: {
      message: "Failed to accept collaboration request"
    }
  }
}

const declineRequest = async (obj, args, context) => {
  const result = await Collaborator.query()
    .delete()
    .where("projectId", args.projectId)
    .andWhere("userId", args.from)

  if (result) {
    return {
      message: "You declined the request to collaborate"
    }
  }

  return {
    error: {
      message: "Error in declining request"
    }
  }
}

const resolver = {
  Mutation: { collaborateRequest, acceptRequest, declineRequest }
}

module.exports = resolver
