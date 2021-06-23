require("dotenv").config();
const express = require("express");
const path = require("path");
const sendMail = require("./mail");
const app = express();

const port = process.env.PORT || 3000;

// Data parsing
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// email, subject, text
app.post("/email", (req, res) => {
  const { name, email, text } = req.body;
  console.log("Data: ", req.body);

  sendMail(email, name, text, function (err, data) {
    if (err) {
      console.log("ERROR: ", err);
      return res.status(500).json({ message: err.message || "Internal Error" });
    }
    console.log("Email sent!!!");
    return res.json({ message: "Email sent!!!!!" });
  });
});

// Render home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Error page
app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/error.html"));
});

// Email sent page
app.get("/email/sent", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/emailMessage.html"));
});

// Start server
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
