const express = require("express");
const {Postmodel} = require("../model/Postmodel")
const postRoute = express.Router();
const {auth} = require("../middleware/auth");
const { query } = require("express");

postRoute.use(express.json());
postRoute.use(auth)

// {
//     "title": "something",
//     "body": "something",
//     "device": "PC"
//   }

postRoute.get("/", async(req, res)=>{
    console.log(req.query)
    try {
        const newPost = await Postmodel.find(req.query)
        res.json(newPost)
    } catch (error) {
        console.log(error)
    }
})

postRoute.post("/post", async (req, res)=>{

    let {title, body, device, userID} = req.body;
    console.log(req.body)
    try {
        const newPost = await new Postmodel({title, body, device, userID: userID})
        await newPost.save();
        res.json({message: "posted"})
    } catch (error) {
        console.log(error)
    }
});
postRoute.patch("/update", async (req, res)=>{
    let id = req.query.id
    try {
        console.log(req.body)
        const updatePost = await Postmodel.findByIdAndUpdate(id, req.body)
        res.json({message: "updated"})
    } catch (error) {
        console.log(error)
    }
});
postRoute.delete("/delete", async (req, res)=>{
    let id = req.query.id
    try {
        console.log(req.body)
        const updatePost = await Postmodel.findByIdAndDelete(id)
        res.json({message: "deleted"})
    } catch (error) {
        console.log(error)
    }
});

module.exports = {
    postRoute
}