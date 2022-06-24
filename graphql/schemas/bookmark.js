const {gql} = require("graphql-modules");

const typedefs = gql`
  type Bookmark {
    id: Int!
    title: String!
    url: String!
    tag: String!
    createdAt: String
    updatedAt: String
  }
  type Query {
    bookmarks: [Bookmark!]!
    bookmark(id: Int!): Bookmark!
  }
  type Mutation {
    addBookmark(title: String!, url: String!, tag: String!): Bookmark!
    updateBookmark(id: Int!, title: String!, tag: String!): Bookmark!
    deleteBookmark(id: Int!): Bookmark!
  }
`

module.exports = typedefs;