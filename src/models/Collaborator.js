const BaseModel = require('./BaseModel')
const {BelongsToOneRelation } = require('objection')

class Collaborator extends BaseModel {
    static get tableName() {
        return 'collaborators'
    }

    static get relationMappings() {
        const Project = require('./Project')
        const User = require('./User')

        return {
            collaboratorsProject: {
                relation: BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'collaborators.projectId',
                    to: 'projects.id'
                },
            },
            collaboratorsUser: {
                relation: BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'collaborators.userId',
                    to: 'users.id'
                },
            },
        }
    }
}

module.exports = Collaborator
