const BaseModel = require("./BaseModel")
const { HasManyRelation } = require("objection")

class User extends BaseModel {
  static get tableName() {
    return "users"
  }

  static get relationMappings() {
    const Skill = require("./Skills")
    const Project = require("./Project")
    const Collaborator = require("./Collaborator")

    return {
      skills: {
        relation: HasManyRelation,
        modelClass: Skill,
        join: {
          from: "users.id",
          to: "skills.userId"
        }
      },
      projects: {
        relation: HasManyRelation,
        modelClass: Project,
        join: {
          from: "users.id",
          to: "projects.leader"
        }
      },
      collaborators: {
        relation: HasManyRelation,
        modelClass: Collaborator,
        join: {
          from: "users.id",
          to: "collaborators.userId"
        }
      }
    }
  }
}

module.exports = User
