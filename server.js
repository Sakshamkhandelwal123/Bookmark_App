const { createModule, gql, createApplication } = require("graphql-modules");
const { ApolloServer } = require("apollo-server");
const typedefs = require("./modules/index").typedefs;
const resolver = require("./modules/index").resolver;

const myModule = createModule({
  id: "my-module",
  dirname: __dirname,
  typeDefs: typedefs,
  resolvers: resolver,
});

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [myModule],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const server = new ApolloServer({
  schema,
  executor,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
