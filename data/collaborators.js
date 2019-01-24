const casual = require('casual')

casual.define('collaborator', () => ({
    id: casual.uuid,
    status: casual.random_element([
        'INTERESTED',
        'CONFIRMED',
    ]),
    title: casual.random_element([
        'Crimson App',
        'WHRB App',
        'HOC App',
        'HIA App',
        'HCCG App',
    ]),
    name: casual.random_element([
        'Mohamed',
        'Tito',
        'Hossam',
        'Chris',
        'Daniel',
        'Idle',
    ])
}))

const collaborators = []

for (i = 0; i < 10; i++) {
    collaborators.push(casual.collaborator)
}

module.exports = collaborators
