const casual = require('casual')

casual.define('projectSkill', () => ({
    id: casual.uuid,
    skill: casual.word,
    title: casual.random_element([
        'Crimson App',
        'WHRB App',
        'HOC App',
        'HIA App',
        'HCCG App',
    ])
}))

const projectSkills = []

for (let i = 0; i < 10; i++) {
    projectSkills.push(casual.projectSkill)
}

module.exports = projectSkills
