const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.Mailtrap_token;

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3234879,
});

const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "pt.timone@gmail.com",
  }
];



  const sendMail=()=>{
    client.testing
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error)
  }
  module.exports={sendMail}