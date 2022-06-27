const Queue = require("bull");
const transporter = require("./sendMail").transporter;
const logger = require("./logger");

async function sendUserMail(username) {
  const sendMailQueue = new Queue("sendMail");

  const data = {
    email: username,
  };

  const options = {
    delay: 60000, // 1 min in ms
    attempts: 2,
  };

  sendMailQueue.add(data, options);

  sendMailQueue.process(async (job) => {
    return await sendMail(job.data.email);
  });
}

function sendMail(email) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Bookmark App",
      html: "<h1>Bookmark Added</h1>",
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
        reject(err);
      } 
      else {
        logger.info(JSON.stringify(info, null, 3));
        resolve(info);
      }
    });
  });
}

module.exports = sendUserMail;