const { createApplication } = require("graphql-modules");
const { ApolloServer } = require("apollo-server");

const logger = require("./utils/logger");
const myModule = require("./src/graphql/modules/index");
const context = require("./src/graphql/context");

const application = createApplication({
  modules: [myModule],
});

const executor = application.createApolloExecutor();
const schema = application.schema;

const server = new ApolloServer({
  schema,
  context,
  executor,
});

server.listen().then(({ url }) => {
  logger.info(`🚀 Server ready at ${url}`);
});
