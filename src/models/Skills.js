const BaseModel = require('./BaseModel')
const { BelongsToOneRelation } = require('objection')

class Skill extends BaseModel {
    static get tableName() {
        return 'skills'
    }

    static get relationMappings() {
        const User = require('./User')

        return {
            skills: {
                relation: BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'skills.userId',
                    to: 'users.id',
                },
            },
        }
    }
}

module.exports = Skill
