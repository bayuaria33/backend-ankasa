const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = (emailClient, subject) => {
  let mailOption = {
    from: process.env.EMAIL_NAME,
    to: emailClient,
    subject: `${subject} is your otp`,
    text: `Hello New User, ${subject} is your otp.`,
  };

  new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, function (error, data) {
      if (error) {
        reject(error.message);
        return("Email not sent")
      } else {
        resolve(data);
      }
    });
  }).then((data) => {
    console.log("Email sent successfully, data = ", data);
    return data;
  });
};
