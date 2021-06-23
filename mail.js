const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key:
      process.env.API_KEY ||
      "6e54a5f8f82a255743bd3b9dc777a1bf-1f1bd6a9-9a028083",
    domain:
      process.env.DOMAIN ||
      "sandbox9144445dc2094fb8ab8bb12841afaec3.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, name, text, cb) => {
  const mailOptions = {
    from: name + "<" + email + ">",
    to: process.env.EMAIL,
    name,
    text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return cb(err, null);
    }
    return cb(null, data);
  });
};

module.exports = sendMail;
