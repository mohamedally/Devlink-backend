const gql = require("graphql-tag")

module.exports = gql`
  type Query {
    user(id: ID!): User!
    users(substr: String, location: String): [User!]
    project(id: ID!): Project!
    projects(skills: [String]): [Project!]
  }

  type Mutation {
    createUser(input: CreateUserInput!): LoginReturn!
    loginUser(email: String!, password: String!): LoginReturn!
    deleteUser(id: ID!): StatusMessage!
    editUser(input: EditUserInput!): User!
    createProject(input: CreateProjectInput!): CreateProjectReturn!
    editProject(input: EditProjectInput): Project!
    deleteProject(id: ID!): StatusMessage!
    collaborateRequest(projectId: ID!): StatusMessage!
    acceptRequest(from: ID!, projectId: ID!): StatusMessage!
    declineRequest(from: ID!, projectId: ID!): StatusMessage!
  }

  type User {
    id: ID!
    name: String!
    email: String
    github: String
    bio: String
    city: String
    country: String
    zipcode: String
    projects: [Project!]
    skills: [Skill!]
    confirmedCollabOn: [[Project!]]
    interestedCollabOn: [[Project!]]
    dist_meters: Float
  }

  type CreateProjectReturn {
    project: Project
    error: Error
  }

  type Project {
    id: ID!
    title: String!
    description: String
    leader: ID
    collaborators: [Collaborator!]
    requests: [Collaborator!]
    skills: [Skill!]
  }

  type Skill {
    id: ID!
    skill: String!
    foreignKey: String
  }

  type Collaborator {
    status: String
    user: User
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    bio: String
    city: String
    zipcode: String!
    country: String
  }

  input EditUserInput {
    name: String
    email: String
    bio: String
    city: String
    zipcode: String
    country: String
  }

  input CreateProjectInput {
    title: String!
    description: String!
  }
  input EditProjectInput {
    id: ID!
    title: String
    description: String
  }

  type LoginReturn {
    user: User
    token: String
    error: Error
  }

  type StatusMessage {
    message: String
    error: Error
  }

  type Error {
    message: String
  }
`
