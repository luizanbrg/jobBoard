const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = (userEmail, jobTitle) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: 'Nouveau candidat pour ' + jobTitle,
    text: `Un nouveau candidat s'est incrit pour : ${jobTitle}. Le mail du candidat est : ${userEmail}.`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur dans lenvoi du mail :', error);
        return reject(error);
      }
      console.log('Mail envoyé :', info.response);
      resolve(info.response);
    });
  });
};

module.exports = sendMail;
