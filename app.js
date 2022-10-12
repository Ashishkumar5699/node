require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const auth = require("./middleware/auth");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

app.use(express.json());
app.post("/register", async (req, res) => {
console.log(".register called");
try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
}
catch(e)
{
  console.log("entering catch block");
  console.log(e);
  console.log("leaving catch block");
}
finally
{
  console.log("entering and leaving the finally block");
}
console.log("leaving try-catch statement");

});

app.post("/login", async (req, res) => {
  try {
    console.log("entering /login block");
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  }
catch(e)
{
  console.log("entering catch block");
  console.log(e);
  console.log("leaving catch block");
}
finally
{
  console.log("entering and leaving the finally block");
}
console.log("leaving try-catch statement");
});

app.post("/welcome", auth, (req, res) => {
  try{
  res.status(200).send("Welcome 🙌 ");
  }
  catch(e)
  {
    console.log("=====================================" + e + "---------------------------------")
  }
  finally
  {
    console.log("/welcome worked sicessfully====================");
  }
});

module.exports = app;