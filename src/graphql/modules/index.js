const { createModule } = require("graphql-modules");

const typedefs = require("../schemas/bookmark");
const resolver = require("../resolvers/bookmark");

const myModule = createModule({
  id: "my-module",
  dirname: __dirname,
  typeDefs: typedefs,
  resolvers: resolver,
});

module.exports = myModule;
