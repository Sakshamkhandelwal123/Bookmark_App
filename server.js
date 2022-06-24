const { createApplication } = require("graphql-modules");
const { ApolloServer } = require("apollo-server");

const myModule = require("./graphql/modules/index");

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
