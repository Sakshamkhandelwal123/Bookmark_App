const { createModule } = require("graphql-modules");

const typedefs = require("../schemas/index");
const resolver = require("../resolvers/index");

const myModule = createModule({
  id: "my-module",
  dirname: __dirname,
  typeDefs: typedefs,
  resolvers: resolver,
});

module.exports = myModule;
