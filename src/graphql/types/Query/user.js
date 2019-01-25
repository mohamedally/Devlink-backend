const User = require("../../../models/User")
const Project = require("../../../models/Project")
const { raw } = require("objection")
const client = require("../../../../googleMapsClient")
const { knex, st } = require("../../../../knex_connection")

const userResolver = async (obj, args, context) => {
  const returnedUser = await User.query().findById(args.id)
  return returnedUser
}

const usersResolver = async (obj, args, context) => {
  const { substr, location } = args

  if (location) {
    const results = await client
      .geocode({
        address: location
      })
      .asPromise()
      .then(async res => {
        const { lat, lng } = res.json.results[0].geometry.location

        const geoObject = st.geomFromText(`Point(${lat} ${lng})`, 4326)

        const queryBuilder = knex("users")
          .select(
            knex.raw(
              `round(CAST(ST_Distance_Sphere(ST_Centroid(coordinate),  ${geoObject}) As numeric),2) As dist_meters, *`
            )
          )
          .orderBy("dist_meters", "ASC")

        if (substr) {
          queryBuilder.where(
            knex.raw('lower("name")'),
            "like",
            `%${substr.toLowerCase()}%`
          )
        }

        return await queryBuilder
      })
    return results
  } else {
    const query = knex("users")
    if (substr) {
      query.where(
        knex.raw('lower("name")'),
        "like",
        `%${substr.toLowerCase()}%`
      )
    }
    const users = await query

    return users
  }
}

const userSkills = async (obj, args, context) => {
  const skills = await obj.$relatedQuery("skills")
  return skills
}

const projectSkills = async (obj, args, context) => {
  const projects = await Project.query().where("leader", obj.id)
  return projects
}

const confirmedCollabOn = async (obj, args, context) => {
  const projects = await obj
    .$relatedQuery("collaborators")
    .where("status", "CONFIRMED")

  const projectIds = projects.map(project => project.projectId)

  const projectInfo = projectIds.map(
    async id => await Project.query().where("id", id)
  )

  const projectInfoObj = await Promise.all(projectInfo)

  return projectInfoObj
}

const interestedCollabOn = async (obj, args, context) => {
  const projects = await obj
    .$relatedQuery("collaborators")
    .where("status", "INTERESTED")

  const projectIds = projects.map(project => project.projectId)

  const projectInfo = projectIds.map(
    async id => await Project.query().where("id", id)
  )

  const projectInfoObj = await Promise.all(projectInfo)

  return projectInfoObj
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver
  },
  User: {
    skills: userSkills,
    projects: projectSkills,
    confirmedCollabOn: confirmedCollabOn,
    interestedCollabOn: interestedCollabOn
  }
}

module.exports = resolver
