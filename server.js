const { createApplication } = require("graphql-modules");
const { ApolloServer } = require("apollo-server");

const logger = require("./utils/logger");

const myModule = require("./src/graphql/modules/index");

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
  logger.info(`🚀 Server ready at ${url}`);
});
