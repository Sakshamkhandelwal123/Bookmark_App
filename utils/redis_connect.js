const redis = require("redis");
require("dotenv").config();

const logger = require("./logger");

const redisPort = process.env.REDIS_PORT;
const client = redis.createClient(redisPort);

client.on("error", (err) => {
  logger.error(err);
});

client.connect();

module.exports = client;
