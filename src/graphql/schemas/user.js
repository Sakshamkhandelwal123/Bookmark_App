const { gql } = require("graphql-modules");

const typedefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
  }

  type RegisterResponse {
    id: Int!
    name: String!
    email: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
  }
`;

module.exports = typedefs;
