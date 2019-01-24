const casual = require('casual')

casual.define('skill', () => ({
  id: casual.uuid,
  skill: casual.word,
  name: casual.random_element([
    'Mohamed',
    'Tito',
    'Hossam',
    'Chris',
    'Daniel',
    'Idle',
  ]),
}))

const skills = []

for (let i = 0; i < 15; i++) {
  skills.push(casual.skill)
}

module.exports = skills
