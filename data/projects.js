const casual = require('casual')

casual.define('project', () => ({
    id: casual.uuid,
    title: casual.random_element([
        'Crimson App',
        'WHRB App',
        'HOC App',
        'HIA App',
        'HCCG App',
        'HACA App'
    ]),
    description: casual.sentences(2),
    name: casual.random_element([
        'Mohamed',
        'Tito',
        'Hossam',
        'Chris',
        'Daniel',
        'Idle',
    ]),
}))

const projects = []

for (let i = 0; i < 15; i++) {
    projects.push(casual.project)
}

module.exports = projects
