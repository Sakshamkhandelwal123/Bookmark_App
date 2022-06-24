const winston = require("winston");

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
