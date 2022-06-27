const { gql } = require("graphql-modules");

const userType = require("./user");
const bookmarkType = require("./bookmark");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType, bookmarkType];
