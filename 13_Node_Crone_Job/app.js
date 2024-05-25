const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
let GLOBAL_USER = "rishikeshtharayil@gmail.com";

async function sendEmail({ user, sub, body }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.TRANSPORTER_USERNAME,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
  });

  // Send email
  const mailOptions = {
    from: process.env.TRANSPORTER_USERNAME,
    to: user,
    subject: sub || "Cron Jobs Notification",
    html: body || `<p>Hello cron jobs</p>`,
  };

  return transporter.sendMail(mailOptions);
}

app.get("/sendEmail", async (req, res) => {
  const { user } = req.query;
  GLOBAL_USER = user;

  try {
    await sendEmail({ user });
    res.send("Mail has been sent successfully");
  } catch (error) {
    res.send("Something went wrong");
  }
});

/* ======= * * * * *  ==> minute, hour, day of the month (0-31), month (1-12), day of the week (sun -sat => 0-7) ========  */
// This will on 10 th minute of every hour 
cron.schedule("10 * * * *", () => {
  sendEmail({ user: GLOBAL_USER })
    .then(response => console.log(`Cron job email sent`))
    .catch(error => console.error(`Error in cron job email`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});
