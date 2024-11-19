
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "timiprecious18@gmail.com",
    pass: "vxot aoed agey mrrb",
  },
  
});


  const sendMail=transporter.sendMail.bind(transporter)
  module.exports=sendMail.bind(transporter);