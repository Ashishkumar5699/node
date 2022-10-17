require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./API/users/user.router");

app.use("/api/user", userRouter)

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on  port : ", process.env.APP_PORT);
})