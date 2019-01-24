const { Model } = require('objection')
const uuidv4 = require('uuid/v4')

class BaseModel extends Model {
  $beforeInsert() {
    this.id = uuidv4()
  }

  $beforeUpdate() {
    this.updatedAt = new Date()
  }
}

module.exports = BaseModel