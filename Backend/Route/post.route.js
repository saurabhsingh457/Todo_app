const { PostModel } = require("../Modelss/post.model")

const express = require("express");

const postRoute = express.Router();

postRoute.get("/get", async (req, res) => {
    const data = await PostModel.find()
    res.json(data)
    console.log("All data")
})

postRoute.get("/get/:id", async (req, res) => {
    const data = await PostModel.find({_id:req.params.id})
    res.json(data)
    console.log("Your particular data")
})

postRoute.post("/post", async (req, res) => {
    const { title, description}=req.body
    let data=await PostModel.insertMany({title,description})
    console.log("data posted successfully") 
    res.json(data)
})

postRoute.patch("/update/:id", async (req, res) => {
    const {  title, description}=req.body
    let data=await PostModel.findByIdAndUpdate({_id:req.params.id},req.body)
    console.log("data edited successfully") 
    res.json({"msg":"data edited",id:data._id})
    
})

postRoute.delete("/delete/:id", async (req, res) => {
   
    let data=await PostModel.findByIdAndDelete({_id:req.params.id})
    console.log("data deleted successfully") 
    res.json({"msg":"data deleted",id:data._id})
    
})
postRoute.get("/search", async (req, res) => {
    try {
      const { title } = req.query;
      const users = await PostModel.find({ title: { $regex: title, $options: "i" } });
      res.json(users);
      console.log("Search results");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = { postRoute }