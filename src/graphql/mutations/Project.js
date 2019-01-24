const User = require('../../models/User')
const Project = require('../../models/Project')

const createProject = async (obj, { input }, context) => {

    if (!context.user) {
        return {
            error: {
                message: 'User not logged in',
            },
        }
    }

    const user = await User.query()
        .where('id', context.user.id)
        .then(res => res[0])
    
    if (!user) {
        return {
            error: {
                message: 'Logged in user does not exist',
            },
        }
    }

    const result = await Project.query().findOne('title', input.title)
    if (result) {
        return {
          error: { message: 'Project already exists!' },
        }
    }

    const project = await user.$relatedQuery('projects')
        .insert({ 
            title: input.title,
            description: input.description,
        })

    if (!project) {
        throw new Error('Could not add project')
    }
    return project
}

const deleteProject = async (obj, args, context) => {
    if (!context.user) {
        return {
            error: {
                message: "User not logged in",
            }
        }
    }

    const result = await Project.query()
        .delete()
        .where("id", args.id)
    
    if (result) {
        return {
            message: "Success deleting project",
        }
    }
}

const editProject = async (obj, args, context) => {
    if (!context.user) {
        return {
            error: {
                message: "User not logged in",
            }
        }
    }

    const { id, title, description } = args.input

    const editedProject = Project.query()
        .patchAndFetchById(id, {
            title: title,
            description: description,
        })

    if (!editedProject) {
        return {
            error: {
                message: "Failed to edit project",
            }
        }
    }
    return editedProject
}

const resolver = {
    Mutation: { createProject, deleteProject, editProject }
}

module.exports = resolver