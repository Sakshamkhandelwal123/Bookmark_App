const { gql } = require("graphql-modules");

const typedefs = gql`
  type Bookmark {
    id: Int!
    title: String!
    url: String!
    tag: String!
    createdAt: String
    updatedAt: String
  }

  type SubFolder {
    id: Int!
    name: String!
    bookmarks: [Bookmark!]!
    Folder_ID: Int!
  }

  type Folder {
    id: Int!
    name: String!
    SubFolders: [SubFolder!]!
    bookmarks: [Bookmark!]!
    createdAt: String
    updatedAt: String
  }

  type Query {
    allFolders: [Folder!]!
    getFolder(name: String!): Folder
    subfolders(Folder_ID: String!): [SubFolder!]!
    bookmarks(subfolder: String!): [Bookmark!]!
    bookmark(subfolder: String!, id: Int!): [Bookmark!]!
  }

  type Mutation {
    createFolder(name: String!): Folder
    deleteFolder(name: String!): Int!
    createSubFolder(Folder_ID: Int!, name: String!): SubFolder!
    
    addBookmark(
      subfolder: Int!
      title: String!
      url: String!
      tag: String!
    ): Bookmark!

    updateBookmark(
      subfolder: Int!
      id: Int!
      title: String!
      tag: String!
    ): Bookmark!

    deleteBookmark(subfolder: Int!, id: Int!): Bookmark!
  }
`;

module.exports = typedefs;
