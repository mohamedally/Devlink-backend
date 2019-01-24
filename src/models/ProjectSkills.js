const BaseModel = require('./BaseModel')
const { BelongsToOneRelation } = require('objection')

class ProjectSkills extends BaseModel {
    static get tableName() {
        return 'projectSkills'
    }

    static get relationMappings() {
        const Project = require('./Project')

        return {
            projectSkills: {
                relation: BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'projectSkills.projectId',
                    to: 'projects.id',
                },
            },
        }
    }
}

module.exports = ProjectSkills
