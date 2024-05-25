const express = require("express");
const nodemailer = require("nodemailer")

const app = express();

const sendEmail = ({to, sub, body}) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.TRANSPORTER_USERNAME,
          pass: process.env.TRANSPORTER_PASSWORD,
        },
      });
  
      //   send email
      const mailOptions = {
        from: process.env.TRANSPORTER_USERNAME,
        to: email,
        subject: subject,
        html: body,
      };
  
      return transporter.sendMail(mailOptions);
}


app.get("/sendEmail", async(req, res) => {
    res.send("Sending email");
})


app.listen(3001, () => {
    console.log("server is listening on http://localhost:3001")
})