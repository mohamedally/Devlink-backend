const usersData = require("../../data/users")
const skillsData = require('../../data/skills')
const projectsData = require('../../data/projects')
const projectSkillsData = require('../../data/projectSkills')
const collabsData = require('../../data/collaborators')

const createSkill = (knex, skills, name) => {
  return knex('users')
    .where('name', name)
    .first()
    .then(user => {
      const { id, skill } = skills
      return knex('skills').insert({
        id,
        userId: user.id,
        skill,
      })
    })
}

const createProject = (knex, projects, name) => {
  return knex('users')
    .where('name', name)
    .first()
    .then(user => {
      const { id, title, description } = projects
      return knex('projects').insert({
        id,
        title,
        description,
        leader: user.id,
      })
    })
}

const createProjectSkills = (knex, projectSkills, title) => {
  return knex('projects')
    .where('title', title)
    .first()
    .then(project => {
      const { id, skill } = projectSkills
      return knex('projectSkills').insert({
        id,
        skill,
        projectId: project.id,
      })
    })
}

const createCollabs = (knex, collaborators, title, name) => {
  return knex('projects')
    .where('title', title)
    .first()
    .then(project => {
      return knex('users')
        .where('name', name)
        .first()
        .then(user => {
          const { id, status } = collaborators
          return knex('collaborators').insert({
            id,
            status,
            projectId: project.id,
            userId: user.id,
          })
      })
  })
}

exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() => knex('skills').del())
    .then(function() {
      return knex('users').insert(usersData)
    })
    .then(() => {
      const skillsPromises = skillsData.map(skill =>
        createSkill(knex, skill, skill.name),
        )
        return Promise.all(skillsPromises)
    })
    .then(() => {
      const projectsPromises = projectsData.map(project =>
        createProject(knex, project, project.name),
        )
        return Promise.all(projectsPromises)
    })
    .then(() => {
      const projectSkillsPromises = projectSkillsData.map(projectSkill =>
        createProjectSkills(knex, projectSkill, projectSkill.title),
        )
        return Promise.all(projectSkillsPromises)
    })
    .then(() => {
      const collabsPromises = collabsData.map(collaborator => 
        createCollabs(knex, collaborator, collaborator.title, collaborator.name)
        )
        return Promise.all(collabsPromises)
    })
} 
