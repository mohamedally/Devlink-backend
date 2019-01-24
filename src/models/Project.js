const BaseModel = require('./BaseModel')
const { BelongsToOneRelation, HasManyRelation } = require('objection')

class Project extends BaseModel {
    static get tableName() {
        return 'projects'
    }

    static get relationMappings() {
        const User = require('./User')
        const ProjectSkills = require('./ProjectSkills')
        const Collaborator = require('./Collaborator')

        return {
            project: {
                relation: BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'projects.leader',
                    to: 'users.id'
                },
            },
            projectSkills: {
                relation: HasManyRelation,
                modelClass: ProjectSkills,
                join: {
                    from: 'projects.id',
                    to: 'projectSkills.projectId',
                },
            },
            collaborators: {
                relation: HasManyRelation,
                modelClass: Collaborator,
                join: {
                    from: 'projects.id',
                    to: 'collaborators.projectId',
                },
            },
        }
    }
}

module.exports = Project
