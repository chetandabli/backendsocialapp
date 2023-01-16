const express = require("express");
const app = express();
const conneciton = require("./config/db");
const {userRoute} = require("./routes/user.routes")
const {postRoute} = require("./routes/post.routes")
require('dotenv').config()

app.use(express.json());

app.use("/user", userRoute);
app.use("/posts", postRoute);


app.listen(process.env.PORT, async ()=>{
    try {
        await conneciton;
        console.log(`server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})