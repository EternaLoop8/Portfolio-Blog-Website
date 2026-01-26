import express from "express"  ;
import { Blog } from "../models/blog.model.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const blogrouter = express.Router();


//get all blogs
blogrouter.get('/blog', async (req, res) => {
  try{
    const blogs = await Blog.find({});
    res.send({count:blogs.length, data:blogs});
  }catch(err){
    console.log(err)
    res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
  }
});

//get single blog
blogrouter.get('/blog/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await Blog.findById(id);
        console.group(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
})

//update a blog
blogrouter.put("/blog/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status, ...safeData } = req.body; // ⛔ ignore status
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      safeData,
      { new: true }
    );
    res.send(blog);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//delete blog
blogrouter.delete('/blog/:id', protect, adminOnly, async(req, res)=>{
    try{
        const id = req.params.id;
        const response = await Blog.findByIdAndDelete(id);
        console.log(response);
        res.send("success!");
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
});

//create blog
blogrouter.post('/blog', protect, adminOnly, async (req,res)=>{
    try{
        const data = req.body;
        data.author = req.user.id;
        const blog = new Blog(data)
        const response = await blog.save();
        console.log(response);
        res.send(response);
    }catch(err){
        console.error("Mongoose Error:", err); 
        res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
    }
});

//Publish draft
blogrouter.patch("/blog/:id/publish", protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );
    res.send(blog);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default blogrouter;