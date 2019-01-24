const Project = require("../../../models/Project")
const Collaborator = require("../../../models/Collaborator")
const User = require("../../../models/User")

const projectResolver = async (obj, args, context) => {
  const project = await Project.query().findById(args.id)
  return project
}

const projectsResolver = async (obj, args, context) => {
  const projects = await Project.query()
  return projects
}

const projectCollaborators = async (obj, args, context) => {
  const collaborators = await Collaborator.query()
    .where("projectId", obj.id)
    .andWhere("status", "CONFIRMED")
  return collaborators
}

const projectSkills = async (obj, args, context) => {
  const skills = await obj.$relatedQuery("projectSkills")
  return skills
}

const collaboratorDetails = async (obj, args, context) => {
  const userDetails = await User.query().findById(obj.userId)
  return userDetails
}

const projectRequests = async (obj, args, context) => {
  const requests = await Collaborator.query()
    .where("projectId", obj.id)
    .andWhere("status", "INTERESTED")
  return requests
}

const resolver = {
  Query: {
    project: projectResolver,
    projects: projectsResolver
  },
  Project: {
    collaborators: projectCollaborators,
    skills: projectSkills,
    requests: projectRequests
  },
  Collaborator: {
    user: collaboratorDetails
  }
}
module.exports = resolver
