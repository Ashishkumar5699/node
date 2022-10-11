require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const auth = require("./middleware/auth");
const User = require("./model/user");

app.use(express.json());
app.post("/register", async (req, res) => {
console.log(".register called");
try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    console.log("line 18 working well");
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  // } catch (err) {
  //   console.log(err);
  // }

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

// Login
app.post("/login", async (req, res) => {
try{
  const {email, password} = req.body;

  if(!(email && password))
  {
    res.status(400).send("All input is required");
  }

  const oldUser = await User.findOne({ email });

  if(oldUser)
  {
    return res.status(409).send("User already Exist. Please Login")
  }

  encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCas(),
    password: encryptedPassword,
  })

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
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;