const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,

  auth: {
    user: process.env.SENDER_EMAIL, //put your mail here
    pass: process.env.SENDER_PASSWORD, //password here
  },
});

module.exports = {
  transporter,
};
