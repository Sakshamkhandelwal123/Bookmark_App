const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

const { User } = require("../../models");

const verifyToken = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

const context = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || "";
  const user = verifyToken(token);

  return { user };
};

module.exports = context;
