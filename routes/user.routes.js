const express = require("express");
const userRoute = express.Router();
const {Usermodel} = require("../model/Usermodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRoute.use(express.json());
// userRoute.use(encryption())

userRoute.post("/register", async (req, res)=>{
    let {name, email, gender, password} = req.body;
    bcrypt.hash(req.body.password, 5, async function(err, hash) {
        if(err){
            connsole.log(err);
            res.json({message: "user not registred"})
        }else{
            password = hash;
            try {
                const newUser = await new Usermodel({name, email, gender, password: password})
                await newUser.save();
                res.json({message: "user registred"})
            } catch (error) {
                console.log(error)
            }
        }
    });
});

userRoute.post("/login", async(req, res)=>{
    let {email, password} = req.body;
    let userData = await Usermodel.find({email})
    bcrypt.compare(password, userData[0].password, function(err, result) {
        if(err){
            console.log(err);
            res.json({message: "incorrect cradential"})
        }else{
            let token = jwt.sign({token: userData[0]._id}, process.env.secretKey, { expiresIn: '1h' });
            res.json({message: "logged in", token: token})
        }
    });
})

module.exports = {
    userRoute
}